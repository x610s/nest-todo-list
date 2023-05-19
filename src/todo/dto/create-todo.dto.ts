import { AutoMap } from '@automapper/classes';

export class CreateTodoDto {
  @AutoMap()
  title: string;
  @AutoMap()
  description: string;
  @AutoMap()
  date: Date;
  @AutoMap()
  completed: boolean;
}
