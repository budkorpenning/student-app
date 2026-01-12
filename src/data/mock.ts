import { Lesson, Assignment, Message, Comment } from './types';

// Mock "now" is always Wednesday at 10:00
// This is used to determine what's "past" for absence status display
export const MOCK_NOW = new Date('2026-01-14T10:00:00'); // A Wednesday

// Helper to create dates relative to mock Wednesday
function getDateStringFromMockNow(dayOffset: number, hours: number, minutes: number): string {
  const date = new Date(MOCK_NOW);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

// Legacy helper for assignments/messages (still relative to actual today)
function getDateString(dayOffset: number, hours: number, minutes: number): string {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
}

// Mock lessons for today (Wednesday in mock time)
export const todayLessons: Lesson[] = [
  {
    id: '1',
    start: getDateStringFromMockNow(0, 8, 15),
    end: getDateStringFromMockNow(0, 9, 0),
    title: 'Matematik',
    course: 'MA1c',
    location: 'Sal 214',
    teacher: 'Anna Lindberg',
  },
  {
    id: '2',
    start: getDateStringFromMockNow(0, 9, 15),
    end: getDateStringFromMockNow(0, 10, 0),
    title: 'Svenska',
    course: 'SV1',
    location: 'Sal 108',
    teacher: 'Erik Johansson',
  },
  {
    id: '3',
    start: getDateStringFromMockNow(0, 10, 15),
    end: getDateStringFromMockNow(0, 11, 0),
    title: 'Engelska',
    course: 'EN5',
    location: 'Sal 305',
    teacher: 'Maria Svensson',
  },
  {
    id: '4',
    start: getDateStringFromMockNow(0, 13, 0),
    end: getDateStringFromMockNow(0, 14, 30),
    title: 'Fysik',
    course: 'FY1',
    location: 'Labbsal 1',
    teacher: 'Johan Karlsson',
  },
  {
    id: '5',
    start: getDateStringFromMockNow(0, 14, 45),
    end: getDateStringFromMockNow(0, 15, 30),
    title: 'Historia',
    course: 'HI1b',
    location: 'Sal 212',
    teacher: 'Lisa Andersson',
  },
  {
    id: '6',
    start: getDateStringFromMockNow(0, 15, 45),
    end: getDateStringFromMockNow(0, 16, 30),
    title: 'Biologi',
    course: 'BI1',
    location: 'Labbsal 2',
    teacher: 'Karin Holm',
  },
  {
    id: '7',
    start: getDateStringFromMockNow(0, 16, 45),
    end: getDateStringFromMockNow(0, 17, 30),
    title: 'Samhällskunskap',
    course: 'SH1b',
    location: 'Sal 310',
    teacher: 'Anders Berg',
  },
];

// Mock lessons for the week (Mon-Fri)
// Monday = -2 days from Wed, Tuesday = -1 day, Wednesday = 0, etc.
export const weekLessons: Record<number, Lesson[]> = {
  1: [ // Monday (past - all have absenceStatus)
    {
      id: 'w1-1',
      start: getDateStringFromMockNow(-2, 8, 15),
      end: getDateStringFromMockNow(-2, 9, 0),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
      absenceStatus: 'present',
    },
    {
      id: 'w1-2',
      start: getDateStringFromMockNow(-2, 9, 15),
      end: getDateStringFromMockNow(-2, 10, 0),
      title: 'Svenska',
      course: 'SV1',
      location: 'Sal 108',
      teacher: 'Erik Johansson',
      absenceStatus: 'present',
    },
    {
      id: 'w1-3',
      start: getDateStringFromMockNow(-2, 10, 15),
      end: getDateStringFromMockNow(-2, 11, 0),
      title: 'Biologi',
      course: 'BI1',
      location: 'Labbsal 2',
      teacher: 'Karin Holm',
      absenceStatus: 'invalid',
    },
  ],
  2: [ // Tuesday (past - all have absenceStatus)
    {
      id: 'w2-1',
      start: getDateStringFromMockNow(-1, 8, 15),
      end: getDateStringFromMockNow(-1, 9, 45),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
      absenceStatus: 'present',
    },
    {
      id: 'w2-2',
      start: getDateStringFromMockNow(-1, 10, 0),
      end: getDateStringFromMockNow(-1, 11, 30),
      title: 'Svenska',
      course: 'SV1',
      location: 'Sal 108',
      teacher: 'Erik Johansson',
      absenceStatus: 'present',
    },
    {
      id: 'w2-3',
      start: getDateStringFromMockNow(-1, 13, 0),
      end: getDateStringFromMockNow(-1, 14, 30),
      title: 'Engelska',
      course: 'EN5',
      location: 'Sal 305',
      teacher: 'Maria Svensson',
      absenceStatus: 'valid',
    },
  ],
  3: [ // Wednesday (today - no absenceStatus shown)
    {
      id: 'w3-1',
      start: getDateStringFromMockNow(0, 9, 0),
      end: getDateStringFromMockNow(0, 10, 30),
      title: 'Historia',
      course: 'HI1b',
      location: 'Sal 212',
      teacher: 'Lisa Andersson',
    },
    {
      id: 'w3-2',
      start: getDateStringFromMockNow(0, 10, 45),
      end: getDateStringFromMockNow(0, 12, 15),
      title: 'Svenska',
      course: 'SV1',
      location: 'Sal 108',
      teacher: 'Erik Johansson',
    },
  ],
  4: [ // Thursday (future - no absenceStatus shown)
    {
      id: 'w4-1',
      start: getDateStringFromMockNow(1, 8, 15),
      end: getDateStringFromMockNow(1, 9, 45),
      title: 'Engelska',
      course: 'EN5',
      location: 'Sal 305',
      teacher: 'Maria Svensson',
    },
    {
      id: 'w4-2',
      start: getDateStringFromMockNow(1, 10, 0),
      end: getDateStringFromMockNow(1, 11, 30),
      title: 'Kemi',
      course: 'KE1',
      location: 'Labbsal 3',
      teacher: 'Peter Nilsson',
    },
    {
      id: 'w4-3',
      start: getDateStringFromMockNow(1, 13, 0),
      end: getDateStringFromMockNow(1, 14, 30),
      title: 'Idrott',
      course: 'IDH1',
      location: 'Idrottshallen',
      teacher: 'Sara Ekström',
    },
  ],
  5: [ // Friday (future - no absenceStatus shown)
    {
      id: 'w5-1',
      start: getDateStringFromMockNow(2, 8, 15),
      end: getDateStringFromMockNow(2, 9, 45),
      title: 'Matematik',
      course: 'MA1c',
      location: 'Sal 214',
      teacher: 'Anna Lindberg',
    },
    {
      id: 'w5-2',
      start: getDateStringFromMockNow(2, 10, 0),
      end: getDateStringFromMockNow(2, 11, 30),
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
    instructions: 'Lös uppgifterna 3.1–3.15 i läroboken. Visa alla uträkningar steg för steg. Svaren ska lämnas in som en PDF-fil. Tänk på att skriva tydligt och motivera dina lösningar.',
    comments: [
      {
        id: 'c1-1',
        authorType: 'teacher',
        authorName: 'Anna Lindberg',
        message: 'Glöm inte att titta på exemplen i kapitel 3.2 innan ni börjar. De ger bra vägledning för de svårare uppgifterna.',
        createdAt: getDateString(-2, 10, 30),
      },
      {
        id: 'c1-2',
        authorType: 'student',
        authorName: 'Du',
        message: 'Tack! Ska jag även inkludera graferna för uppgift 3.12?',
        createdAt: getDateString(-2, 14, 15),
      },
      {
        id: 'c1-3',
        authorType: 'teacher',
        authorName: 'Anna Lindberg',
        message: 'Ja, grafer är ett plus! Använd gärna GeoGebra eller rita för hand.',
        createdAt: getDateString(-1, 8, 45),
      },
    ],
  },
  {
    id: 'a2',
    title: 'Bokrecension: Utvandrarna',
    course: 'Svenska',
    dueAt: getDateString(-1, 23, 59),
    status: 'overdue',
    instructions: 'Skriv en bokrecension på 800–1000 ord om Vilhelm Mobergs "Utvandrarna". Recensionen ska innehålla en kort sammanfattning, analys av huvudteman och din personliga reflektion. Använd korrekt källhänvisning.',
    comments: [
      {
        id: 'c2-1',
        authorType: 'teacher',
        authorName: 'Erik Johansson',
        message: 'Påminnelse: deadline är imorgon. Hör av er om ni behöver förlängning.',
        createdAt: getDateString(-2, 9, 0),
      },
      {
        id: 'c2-2',
        authorType: 'student',
        authorName: 'Du',
        message: 'Jag har varit sjuk i veckan. Skulle det vara möjligt att få några extra dagar?',
        createdAt: getDateString(-1, 16, 30),
      },
    ],
  },
  {
    id: 'a3',
    title: 'Labbrapport: Elektricitet',
    course: 'Fysik',
    dueAt: getDateString(5, 23, 59),
    status: 'open',
    instructions: 'Skriv en labbrapport baserad på laborationen vi genomförde i veckan. Rapporten ska följa den vetenskapliga strukturen: syfte, hypotes, material, metod, resultat, diskussion och slutsats. Inkludera mätdata i tabellform och minst en graf.',
    comments: [
      {
        id: 'c3-1',
        authorType: 'teacher',
        authorName: 'Johan Karlsson',
        message: 'Mätdatan från labben finns nu uppladdad i kursmappen. Ni kan använda den som referens.',
        createdAt: getDateString(-1, 11, 0),
      },
    ],
  },
  {
    id: 'a4',
    title: 'Essay: World War II',
    course: 'Engelska',
    dueAt: getDateString(-3, 23, 59),
    status: 'completed',
    instructions: 'Write an essay (500–700 words) analyzing one significant event during World War II. Focus on causes, consequences, and historical significance. Use at least three credible sources and include a bibliography.',
    comments: [
      {
        id: 'c4-1',
        authorType: 'student',
        authorName: 'Du',
        message: 'I submitted my essay about D-Day. Looking forward to your feedback!',
        createdAt: getDateString(-4, 22, 15),
      },
      {
        id: 'c4-2',
        authorType: 'teacher',
        authorName: 'Maria Svensson',
        message: 'Great work! Well-structured essay with good use of sources. Grade: A. See detailed feedback in the attached document.',
        createdAt: getDateString(-2, 14, 0),
      },
    ],
  },
  {
    id: 'a5',
    title: 'Tidslinje: Svenska kungar',
    course: 'Historia',
    dueAt: getDateString(7, 23, 59),
    status: 'open',
    instructions: 'Skapa en illustrerad tidslinje över svenska kungar från Gustav Vasa till nutid. Inkludera minst 10 regenter med viktiga händelser under deras regeringstid. Tidslinjen kan göras digitalt eller för hand.',
    comments: [],
  },
  {
    id: 'a6',
    title: 'Glosförhör kapitel 5',
    course: 'Engelska',
    dueAt: getDateString(1, 23, 59),
    status: 'open',
    instructions: 'Förbered dig på glosförhör på kapitel 5 i textboken. Förhöret kommer att innehålla 20 ord som ska översättas från svenska till engelska. Tips: använd Quizlet-länken i kursmaterialet för att öva.',
    comments: [
      {
        id: 'c6-1',
        authorType: 'teacher',
        authorName: 'Maria Svensson',
        message: 'Remember to practice the phrasal verbs especially - they will be on the test!',
        createdAt: getDateString(0, 9, 15),
      },
    ],
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
