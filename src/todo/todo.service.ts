import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }

  async findById(id: number) {
    return await this.todoRepository.finById(id);
  }

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.create(createTodoDto);
  }

  async update(id: number, todo: UpdateTodoDto) {
    return await this.todoRepository.update(id, todo);
  }

  async remove(id: number) {
    const result = await this.todoRepository.delete(id);
    return result.affected > 0;
  }
}
