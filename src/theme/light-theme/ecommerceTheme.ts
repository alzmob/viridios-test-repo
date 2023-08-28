import {AppTheme} from '../appTheme';
import {Colors} from './lighThemeColors';

export const ECOMMERCE_THEME: AppTheme = {
  colors: {
    white: Colors.WHITE,
    black: Colors.BLACK,
    statusBarBackgroundColor: Colors.STATUS_BAR_BACGKROUND,
    onBoardingBackgroundColor: Colors.ONBOARDING_BACKGROUND,
    headerBackgroundColor: Colors.HEADER_BACKGROUND,
    backgroundColor: Colors.BACKGROUND,
    iconRippleColor: Colors.ICON_RIPPLE_COLOR,
    selectedThemeColor: Colors.SELECTED_THEME,
    unselectedThemeColor: Colors.UNSELECTED_THEME,
    selectedRadioButton: Colors.SELECTED_RADIO_BUTTON,
    sideMenuBackgroundColor: Colors.SIDEMENU_BACKGROUND,
    sideMenuTextColor: Colors.WHITE,
    divideColor: Colors.DIVIDER_COLOR,
    primaryTextColor: Colors.TEXT,
    secondaryTextColor: Colors.BACKGROUND,
    sideMenuDividerColor: Colors.SIDEMENU_DIVIDER,
    bottomTabsIconColor: Colors.BOTTOM_TABS_ICONS,
    bottomTabsBorderColorl: Colors.BOTTOM_TABS_BORDER,
    primaryChipColor: Colors.PRIMARY_CHIP,
    secondaryChipColor: Colors.SECONDARY_CHIP,
    tertiaryChipColor: Colors.TERTIRARY_CHIP,
    primaryChipTextColor: Colors.PRIMARY_CHIP_TEXT,
    mainScreenHeaderBorderColor: Colors.MAIN_SCREEN_BORDER,
    primaryInputLabel: Colors.INPUT_LABEL,
    errorInputText: Colors.INPUT_ERROR_TEXT,
    focusedInputField: Colors.INPUT_FOCUSED,
    unFocusedInputField: Colors.INPUT_UNFOCUSED,
    errorBorderInputField: Colors.INPUT_ERROR_BORDER,
    placeholderTextColor: Colors.PLACEHOLDER_COLOR,
    selectionCursorColor: Colors.SELECTION_CURSOR,
    headerIconColor: Colors.BACKGROUND,
    cartImageBackgroundColor: Colors.CART_IMAGE_BACGKROUND,
    cartTextColor: Colors.CART_TEXT_COLOR,
    orderInfoTextColor: Colors.BLACK,
    primaryButtonBackgroundColor: Colors.PRIMARY_BUTTON_BACKGROUND,
    primaryButtonLabelColor: Colors.PRIMARY_BUTTON_LABEL,
    disabledButtonBackgroundColor: Colors.DISABLED_BUTTON_BACKGROUND,
    loginButtonBackgroundColor: Colors.LOGIN_BUTTON_BACKGROUND,
    loginButtonTextColor: Colors.LOGIN_BUTTON_LABEL,
    skeletonBackgroundColor: Colors.SKELETON_BACKGROUND_COLOR,
    skeletonHighlightColor: Colors.SKELETON_HIGHTLIGHT_COLOR,
    welcomeBannerBackgroundColor: Colors.WELCOME_BANNER_BACKGROUND,
    welcomeBannerTextColor: Colors.WELCOME_BANNER_TEXT,
    stepperCurrentColor: Colors.STEPPER_CURRENT_COLOR,
    stepperCurrentTextColor: Colors.STEPPER_CURRENT_TEXT,
    stepperUnfinishedColor: Colors.STEPPER_UNFINISHED_COLOR,
    stepperUnfinishedTextColor: Colors.STEPPER_UNFINISHED_TEXT,
    priceRangeTextColor: Colors.PRICE_RANGE_TEXT,
    priceRangeStrokeColor: Colors.PRICE_RANGE_STROKE,
    selectedChipBackroundColor: Colors.SELECTED_CHIP_BACKGROUND,
    unselectedChipbackgroundColor: Colors.UNSELECTED_CHIP_BACKGROUND,
    chipText: Colors.CHIP_TEXT,
    flashMessageDangerBackgroundColors: Colors.DANGER_COLOR,
    flashMessageSuccessBackgroundColors: Colors.SUCCESS_COLOR,
    flashMessageWarningBackgroundColors: Colors.WARNGING_COLOR,
    flashMessageInfoBackgroundColors: Colors.INFO_COLOR,
    flashMessageTextColor: Colors.WHITE,
    flashMessageWarningTextColor: Colors.WARNING_TEXT_COLOR,
    splashScreenStatusBarColor: Colors.SPLASH_COLOR,
    starSelectedColor: Colors.STAR_SELECTED,
    starUnseletedColor: Colors.STAR_UNSELECTED,
  },
  buttons: {
    primaryButtonContained: {
      containerStyle: {
        borderRadius: 12,
        backgroundColor: Colors.PRIMARY_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: Colors.PRIMARY_BUTTON_LABEL,
      },
    },
    primaryButtonOutlined: {
      containerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.PRIMARY_BUTTON_BACKGROUND,
        backgroundColor: 'transparent',
      },
      labelStyle: {
        color: Colors.PRIMARY_BUTTON_BACKGROUND,
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
        backgroundColor: Colors.LOGIN_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: Colors.LOGIN_BUTTON_LABEL,
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
        backgroundColor: Colors.DISABLED_BUTTON_BACKGROUND,
      },
      labelStyle: {
        color: 'white',
      },
    },
  },
};
