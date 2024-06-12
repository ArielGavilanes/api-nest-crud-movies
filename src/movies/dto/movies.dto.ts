import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class MoviesDto {
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la película debe ser un número.' })
  id_pelicula?: number;

  @IsNotEmpty({ message: 'El nombre de la película es obligatorio.' })
  @IsString({ message: 'El nombre de la película debe ser una cadena.' })
  nombre_pelicula: string;

  @IsNotEmpty({ message: 'La categoría de la película es obligatoria.' })
  @IsString({ message: 'La categoría de la película debe ser una cadena.' })
  categoria_pelicula: string;
}
