import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, Colors } from './colors';
import { spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_STORAGE_KEY = 'themeMode';

export interface Theme {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
  isDark: boolean;
}

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  // Load persisted theme mode on mount
  useEffect(() => {
    async function loadThemeMode() {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setModeState(stored);
        }
      } catch {
        // Ignore storage errors, use default
      } finally {
        setIsReady(true);
      }
    }
    loadThemeMode();
  }, []);

  // Persist theme mode when it changes
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch(() => {
      // Ignore storage errors
    });
  }, []);

  // Resolve the effective color scheme
  const isDark = useMemo(() => {
    if (mode === 'system') {
      return systemColorScheme === 'dark';
    }
    return mode === 'dark';
  }, [mode, systemColorScheme]);

  // Build the theme object
  const theme = useMemo<Theme>(
    () => ({
      colors: isDark ? darkColors : lightColors,
      spacing,
      typography,
      isDark,
    }),
    [isDark]
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, setMode, theme, isDark }),
    [mode, setMode, theme, isDark]
  );

  // Avoid rendering children until theme is loaded to prevent flicker
  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
}

export function useThemeMode(): Pick<ThemeContextValue, 'mode' | 'setMode' | 'isDark'> {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeProvider');
  }
  return { mode: context.mode, setMode: context.setMode, isDark: context.isDark };
}
