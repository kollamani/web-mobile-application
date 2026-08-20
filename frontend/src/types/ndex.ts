export interface User {
  id: string;
  name: string;
  email: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  location?: string;
  fileUrl?: string;
  weather?: WeatherData | null;
  createdAt: string;
}