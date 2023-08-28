import React, {useContext} from 'react';
import {ECOMMERCE_THEME as DEFAULT_APP_THEME} from './light-theme/ecommerceTheme';
import {AppTheme} from './appTheme';

// ==============Custom Theme React Context =================
// NOTE: While in theory we could extend Paper Theme we do not want to fiddle with their types

export const ThemeContext = React.createContext<AppTheme>(DEFAULT_APP_THEME);

// NOTE: use useAppTheme hook to fetch current theme from your components
export const useAppTheme = (): AppTheme => {
  // NOTE: it is more readable to make a variable value than to just return
  return useContext(ThemeContext);
};
