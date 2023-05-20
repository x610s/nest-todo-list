import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new HttpException(
        { message: ['Id inválido'] },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoService.findById(+id);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    if (isNaN(Number(id))) {
      throw new HttpException(
        { message: ['Id inválido'] },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoService.update(+id, updateTodoDto);
  }

  @Put('markAsReady/:id')
  async markAsReady(@Param('id') id: string) {
    if (isNaN(Number(id))) {
      throw new HttpException(
        { message: ['Id inválido'] },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoService.markAsReady(+id);
  }

  @Delete(':id')
  async remove(
    @Param('id')
    id: string,
  ) {
    if (isNaN(Number(id))) {
      throw new HttpException(
        { message: ['Id inválido'] },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.todoService.remove(+id);
  }
}
