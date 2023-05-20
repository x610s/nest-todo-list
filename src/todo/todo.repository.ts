import { DeleteResult, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  findOne(id: number): Promise<Todo> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.classMapper.map(createTodoDto, CreateTodoDto, Todo);
    return await this.usersRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const exists = await this.usersRepository.exist({ where: { id } });
    if (!exists) {
      throw new HttpException(
        { message: ['TODO no encontrado'] },
        HttpStatus.NOT_FOUND,
      );
    }
    const newTodo = this.classMapper.map(updateTodoDto, UpdateTodoDto, Todo);
    return await this.usersRepository.save(newTodo);
  }

  async markAsReady(id: number) {
    const todo = await this.usersRepository.findOne({ where: { id } });
    if (!todo) {
      throw new HttpException(
        { message: ['TODO no encontrado'] },
        HttpStatus.NOT_FOUND,
      );
    }
    todo.completed = !todo.completed;
    return await this.usersRepository.save(todo);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
