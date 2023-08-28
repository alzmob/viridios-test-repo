import {AppTheme} from '../appTheme';
import {DarkThemeColors} from './darkThemeColors';

export const ECOMMERCE_DARK_THEME: AppTheme = {
  colors: {
    white: DarkThemeColors.WHITE,
    black: DarkThemeColors.BLACK,
    statusBarBackgroundColor: DarkThemeColors.STATUS_BAR_BACGKROUND,
    backgroundColor: DarkThemeColors.BACKGROUND,
    iconRippleColor: DarkThemeColors.ICON_RIPPLE_COLOR,
    selectedThemeColor: DarkThemeColors.SELECTED_THEME,
    unselectedThemeColor: DarkThemeColors.UNSELECTED_THEME,
    selectedRadioButton: DarkThemeColors.SELECTED_RADIO_BUTTON,
    sideMenuBackgroundColor: DarkThemeColors.SIDEMENU_BACKGROUND,
    sideMenuTextColor: DarkThemeColors.TEXT,
    divideColor: DarkThemeColors.DIVIDER_COLOR,
    primaryTextColor: DarkThemeColors.TEXT,
    secondaryTextColor: DarkThemeColors.BACKGROUND,
    sideMenuDividerColor: DarkThemeColors.SIDEMENU_DIVIDER,
    bottomTabsIconColor: DarkThemeColors.BOTTOM_TABS_ICONS,
    bottomTabsBorderColorl: DarkThemeColors.BOTTOM_TABS_BORDER,
    primaryChipColor: DarkThemeColors.PRIMARY_CHIP,
    secondaryChipColor: DarkThemeColors.SECONDARY_CHIP,
    tertiaryChipColor: DarkThemeColors.TERTIRARY_CHIP,
    primaryChipTextColor: DarkThemeColors.PRIMARY_CHIP_TEXT,
    mainScreenHeaderBorderColor: DarkThemeColors.MAIN_SCREEN_BORDER,
    primaryInputLabel: DarkThemeColors.INPUT_LABEL,
    errorInputText: DarkThemeColors.INPUT_ERROR_TEXT,
    focusedInputField: DarkThemeColors.INPUT_FOCUSED,
    unFocusedInputField: DarkThemeColors.INPUT_UNFOCUSED,
    errorBorderInputField: DarkThemeColors.INPUT_ERROR_BORDER,
    selectionCursorColor: DarkThemeColors.SELECTION_CURSOR,
    placeholderTextColor: DarkThemeColors.PLACEHOLDER_COLOR,
    headerIconColor: DarkThemeColors.BACKGROUND,
    cartImageBackgroundColor: DarkThemeColors.CART_IMAGE_BACGKROUND,
    cartTextColor: DarkThemeColors.CART_TEXT_COLOR,
    orderInfoTextColor: DarkThemeColors.BLACK,
    primaryButtonBackgroundColor: DarkThemeColors.PRIMARY_BUTTON_BACKGROUND,
    primaryButtonLabelColor: DarkThemeColors.PRIMARY_BUTTON_LABEL,
    disabledButtonBackgroundColor: DarkThemeColors.DISABLED_BUTTON_BACKGROUND,
    loginButtonBackgroundColor: DarkThemeColors.LOGIN_BUTTON_BACKGROUND,
    loginButtonTextColor: DarkThemeColors.LOGIN_BUTTON_LABEL,
    skeletonBackgroundColor: DarkThemeColors.SKELETON_BACKGROUND_COLOR,
    skeletonHighlightColor: DarkThemeColors.SKELETON_HIGHTLIGHT_COLOR,
    welcomeBannerBackgroundColor: DarkThemeColors.WELCOME_BANNER_BACKGROUND,
    welcomeBannerTextColor: DarkThemeColors.WELCOME_BANNER_TEXT,
    stepperCurrentColor: DarkThemeColors.STEPPER_CURRENT_COLOR,
    stepperCurrentTextColor: DarkThemeColors.STEPPER_CURRENT_TEXT,
    stepperUnfinishedColor: DarkThemeColors.STEPPER_UNFINISHED_COLOR,
    stepperUnfinishedTextColor: DarkThemeColors.STEPPER_UNFINISHED_TEXT,
    priceRangeTextColor: DarkThemeColors.PRICE_RANGE_TEXT,
    priceRangeStrokeColor: DarkThemeColors.PRICE_RANGE_STROKE,
    selectedChipBackroundColor: DarkThemeColors.SELECTED_CHIP_BACKGROUND,
    unselectedChipbackgroundColor: DarkThemeColors.UNSELECTED_CHIP_BACKGROUND,
    chipText: DarkThemeColors.CHIP_TEXT,
    flashMessageDangerBackgroundColors: DarkThemeColors.DANGER_COLOR,
    flashMessageSuccessBackgroundColors: DarkThemeColors.SUCCESS_COLOR,
    flashMessageWarningBackgroundColors: DarkThemeColors.WARNGING_COLOR,
    flashMessageInfoBackgroundColors: DarkThemeColors.INFO_COLOR,
    flashMessageTextColor: DarkThemeColors.WHITE,
    flashMessageWarningTextColor: DarkThemeColors.WARNING_TEXT_COLOR,
    splashScreenStatusBarColor: DarkThemeColors.SPLASH_COLOR,
    starSelectedColor: DarkThemeColors.STAR_SELECTED,
    starUnseletedColor: DarkThemeColors.STAR_UNSELECTED,
  },
  buttons: {
    primaryButtonContained: {
      containerStyle: {
        borderRadius: 12,
        backgroundColor: DarkThemeColors.PRIMARY_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: DarkThemeColors.PRIMARY_BUTTON_LABEL,
      },
    },
    primaryButtonOutlined: {
      containerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: DarkThemeColors.TEXT,
        backgroundColor: 'transparent',
      },
      labelStyle: {
        color: DarkThemeColors.WHITE,
      },
    },
    deleteAccountButton: {
      containerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#CC334D',
      },
      labelStyle: {
        color: '#CC334D',
      },
    },
    loginButton: {
      containerStyle: {
        borderRadius: 12,
        backgroundColor: DarkThemeColors.LOGIN_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: DarkThemeColors.LOGIN_BUTTON_LABEL,
      },
    },
    logoutButton: {
      containerStyle: {
        borderRadius: 12,
        backgroundColor: 'black',
      },
      labelStyle: {
        color: 'white',
      },
    },
    disabledButton: {
      containerStyle: {
        borderRadius: 12,
        backgroundColor: DarkThemeColors.DISABLED_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: 'white',
      },
    },
  },
};
