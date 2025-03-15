import { ComponentType, forwardRef } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

import { Text, TextProps } from "./Text"

import { StyleSheet } from "react-native-unistyles"

type Presets = "filled" | "reversed"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export const Button = forwardRef<View, ButtonProps>(function Button(props: ButtonProps, ref) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    ...rest
  } = props

  styles.useVariants({
    preset: props.preset,
  })

  // const preset: Presets = props.preset ?? "default"
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<ViewStyle>} The view style based on the pressed state.
   */
  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      styles.baseViewStyle(pressed),
      $viewStyleOverride,
      !!pressed && $pressedViewStyleOverride,
      !!disabled && $disabledViewStyleOverride,
    ]
  }
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<TextStyle>} The text style based on the pressed state.
   */
  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      styles.baseTextStyle(pressed),
      $textStyleOverride,
      !!pressed && $pressedTextStyleOverride,
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  return (
    <Pressable
      ref={ref}
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory
              style={styles.leftAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}

          <Text tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
            {children}
          </Text>

          {!!RightAccessory && (
            <RightAccessory
              style={styles.rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  )
})

const styles = StyleSheet.create((theme) => ({
  baseViewStyle: (pressed) => ({
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    elevation: 5,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    variants: {
      preset: {
        filled: {
          flexDirection: "row",
          backgroundColor: pressed
            ? theme.colors.palette.neutral400
            : theme.colors.palette.neutral300,
        },
        reversed: {
          flexDirection: "row",
          backgroundColor: pressed
            ? theme.colors.palette.neutral700
            : theme.colors.palette.neutral800,
        },
        default: {
          flexDirection: "row",
          borderWidth: 1,
          borderColor: theme.colors.palette.neutral400,
          backgroundColor: pressed
            ? theme.colors.palette.neutral200
            : theme.colors.palette.neutral100,
        },
      },
    },
  }),
  baseTextStyle: (pressed) => ({
    fontSize: 16,
    lineHeight: 20,
    fontFamily: theme.typography.primary.medium,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
    variants: {
      preset: {
        filled: {
          opacity: pressed ? 0.9 : 1,
        },
        reversed: {
          color: theme.colors.palette.neutral100,
          opacity: pressed ? 0.9 : 1,
        },
        default: {
          opacity: pressed ? 0.9 : 1,
        },
      },
    },
  }),
  rightAccessoryStyle: {
    marginStart: theme.spacing.xs,
    zIndex: 1,
  },
  leftAccessoryStyle: {
    marginEnd: theme.spacing.xs,
    zIndex: 1,
  },
}))
