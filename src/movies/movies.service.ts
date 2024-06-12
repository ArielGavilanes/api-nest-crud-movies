import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    const movies = await this.moviesRepository.find();
    if (!movies || movies.length == 0) {
      throw new NotFoundException('No existen registros');
    }
    return movies;
  }

  async getMovieById(id_pelicula: number): Promise<MoviesI> {
    const user = await this.moviesRepository.findOne({
      where: {
        id_pelicula: id_pelicula,
      },
    });
    if (!user) {
      throw new NotFoundException('No existe el registro ' + id_pelicula);
    }

    return user;
  }

  async createMovie(movie: MoviesDto): Promise<any> {
    if (movie.id_pelicula) {
      const userFound = await this.moviesRepository.findOne({
        where: {
          id_pelicula: movie.id_pelicula,
        },
      });
      if (userFound) {
        throw new BadRequestException('Este pelicula ya existe');
      }
    }

    try {
      const newMovie = await this.moviesRepository.create(movie);
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      throw new BadRequestException('No se ha podido crear el registro', error);
    }
  }

  async updateMovie(
    id_pelicula: number,
    movie: Partial<MoviesDto>,
  ): Promise<any> {
    try {
      return await this.moviesRepository.update(id_pelicula, movie);
    } catch (error) {
      throw new BadRequestException(
        'No se ha podido actualizar el registro ' + id_pelicula,
        error,
      );
    }
  }

  async deleteMovie(id_pelicula: number): Promise<void> {
    const user = await this.getMovieById(id_pelicula);
    if (user) {
      await this.moviesRepository.delete(id_pelicula);
    }
    throw new NotFoundException(
      'No se puede eliminar el registro' + id_pelicula,
    );
  }

  async partiallyUpdateMovie(
    id_pelicula: number,
    movie: Partial<MoviesDto>,
  ): Promise<any> {
    try {
      return await this.moviesRepository.update(id_pelicula, movie);
    } catch (error) {
      throw new BadRequestException(
        'No se ha podido actualizar parcialmente el registro ' + id_pelicula,
        error,
      );
    }
  }
}
