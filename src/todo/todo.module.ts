import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './todo.repository';
import { Todo } from './entities/todo.entity';
import { TodoProfile } from './dto/todo.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, TodoProfile],
})
export class TodoModule {}
