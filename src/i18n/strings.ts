export type Language = 'sv' | 'en';

export const strings = {
  sv: {
    // Tabs
    tabToday: 'Idag',
    tabWeek: 'Vecka',
    tabAssignments: 'Uppgifter',
    tabSettings: 'Inställningar',

    // Today screen
    todayTitle: 'Idag',
    nextUp: 'Nästa',
    laterToday: 'Senare idag',
    dueSoon: 'Inlämning snart',
    noLessonsToday: 'Inga lektioner idag',
    noUpcomingAssignments: 'Inga kommande inlämningar',
    allDoneForToday: 'Allt klart för idag!',

    // Week screen
    weekTitle: 'Vecka',
    noLessonsThisDay: 'Inga lektioner denna dag',

    // Day names (short)
    mon: 'Mån',
    tue: 'Tis',
    wed: 'Ons',
    thu: 'Tor',
    fri: 'Fre',
    sat: 'Lör',
    sun: 'Sön',

    // Assignments screen
    assignmentsTitle: 'Uppgifter',
    filterAll: 'Alla',
    filterOpen: 'Öppna',
    filterOverdue: 'Försenade',
    filterCompleted: 'Klara',
    noAssignments: 'Inga uppgifter',
    duePrefix: 'Inlämning',

    // Assignment status badges
    statusOpen: 'Öppen',
    statusOverdue: 'Försenad',
    statusCompleted: 'Klar',

    // Lesson status badges
    lessonChanged: 'Ändrad',
    lessonCancelled: 'Inställd',

    // Settings screen
    settingsTitle: 'Inställningar',
    language: 'Språk',
    languageSwedish: 'Svenska',
    languageEnglish: 'English',
    theme: 'Utseende',
    themeSystem: 'System',
    themeLight: 'Ljust',
    themeDark: 'Mörkt',
    about: 'Om appen',
    version: 'Version',

    // Common
    loading: 'Laddar...',
    error: 'Något gick fel',
    retry: 'Försök igen',
    room: 'Sal',
  },
  en: {
    // Tabs
    tabToday: 'Today',
    tabWeek: 'Week',
    tabAssignments: 'Assignments',
    tabSettings: 'Settings',

    // Today screen
    todayTitle: 'Today',
    nextUp: 'Next up',
    laterToday: 'Later today',
    dueSoon: 'Due soon',
    noLessonsToday: 'No lessons today',
    noUpcomingAssignments: 'No upcoming assignments',
    allDoneForToday: 'All done for today!',

    // Week screen
    weekTitle: 'Week',
    noLessonsThisDay: 'No lessons this day',

    // Day names (short)
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',

    // Assignments screen
    assignmentsTitle: 'Assignments',
    filterAll: 'All',
    filterOpen: 'Open',
    filterOverdue: 'Overdue',
    filterCompleted: 'Completed',
    noAssignments: 'No assignments',
    duePrefix: 'Due',

    // Assignment status badges
    statusOpen: 'Open',
    statusOverdue: 'Overdue',
    statusCompleted: 'Completed',

    // Lesson status badges
    lessonChanged: 'Changed',
    lessonCancelled: 'Cancelled',

    // Settings screen
    settingsTitle: 'Settings',
    language: 'Language',
    languageSwedish: 'Svenska',
    languageEnglish: 'English',
    theme: 'Theme',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    about: 'About',
    version: 'Version',

    // Common
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Try again',
    room: 'Room',
  },
} as const;

export type StringKey = keyof typeof strings.sv;
