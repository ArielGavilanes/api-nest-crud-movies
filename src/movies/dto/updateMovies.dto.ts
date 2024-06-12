import { PartialType } from '@nestjs/mapped-types';
import { MoviesDto } from './movies.dto';

export class UpdateMovieDto extends PartialType(MoviesDto) {}
