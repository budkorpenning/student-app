import { Lesson, Assignment } from './types';

// Helper to create dates relative to today
function getDateString(dayOffset: number, hours: number, minutes: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

// Mock lessons for today
export const todayLessons: Lesson[] = [
  {
    id: '1',
    start: getDateString(0, 8, 15),
    end: getDateString(0, 9, 0),
    title: 'Matematik',
    course: 'MA1c',
    location: 'Sal 214',
    teacher: 'Anna Lindberg',
    status: 'normal',
  },
  {
    id: '2',
    start: getDateString(0, 9, 15),
    end: getDateString(0, 10, 0),
    title: 'Svenska',
    course: 'SV1',
    location: 'Sal 108',
    teacher: 'Erik Johansson',
    status: 'normal',
  },
  {
    id: '3',
    start: getDateString(0, 10, 15),
    end: getDateString(0, 11, 0),
    title: 'Engelska',
    course: 'EN5',
    location: 'Sal 305',
    teacher: 'Maria Svensson',
    status: 'changed',
  },
  {
    id: '4',
    start: getDateString(0, 13, 0),
    end: getDateString(0, 14, 30),
    title: 'Fysik',
    course: 'FY1',
    location: 'Labbsal 1',
    teacher: 'Johan Karlsson',
    status: 'normal',
  },
  {
    id: '5',
    start: getDateString(0, 14, 45),
    end: getDateString(0, 15, 30),
    title: 'Historia',
    course: 'HI1b',
    location: 'Sal 212',
    teacher: 'Lisa Andersson',
    status: 'cancelled',
  },
];

// Mock lessons for the week (Mon-Fri)
export const weekLessons: Record<number, Lesson[]> = {
  1: [ // Monday
    {
      id: 'w1-1',
      start: getDateString(0, 8, 15),
      end: getDateString(0, 9, 0),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
    },
    {
      id: 'w1-2',
      start: getDateString(0, 9, 15),
      end: getDateString(0, 10, 0),
      title: 'Svenska',
      course: 'SV1',
      location: 'Sal 108',
      teacher: 'Erik Johansson',
    },
    {
      id: 'w1-3',
      start: getDateString(0, 10, 15),
      end: getDateString(0, 11, 0),
      title: 'Engelska',
      course: 'EN5',
      location: 'Sal 305',
      teacher: 'Maria Svensson',
      status: 'changed',
    },
  ],
  2: [ // Tuesday
    {
      id: 'w2-1',
      start: getDateString(1, 8, 15),
      end: getDateString(1, 9, 45),
      title: 'Biologi',
      course: 'BI1',
      location: 'Labbsal 2',
      teacher: 'Karin Holm',
    },
    {
      id: 'w2-2',
      start: getDateString(1, 10, 0),
      end: getDateString(1, 11, 30),
      title: 'Fysik',
      course: 'FY1',
      location: 'Labbsal 1',
      teacher: 'Johan Karlsson',
    },
    {
      id: 'w2-3',
      start: getDateString(1, 13, 0),
      end: getDateString(1, 14, 30),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
    },
  ],
  3: [ // Wednesday
    {
      id: 'w3-1',
      start: getDateString(2, 9, 0),
      end: getDateString(2, 10, 30),
      title: 'Historia',
      course: 'HI1b',
      location: 'Sal 212',
      teacher: 'Lisa Andersson',
    },
    {
      id: 'w3-2',
      start: getDateString(2, 10, 45),
      end: getDateString(2, 12, 15),
      title: 'Svenska',
      course: 'SV1',
      location: 'Sal 108',
      teacher: 'Erik Johansson',
    },
  ],
  4: [ // Thursday
    {
      id: 'w4-1',
      start: getDateString(3, 8, 15),
      end: getDateString(3, 9, 45),
      title: 'Engelska',
      course: 'EN5',
      location: 'Sal 305',
      teacher: 'Maria Svensson',
    },
    {
      id: 'w4-2',
      start: getDateString(3, 10, 0),
      end: getDateString(3, 11, 30),
      title: 'Kemi',
      course: 'KE1',
      location: 'Labbsal 3',
      teacher: 'Peter Nilsson',
      status: 'cancelled',
    },
    {
      id: 'w4-3',
      start: getDateString(3, 13, 0),
      end: getDateString(3, 14, 30),
      title: 'Idrott',
      course: 'IDH1',
      location: 'Idrottshallen',
      teacher: 'Sara Ekström',
    },
  ],
  5: [ // Friday
    {
      id: 'w5-1',
      start: getDateString(4, 8, 15),
      end: getDateString(4, 9, 45),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
    },
    {
      id: 'w5-2',
      start: getDateString(4, 10, 0),
      end: getDateString(4, 11, 30),
      title: 'Samhällskunskap',
      course: 'SH1b',
      location: 'Sal 310',
      teacher: 'Anders Berg',
    },
  ],
};

// Mock assignments
export const assignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Inlämningsuppgift: Derivata',
    course: 'Matematik',
    dueAt: getDateString(2, 23, 59),
    status: 'open',
  },
  {
    id: 'a2',
    title: 'Bokrecension: Utvandrarna',
    course: 'Svenska',
    dueAt: getDateString(-1, 23, 59),
    status: 'overdue',
  },
  {
    id: 'a3',
    title: 'Labbrapport: Elektricitet',
    course: 'Fysik',
    dueAt: getDateString(5, 23, 59),
    status: 'open',
  },
  {
    id: 'a4',
    title: 'Essay: World War II',
    course: 'Engelska',
    dueAt: getDateString(-3, 23, 59),
    status: 'completed',
  },
  {
    id: 'a5',
    title: 'Tidslinje: Svenska kungar',
    course: 'Historia',
    dueAt: getDateString(7, 23, 59),
    status: 'open',
  },
  {
    id: 'a6',
    title: 'Glosförhör kapitel 5',
    course: 'Engelska',
    dueAt: getDateString(1, 23, 59),
    status: 'open',
  },
];
