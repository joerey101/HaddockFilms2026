import { films } from "../data/films";
import { Film } from "../data/films.schema";

export function getFeaturedFilms(): Film[] {
  return films
    .filter(f => f.featured)
    .sort((a, b) => (a.featured_order ?? 0) - (b.featured_order ?? 0));
}
