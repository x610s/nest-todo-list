import { AutoMap } from '@automapper/classes';
import { MinLength, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @AutoMap()
  @MinLength(1, { message: 'El título no puede estar vacio' })
  title: string;

  @AutoMap()
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres',
  })
  description: string;

  @AutoMap()
  @IsNotEmpty({ message: 'La fecha no puede estar vacía' })
  date: Date;

  @AutoMap()
  @IsBoolean({ message: 'Estado inválido' })
  completed: boolean;
}
