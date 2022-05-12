import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repository/movie.repository';

import { IResponse } from '@enthous/movie';

@Injectable()
export class FindAllService {
  constructor(private readonly movieRepository: MovieRepository) {}
  public async findAll(): Promise<IResponse> {
    try {
      const all = await this.movieRepository.findAll({
        populate: ['author', 'cast', 'author.movies'],
      });

      return {
        statusCode: 200,
        data: all,
        info: 'Yes',
      };
    } catch (err) {}
  }
}
