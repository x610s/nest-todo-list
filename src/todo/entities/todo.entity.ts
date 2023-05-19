import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('todo')
export class Todo {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  date: Date;

  @AutoMap()
  @Column()
  completed: boolean;
}
