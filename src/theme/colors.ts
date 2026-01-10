export const palette = {
  white: '#FFFFFF',
  black: '#000000',

  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  blue500: '#3B82F6',
  blue600: '#2563EB',

  red500: '#EF4444',
  red600: '#DC2626',

  amber500: '#F59E0B',
  amber600: '#D97706',

  green500: '#22C55E',
  green600: '#16A34A',
} as const;

export const lightColors = {
  bg: palette.gray50,
  surface: palette.white,
  surface2: palette.gray100,
  text: palette.gray900,
  textMuted: palette.gray500,
  border: palette.gray200,

  primary: palette.blue600,
  danger: palette.red500,
  warning: palette.amber500,
  success: palette.green500,

  tabBarBg: palette.white,
  tabBarBorder: palette.gray200,
  tabBarActive: palette.blue600,
  tabBarInactive: palette.gray400,
} as const;

export const darkColors = {
  bg: palette.gray900,
  surface: palette.gray800,
  surface2: palette.gray700,
  text: palette.gray50,
  textMuted: palette.gray400,
  border: palette.gray700,

  primary: palette.blue500,
  danger: palette.red500,
  warning: palette.amber500,
  success: palette.green500,

  tabBarBg: palette.gray800,
  tabBarBorder: palette.gray700,
  tabBarActive: palette.blue500,
  tabBarInactive: palette.gray500,
} as const;

export interface Colors {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  danger: string;
  warning: string;
  success: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
}
