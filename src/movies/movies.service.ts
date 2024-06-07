import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';
import { Repository } from 'typeorm';
import { MoviesI } from './interface/movies.interface';
import { MoviesDto } from './dto/movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies) private moviesRepository: Repository<Movies>,
  ) {}

  async getAllMovies(): Promise<MoviesI[]> {
    return await this.moviesRepository.find();
  }

  async getMovieById(id_pelicula: number): Promise<MoviesI> {
    return await this.moviesRepository.findOne({
      where: {
        id_pelicula: id_pelicula,
      },
    });
  }

  async createMovie(movie: MoviesDto): Promise<any> {
    const newMovie = await this.moviesRepository.create(movie);
    return await this.moviesRepository.save(newMovie);
  }

  async updateMovie(
    id_pelicula: number,
    movie: Partial<MoviesDto>,
  ): Promise<any> {
    return await this.moviesRepository.update(id_pelicula, movie);
  }

  async deleteMovie(id_pelicula: number): Promise<void> {
    await this.moviesRepository.delete(id_pelicula);
  }
}
