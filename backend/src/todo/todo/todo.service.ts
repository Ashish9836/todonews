import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private dataSource: DataSource,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todoCreated = await this.todoRepository.save(createTodoDto);
      return {
        data: todoCreated,
        message: 'Todo created successfully',
        status: 201,
      };
    } catch (e) {
      console.log(e,"error")
      return { data: null, message: 'Internal Issue found', status: 500 };
    }
  }
  async update(id: any, updateTodoDto: any) {
    console.log(id,updateTodoDto,"checking for id and updateTodoDto");
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      return { data: null, message: 'Respective Todo not found!', status: 404 };
    }

    Object.assign(todo, updateTodoDto);
    try {
      const todoCreated = await this.todoRepository.save(todo);
      return {
        data: todoCreated,
        message: 'Todo Updated successfully',
        status: 200,
      };
    } catch {
      return {
        data: null,
        message: 'Internal issue found',
        status: 500,
      };
    }
  }

  async remove(id: any) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (!todo) {
      return { data: null, message: 'Respective Todo not found!', status: 404 };
    }
    try {
      await this.todoRepository.remove(todo);
      return { message: 'Todo deleted successfully', status: 200 };
    } catch {
      return { message: 'Internal issue found', status: 500 };
    }
  }

  async findAll(id: any) {
    const todos = await this.dataSource.query(
      `select title,description,id,isDone from todo where userId = ${id}`,
    );
    return { data: todos, status: 200 };
  }
}
