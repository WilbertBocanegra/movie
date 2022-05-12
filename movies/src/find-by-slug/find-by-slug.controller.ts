import { Controller, Get, Query } from '@nestjs/common';
import { FindBySlugService } from './find-by-slug.service';
import { IMovie } from '@enthous/movie';

@Controller('find-by-slug')
export class FindBySlugController {
  constructor(private readonly movieService: FindBySlugService) {}
  @Get()
  public findBySlug(@Query('slug') slug: string): Promise<IMovie[]> {
    return this.movieService.finBySlug(slug);
  }
}
