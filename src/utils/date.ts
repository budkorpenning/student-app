export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function formatTimeRange(startIso: string, endIso: string): string {
  return `${formatTime(startIso)}–${formatTime(endIso)}`;
}

export function formatRelativeDate(isoString: string, language: 'sv' | 'en'): string {
  const date = new Date(isoString);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDays = Math.round((startOfTarget.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return language === 'sv' ? 'Idag' : 'Today';
  } else if (diffDays === 1) {
    return language === 'sv' ? 'Imorgon' : 'Tomorrow';
  } else if (diffDays === -1) {
    return language === 'sv' ? 'Igår' : 'Yesterday';
  } else if (diffDays < -1) {
    const absDays = Math.abs(diffDays);
    return language === 'sv' ? `${absDays} dagar sedan` : `${absDays} days ago`;
  } else if (diffDays <= 7) {
    return language === 'sv' ? `Om ${diffDays} dagar` : `In ${diffDays} days`;
  } else {
    return formatShortDate(isoString);
  }
}

export function formatShortDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}

export function getDayOfWeek(date: Date): number {
  // Returns 1-7 where 1 is Monday, 7 is Sunday
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

export function isToday(isoString: string): boolean {
  const date = new Date(isoString);
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function isPast(isoString: string): boolean {
  return new Date(isoString) < new Date();
}

export function formatDeadline(isoString: string, language: 'sv' | 'en'): string {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (language === 'sv') {
    return `${year}-${month}-${day} kl. ${hours}:${minutes}`;
  }
  return `${year}-${month}-${day} at ${hours}:${minutes}`;
}

export function formatCommentTime(isoString: string, language: 'sv' | 'en'): string {
  const date = new Date(isoString);
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffDays = Math.round((startOfTarget.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24));
  const time = formatTime(isoString);

  if (diffDays === 0) {
    const prefix = language === 'sv' ? 'Idag' : 'Today';
    return `${prefix} ${time}`;
  } else if (diffDays === -1) {
    const prefix = language === 'sv' ? 'Igår' : 'Yesterday';
    return `${prefix} ${time}`;
  } else {
    return `${formatShortDate(isoString)} ${time}`;
  }
}

// Check if a lesson is in the past relative to MOCK_NOW
// Used to determine if absence status should be shown
import { MOCK_NOW } from '../data/mock';

export function isLessonPast(lessonEndIso: string): boolean {
  const lessonEnd = new Date(lessonEndIso);
  return lessonEnd < MOCK_NOW;
}
