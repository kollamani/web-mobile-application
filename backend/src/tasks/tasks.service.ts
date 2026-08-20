import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './schemas/dto/create-task.dto';
import { QueryTaskDto } from './schemas/dto/query-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async findAll(userId: string, queryDto?: QueryTaskDto) {
    try {
      if (!userId) return [];

      const filter: any = { user: new Types.ObjectId(userId) };

      if (queryDto?.status) {
        filter.status = queryDto.status;
      }

      if (queryDto?.search) {
        filter.title = { $regex: queryDto.search, $options: 'i' };
      }

      return await this.taskModel.find(filter).exec();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const newTask = new this.taskModel({
      ...createTaskDto,
      user: new Types.ObjectId(userId),
    });

    return newTask.save();
  }
}