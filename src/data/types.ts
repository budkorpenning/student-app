export type AbsenceStatus = 'present' | 'valid' | 'invalid';

export interface Lesson {
  id: string;
  start: string; // ISO string
  end: string; // ISO string
  title: string;
  course?: string;
  location?: string;
  teacher?: string;
  absenceStatus?: AbsenceStatus;
}

export type AssignmentStatus = 'open' | 'overdue' | 'completed';

export type CommentAuthorType = 'teacher' | 'student';

export interface Comment {
  id: string;
  authorType: CommentAuthorType;
  authorName: string;
  message: string;
  createdAt: string; // ISO string
}

export interface Assignment {
  id: string;
  title: string;
  course?: string;
  dueAt: string; // ISO string
  status: AssignmentStatus;
  instructions: string;
  comments: Comment[];
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string; // ISO string
  unread: boolean;
}
