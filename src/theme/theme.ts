import { useColorScheme } from 'react-native';
import { lightColors, darkColors, Colors } from './colors';
import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  isDark: boolean;
}

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    colors: isDark ? darkColors : lightColors,
    spacing,
    typography,
    isDark,
  };
}

export { spacing, typography };
export type { Colors, Spacing, Typography };
