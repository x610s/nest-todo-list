import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll() {
    try {
      return await this.todoService.findAll();
    } catch (error) {
      throw new HttpException('Error al buscar TODOS', 400, {
        cause: new Error(error),
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!Number.isInteger(Number(id))) {
      throw new HttpException('Id invalido', HttpStatus.BAD_REQUEST);
    }
    
    const todo: Todo = await this.todoService.findById(+id);
    if (todo == null) {
      throw new HttpException('Todo no encontrado', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException('Error al crear TODO', 400, {
        cause: new Error(error),
      });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      return await this.todoService.update(+id, updateTodoDto);
    } catch (error) {
      throw new HttpException('Error al crear TODO', 400, {
        cause: new Error(error),
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!Number.isInteger(Number(id))) {
        throw new BadRequestException('Id invaylido');
      }

      const success = await this.todoService.remove(+id);

      if (!success) {
        throw new BadRequestException('Error al eliminar TODO');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
