import { SettingsValueProps } from './components/settings/type';
// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const MAPBOX_API = process.env.MAPBOX;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.dashboard; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 64,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 64,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// ----------------------------------------------------------------------

export const cookiesExpires = 3;

export const cookiesKey = {
  themeMode: 'themeMode',
  themeDirection: 'themeDirection',
  themeColorPresets: 'themeColorPresets',
  themeLayout: 'themeLayout',
  themeStretch: 'themeStretch',
};

export const defaultSettings: SettingsValueProps = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'blue',
  themeLayout: 'horizontal',
  themeStretch: false,
};
