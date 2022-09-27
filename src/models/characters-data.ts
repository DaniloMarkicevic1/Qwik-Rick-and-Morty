import { EpisodeData } from './episode-data';

export interface CharacterData {
  data: {
    character: {
      id: number;
      origin: { url: string; name: string };
      location: { name: string };
      episode: [string];
      image: string;
      name: string;
      species: string;
      gender: string;
      status: string;
      type: string;
    };
    episodes: [EpisodeData];
    origin: { dimension: string };
  };
  isLoading: boolean;
}
