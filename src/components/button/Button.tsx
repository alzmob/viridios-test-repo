// NOTE: This component is modified version of the Button component form the react-native-paper library
// NOTE: The icon is placed to the right of the button label and iconStyle prop is added
// NOTE: The number of lines for label is set to 2

import React from 'react';
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import color from 'color';

import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';
import Icon, {IconSource} from 'react-native-paper/src/components/Icon';
import {black, white} from 'react-native-paper/src/styles/colors';
import {
  Surface,
  Text,
  TouchableRipple,
  withTheme,
  DefaultTheme,
} from 'react-native-paper';
import {Theme} from 'react-native-paper/src/types';

export type Props = React.ComponentProps<typeof Surface> & {
  /**
   * Mode of the button. You can change the mode to adjust the styling to give it desired emphasis.
   * - `text` - flat button without background or outline (low emphasis)
   * - `outlined` - button with an outline (medium emphasis)
   * - `contained` - button with a background color and elevation shadow (high emphasis)
   */
  mode?: 'text' | 'outlined' | 'contained';
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for `contained` mode.
   */
  dark?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconSource;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Style of button's inner content.
   * Use this prop to apply custom height and width.
   */
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Style for the button icon.
   */
  iconStyle?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme?: Theme;
  /**
   * testID to be used on tests.
   */
  testID?: string;
  activityIndicatorColor?: string;
};

type State = {
  elevation: Animated.Value;
};

/**
 * A button is component that the user can press to trigger an action.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/button-1.png" />
 *     <figcaption>Text button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-2.png" />
 *     <figcaption>Outlined button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/button-3.png" />
 *     <figcaption>Contained button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
 *     Press me
 *   </Button>
 * );
 *
 * export default MyComponent;
 * ```
 */
class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {mode} = this.props;
    this.state = {
      elevation: new Animated.Value(mode === 'contained' ? 2 : 0),
    };
  }

  private handlePressIn = () => {
    const {mode, theme} = this.props;
    const {elevation} = this.state;
    if (mode === 'contained' && theme) {
      const {
        animation: {scale},
      } = this.props ? theme : DefaultTheme;
      Animated.timing(elevation, {
        toValue: 8,
        duration: 200 * scale,
        useNativeDriver: false,
      }).start();
    }
  };

  private handlePressOut = () => {
    const {mode, theme} = this.props;
    const {elevation} = this.state;
    if (mode === 'contained' && theme) {
      const {
        animation: {scale},
      } = this.props ? theme : DefaultTheme;
      Animated.timing(elevation, {
        toValue: 2,
        duration: 150 * scale,
        useNativeDriver: false,
      }).start();
    }
  };

  render() {
    const {
      disabled,
      compact,
      mode = 'text',
      dark,
      loading,
      icon,
      color: buttonColor,
      children,
      uppercase = true,
      accessibilityLabel,
      onPress,
      style,
      theme = DefaultTheme,
      contentStyle,
      labelStyle,
      iconStyle,
      testID,
      activityIndicatorColor,
      ...rest
    } = this.props;
    const {colors, roundness} = theme;
    const font = theme.fonts.regular;

    let backgroundColor;
    let borderColor;
    let textColor;
    let borderWidth;

    if (mode === 'contained') {
      if (disabled) {
        backgroundColor = color(theme.dark ? white : black)
          .alpha(0.12)
          .rgb()
          .string();
      } else if (buttonColor) {
        backgroundColor = buttonColor;
      } else {
        backgroundColor = colors.primary;
      }
    } else {
      backgroundColor = 'transparent';
    }

    if (mode === 'outlined') {
      borderColor = color(theme.dark ? white : black)
        .alpha(0.29)
        .rgb()
        .string();
      borderWidth = StyleSheet.hairlineWidth;
    } else {
      borderColor = 'transparent';
      borderWidth = 0;
    }

    if (disabled) {
      textColor = color(theme.dark ? white : black)
        .alpha(0.32)
        .rgb()
        .string();
    } else if (mode === 'contained') {
      let isDark;

      if (typeof dark === 'boolean') {
        isDark = dark;
      } else {
        isDark =
          backgroundColor === 'transparent'
            ? false
            : !color(backgroundColor).isLight();
      }

      textColor = isDark ? white : black;
    } else if (buttonColor) {
      textColor = buttonColor;
    } else {
      textColor = colors.primary;
    }

    const rippleColor = 'rgba(0, 0, 0, 0.32)';
    const buttonStyle = {
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius: roundness,
    };
    const touchableStyle = {
      borderRadius: style
        ? StyleSheet.flatten(style as ViewStyle).borderRadius || roundness
        : roundness,
    };
    const textStyle = {color: textColor, ...font};
    const elevation =
      // I ignored this line beacuse if I would use destructuring there would be a duplication of variables
      // and I wouldn't declare different variable for elevation because I am not sure how would that affect the
      // implementation in general

      disabled || mode !== 'contained' ? 0 : this.state.elevation;

    return (
      <Surface
        {...rest}
        style={[
          styles.button,
          compact && styles.compact,
          {elevation} as ViewStyle,
          buttonStyle,
          style,
        ]}>
        <TouchableRipple
          borderless
          delayPressIn={0}
          onPress={onPress}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{disabled}}
          accessibilityRole="button"
          disabled={disabled}
          rippleColor={rippleColor}
          style={touchableStyle}
          testID={testID}>
          <View style={[styles.content, contentStyle]}>
            <Text
              numberOfLines={2}
              style={[
                styles.label,
                compact && styles.compactLabel,
                uppercase && styles.uppercaseLabel,
                textStyle,
                font,
                labelStyle,
              ]}>
              {children}
            </Text>
            {icon && loading !== true ? (
              <View style={[styles.icon, iconStyle]}>
                <Icon source={icon} size={16} color={textColor} />
              </View>
            ) : null}
            {loading ? (
              <ActivityIndicator
                size={16}
                color={activityIndicatorColor || textColor}
                style={[styles.icon, iconStyle]}
              />
            ) : null}
          </View>
        </TouchableRipple>
      </Surface>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  compact: {
    minWidth: 'auto',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: 'uppercase',
  },
});

// I used ts ignore on this line because the error is that children prop is required and that it
// is missing on button type. but it is there on the type and it is added in the button type as required
// @ts-ignore
export default withTheme(Button);
