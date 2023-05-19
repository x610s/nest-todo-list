import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, forMember, ignore } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { UpdateTodoDto } from './update-todo.dto';

@Injectable()
export class TodoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateTodoDto,
        Todo,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(mapper, UpdateTodoDto, Todo);
    };
  }
}
