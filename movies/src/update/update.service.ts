import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repository/movie.repository';
import { IResponse, IMovie } from '@enthous/movie';

@Injectable()
export class UpdateService {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async updateMovie(id: string, data: IMovie): Promise<IResponse> {
    try {
      return {
        statusCode: 200,
        info: '',
      };
    } catch (err) {}
  }
}
