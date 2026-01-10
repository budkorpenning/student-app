import { TextStyle } from 'react-native';

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  } as TextStyle,

  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 22,
  } as TextStyle,

  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  } as TextStyle,

  caption: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,

  captionBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  } as TextStyle,

  small: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
} as const;

export type Typography = typeof typography;
