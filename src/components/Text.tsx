import { ReactNode } from "react"
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from "react-native"

import { TOptions } from "i18next"

import { isRTL, translate, TxKeyPath } from "@/i18n"
import { typography } from "@/theme/typography"

import { StyleSheet, UnistylesVariants } from "react-native-unistyles"

type Sizes = UnistylesVariants<typeof styles>["size"]
type Weights = UnistylesVariants<typeof styles>["weight"]
type Presets = UnistylesVariants<typeof styles>["preset"]

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  styles.useVariants({
    preset: props.preset,
    weight: weight,
    size: size,
  })

  return (
    <RNText {...rest} style={[$rtlStyle, styles.base, $styleOverride]}>
      {content}
    </RNText>
  )
}

const styles = StyleSheet.create((theme, rt) => {
  return {
    base: {
      fontFamily: theme.typography.primary.normal,
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
      variants: {
        preset: {
          bold: {
            fontFamily: theme.typography.primary.bold,
          },
          heading: {
            fontFamily: theme.typography.primary.bold,
            fontSize: 36,
            lineHeight: 44,
          },
          subheading: {
            fontFamily: typography.primary.medium,
            fontSize: 20,
            lineHeight: 32,
          },
          formLabel: {
            fontFamily: typography.primary.medium,
          },
          formHelper: {
            fontSize: 16,
            lineHeight: 24,
          },
          default: {},
        },
        weight: {
          light: {
            fontFamily: theme.typography.primary.light,
          },
          normal: {
            fontFamily: theme.typography.primary.normal,
          },
          medium: {
            fontFamily: theme.typography.primary.medium,
          },
          semiBold: {
            fontFamily: theme.typography.primary.semiBold,
          },
          bold: {
            fontFamily: theme.typography.primary.bold,
          },
        },
        size: {
          xxl: {
            fontSize: 36,
            lineHeight: 44,
          },
          xl: {
            fontSize: 24,
            lineHeight: 34,
          },
          lg: {
            fontSize: 20,
            lineHeight: 32,
          },
          md: {
            fontSize: 18,
            lineHeight: 26,
          },
          sm: {
            fontSize: 16,
            lineHeight: 24,
          },
          xs: {
            fontSize: 14,
            lineHeight: 21,
          },
          xxs: {
            fontSize: 12,
            lineHeight: 18,
          },
        },
      },
    },
  }
})

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
