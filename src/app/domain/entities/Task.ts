export interface Task {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    userId: string;
  }