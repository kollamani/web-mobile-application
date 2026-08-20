import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './schemas/dto/create-task.dto';
import { QueryTaskDto } from './schemas/dto/query-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Req() req: any, @Query() queryDto: QueryTaskDto) {
    // Ensure we pass a string, not a function reference or object
    const userId = typeof req.user?.userId === 'string' 
      ? req.user.userId 
      : String(req.user?._id || req.user?.sub);

    return this.tasksService.findAll(userId, queryDto);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    const userId = typeof req.user?.userId === 'string' 
      ? req.user.userId 
      : String(req.user?._id || req.user?.sub);

    return this.tasksService.create(createTaskDto, userId);
  }
}