import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('peliculas')
export class Movies {
  @PrimaryGeneratedColumn({
    name: 'id_pelicula',
    primaryKeyConstraintName: 'peliculas_pk',
  })
  id_pelicula: number;

  @Column({
    name: 'nombre_pelicula',
    type: 'varchar',
    length: 255,
  })
  nombre_pelicula: string;

  @Column({
    name: 'categoria_pelicula',
    type: 'varchar',
    length: 255,
  })
  categoria_pelicula: string;
}
