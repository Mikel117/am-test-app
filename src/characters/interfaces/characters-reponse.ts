export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
  gender: string;
  location: string;
  origin: string;
  episodes: number;
  isFavorite: boolean;
}

export interface CharacterChangeInformationRequest {
  name?: string;
  status?: string;
  image?: string;
  species?: string;
  gender?: string;
  isFavorite?: boolean;
}
