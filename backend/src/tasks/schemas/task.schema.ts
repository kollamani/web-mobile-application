import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TaskStatus } from '../enums/task-status.enum';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop()
  priority?: string;

  @Prop()
  fileUrl?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooseSchema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);