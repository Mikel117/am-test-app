import useSWR from 'swr';
import { Character } from '@/characters';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const useCharacters = () => {
  const { data, error, isLoading, mutate } = useSWR<Character[]>(
    '/api/characters',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
      refreshInterval: 300000,
    }
  );

  return {
    characters: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
};

export const useCharacter = (id: number | null) => {
  const { data, error, isLoading } = useSWR<Character>(
    id ? `/api/characters/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    character: data,
    isLoading,
    isError: !!error,
    error,
  };
};
