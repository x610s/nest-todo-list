import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoRepository.findAll();
    } catch (error) {
      throw new HttpException(
        { message: ['Error al buscar TODOS'] },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: number) {
    const todo = await this.todoRepository.finById(id);
    if (todo == null) {
      throw new HttpException(
        { message: ['TODO no encontrado'] },
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.todoRepository.create(createTodoDto);
    if (todo == null) {
      throw new HttpException(
        { message: ['Error al crear TODO'] },
        HttpStatus.BAD_GATEWAY,
      );
    }
    return todo;
  }

  async update(id: number, todo: UpdateTodoDto) {
    try {
      return await this.todoRepository.update(id, todo);
    } catch (error) {
      throw new HttpException({ message: [error] }, HttpStatus.BAD_REQUEST);
    }
  }

  async markAsReady(id: number) {
    try {
      return await this.todoRepository.markAsReady(id);
    } catch (error) {
      throw new HttpException({ message: [error] }, HttpStatus.BAD_REQUEST);
    }
  }


  async remove(id: number) {
    const result = await this.todoRepository.delete(id);
    const success = result.affected > 0;
    if (!success) {
      throw new HttpException(
        { message: ['Error al eliminar TODO'] },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
