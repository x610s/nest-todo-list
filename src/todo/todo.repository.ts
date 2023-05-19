import { DeleteResult, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private usersRepository: Repository<Todo>,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.usersRepository.find();
  }

  finById(id: number): Promise<Todo> {
    return this.usersRepository.findOne({ where: { id } });
  }

  create(createTodoDto: CreateTodoDto) {
    const todo = this.classMapper.map(createTodoDto, CreateTodoDto, Todo);
    return this.usersRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const exists = await this.usersRepository.exist({ where: { id } });
    if (!exists) {
      throw new HttpException('TODO no encontrado', 404, {
        cause: new Error('TODO no encontrado'),
      });
    }
    const newTodo = this.classMapper.map(updateTodoDto, UpdateTodoDto, Todo);
    return await this.usersRepository.save(newTodo);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
