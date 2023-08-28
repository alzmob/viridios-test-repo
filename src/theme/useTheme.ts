import {MainTheme} from './themeSlice';
import {AppTheme} from './appTheme';
import {ECOMMERCE_DARK_THEME} from './dark-theme/ecommerceDarkThem';
import {ECOMMERCE_THEME} from './light-theme/ecommerceTheme';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export const useTheme = (): {appTheme: AppTheme} => {
  const theme = useSelector((state: RootState) => state.theme.appTheme);
  const themes: Record<MainTheme, AppTheme> = {
    LIGHT: ECOMMERCE_THEME,
    DARK: ECOMMERCE_DARK_THEME,
  };

  const mainTheme = themes[theme] || ECOMMERCE_THEME;
  return {
    appTheme: mainTheme,
  };
};
