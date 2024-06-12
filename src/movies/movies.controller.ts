import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto/movies.dto';
import { UpdateMovieDto } from './dto/updateMovies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id_pelicula')
  getMovieById(
    @Param(
      'id_pelicula',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id_pelicula: number,
  ) {
    return this.moviesService.getMovieById(id_pelicula);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createMovie(@Body() movie: MoviesDto) {
    return this.moviesService.createMovie(movie);
  }

  @Put(':id_pelicula')
  @UsePipes(new ValidationPipe())
  updateMovie(
    @Param(
      'id_pelicula',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id_pelicula: number,
    @Body() movie: UpdateMovieDto,
  ) {
    return this.moviesService.updateMovie(id_pelicula, movie);
  }

  @Patch(':id_pelicula')
  partiallyUpdateMovie(
    @Param(
      'id_pelicula',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id_pelicula: number,
    @Body() movie: UpdateMovieDto,
  ) {
    return this.moviesService.partiallyUpdateMovie(id_pelicula, movie);
  }

  @Delete(':id_pelicula')
  deleteMovie(
    @Param(
      'id_pelicula',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id_pelicula: number,
  ) {
    return this.moviesService.deleteMovie(id_pelicula);
  }
}
