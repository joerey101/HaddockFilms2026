export type FilmType = 'pelicula' | 'serie' | 'documental' | 'cortometraje';

export type ImageAsset = {
  local_path?: string;
  remote_url?: string;
  wp_id?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Award = string | {
  name: string;
  year: number;
  category?: string;
  festival?: string;
  result: 'ganadora' | 'nominada' | 'mencion';
};

export type CastMember = string | {
  name: string;
  character?: string;
  image?: ImageAsset;
};

export type Film = {
  id: string;
  wp_id?: string;
  slug: string;
  title: string;
  title_original?: string;
  tagline?: string;
  year: number;
  type: FilmType;
  episodes?: string;
  duration?: number;
  genre?: string[];
  
  directors?: string | string[];
  writers?: string[];
  screenplay?: string[];
  producers?: string[];
  executive_producers?: string[];
  cinematography?: string[];
  editing?: string[];
  art_direction?: string[];
  sound_direction?: string[];
  music_original?: string | string[];
  costume?: string[];
  production_direction?: string[];
  casting_direction?: string[];
  makeup?: string[];
  post_direction?: string[];
  adaptation?: string;
  based_on?: string;
  other_credits?: Record<string, string>;

  countries?: string[];
  language?: string;
  synopsis: string;
  synopsis_short?: string;
  synopsis_paragraphs?: string[];
  cast?: CastMember[];
  
  imdb_id?: string;
  imdb_url?: string;
  trailer_url?: string;
  
  poster?: ImageAsset;
  hero?: ImageAsset;
  stills?: ImageAsset[];
  
  awards?: Award[];
  festivals?: string[];
  distributor?: string;
  release_date?: string;
  streaming?: { platform: string; url: string }[];
  featured?: boolean;
  featured_order?: number;
};
