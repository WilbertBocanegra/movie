import { Injectable } from '@nestjs/common';
import { IMovie, IResponse } from '@enthous/movie';
import { MovieRepository } from '../repository/movie.repository';
@Injectable()
export class FindBySlugService {
  constructor(private readonly movieRepository: MovieRepository) {}
  public async finBySlug(slug: string): Promise<IMovie[]> {
    try {
      const movie = await this.movieRepository.find(
        { slug: slug },
        { populate: ['author', 'cast', 'author.movies'] },
      );

      return movie;
    } catch (err) {}
  }
}
