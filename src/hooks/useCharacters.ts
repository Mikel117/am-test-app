import useSWR from 'swr';
import { Character } from '@/characters';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
    isError: error,
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
    isError: error,
  };
};
