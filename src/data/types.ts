export type LessonStatus = 'normal' | 'changed' | 'cancelled';

export interface Lesson {
  id: string;
  start: string; // ISO string
  end: string; // ISO string
  title: string;
  course?: string;
  location?: string;
  teacher?: string;
  status?: LessonStatus;
}

export type AssignmentStatus = 'open' | 'overdue' | 'completed';

export interface Assignment {
  id: string;
  title: string;
  course?: string;
  dueAt: string; // ISO string
  status: AssignmentStatus;
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string; // ISO string
  unread: boolean;
}
