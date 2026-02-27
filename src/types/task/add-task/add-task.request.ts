export interface AddTaskReq {
  userId?: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}
