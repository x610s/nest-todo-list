import { CreateTodoDto } from './create-todo.dto';
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto extends CreateTodoDto {
  @AutoMap()
  @IsNotEmpty({ message: 'El id no puede estar vacio' })
  id: number;
}
