import { Lesson, Assignment, Message } from './types';

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
  {
    id: '6',
    start: getDateString(0, 15, 45),
    end: getDateString(0, 16, 30),
    title: 'Biologi',
    course: 'BI1',
    location: 'Labbsal 2',
    teacher: 'Karin Holm',
    status: 'normal',
  },
  {
    id: '7',
    start: getDateString(0, 16, 45),
    end: getDateString(0, 17, 30),
    title: 'Samhällskunskap',
    course: 'SH1b',
    location: 'Sal 310',
    teacher: 'Anders Berg',
    status: 'normal',
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

// Mock messages
export const messages: Message[] = [
  {
    id: 'm1',
    sender: 'Anna Lindberg',
    subject: 'Matematikprov nästa vecka',
    preview: 'Hej! Jag vill påminna om att vi har prov på kapitel 3 nästa tisdag. Glöm inte att repetera...',
    timestamp: getDateString(0, 9, 30),
    unread: true,
  },
  {
    id: 'm2',
    sender: 'Expeditionen',
    subject: 'Schema ändrat fredag',
    preview: 'På grund av studiedag för personal är schemat ändrat på fredag. Se bifogat dokument för...',
    timestamp: getDateString(-1, 14, 15),
    unread: true,
  },
  {
    id: 'm3',
    sender: 'Erik Johansson',
    subject: 'Bokrecension - förlängd deadline',
    preview: 'Jag har beslutat att förlänga deadline för bokrecensionen till nästa måndag. Om ni har frågor...',
    timestamp: getDateString(-2, 11, 0),
    unread: false,
  },
  {
    id: 'm4',
    sender: 'Maria Svensson',
    subject: 'Påminnelse: Essay deadline',
    preview: 'Hi everyone! Just a friendly reminder that your essays are due this Friday. Please submit via...',
    timestamp: getDateString(-3, 16, 45),
    unread: false,
  },
  {
    id: 'm5',
    sender: 'Skolsköterskan',
    subject: 'Hälsosamtal',
    preview: 'Det är dags för årligt hälsosamtal. Vänligen boka en tid via länken nedan eller kontakta...',
    timestamp: getDateString(-5, 10, 0),
    unread: false,
  },
];
