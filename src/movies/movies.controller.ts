import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './dto/movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getAllMovies() {
    return this.moviesService.getAllMovies();
  }

  @Get(':id_pelicula')
  getMovieById(@Param('id_pelicula', ParseIntPipe) id_pelicula: number) {
    return this.moviesService.getMovieById(id_pelicula);
  }

  @Post()
  createMovie(@Body() movie: MoviesDto) {
    return this.moviesService.createMovie(movie);
  }

  @Put(':id_pelicula')
  updateMovie(
    @Param('id_pelicula', ParseIntPipe) id_pelicula: number,
    @Body() movie: Partial<MoviesDto>,
  ) {
    return this.moviesService.updateMovie(id_pelicula, movie);
  }

  @Delete(':id_pelicula')
  deleteMovie(@Param('id_pelicula', ParseIntPipe) id_pelicula: number) {
    return this.moviesService.deleteMovie(id_pelicula);
  }
}
