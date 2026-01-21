import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from './useCharacters';
import { SWRConfig } from 'swr';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(
    SWRConfig,
    { value: { provider: () => new Map() } },
    children
  );
};

global.fetch = jest.fn();

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters successfully', async () => {
    const mockCharacters = [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', image: '/rick.png' },
      { id: 2, name: 'Morty Smith', status: 'Alive', image: '/morty.png' },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    const { result } = renderHook(() => useCharacters(), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.characters).toEqual([]);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.isError).toBeUndefined();
  });

  it('should handle fetch error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useCharacters(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBeDefined();
    });
  });

  it('should return empty array when no data', () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));

    const { result } = renderHook(() => useCharacters(), { wrapper });

    expect(result.current.characters).toEqual([]);
  });
});
