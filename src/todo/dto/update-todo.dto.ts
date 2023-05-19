import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateTodoDto extends CreateTodoDto {
  @AutoMap()
  id: number;
}
