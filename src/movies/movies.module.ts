import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entity/movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
