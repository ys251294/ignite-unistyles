import type { ThemedStyle, ThemedStyleArray } from "@/theme"
import { ComponentType, Fragment, ReactElement } from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/utils/useAppTheme"

import { $styles } from "../theme"
import { Text, TextProps } from "./Text"

import { StyleSheet } from "react-native-unistyles"

type Presets = "reversed"

interface CardProps extends TouchableOpacityProps {
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * How the content should be aligned vertically. This is especially (but not exclusively) useful
   * when the card is a fixed height but the content is dynamic.
   *
   * `top` (default) - aligns all content to the top.
   * `center` - aligns all content to the center.
   * `space-between` - spreads out the content evenly.
   * `force-footer-bottom` - aligns all content to the top, but forces the footer to the bottom.
   */
  verticalAlignment?: "top" | "center" | "space-between" | "force-footer-bottom"
  /**
   * Custom component added to the left of the card body.
   */
  LeftComponent?: ReactElement
  /**
   * Custom component added to the right of the card body.
   */
  RightComponent?: ReactElement
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: TextProps["tx"]
  /**
   * Optional heading options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  headingTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * Custom heading component.
   * Overrides all other `heading*` props.
   */
  HeadingComponent?: ReactElement
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Content text which is looked up via i18n.
   */
  contentTx?: TextProps["tx"]
  /**
   * Optional content options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  contentTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * Custom content component.
   * Overrides all other `content*` props.
   */
  ContentComponent?: ReactElement
  /**
   * The footer text to display if not using `footerTx`.
   */
  footer?: TextProps["text"]
  /**
   * Footer text which is looked up via i18n.
   */
  footerTx?: TextProps["tx"]
  /**
   * Optional footer options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  footerTxOptions?: TextProps["txOptions"]
  /**
   * Style overrides for footer text.
   */
  footerStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the footer Text component.
   */
  FooterTextProps?: TextProps
  /**
   * Custom footer component.
   * Overrides all other `footer*` props.
   */
  FooterComponent?: ReactElement
}

/**
 * Cards are useful for displaying related information in a contained way.
 * If a ListItem displays content horizontally, a Card can be used to display content vertically.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Card/}
 * @param {CardProps} props - The props for the `Card` component.
 * @returns {JSX.Element} The rendered `Card` component.
 */
export function Card(props: CardProps) {
  const {
    content,
    contentTx,
    contentTxOptions,
    footer,
    footerTx,
    footerTxOptions,
    heading,
    headingTx,
    headingTxOptions,
    ContentComponent,
    HeadingComponent,
    FooterComponent,
    LeftComponent,
    RightComponent,
    verticalAlignment = "top",
    style: $containerStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    footerStyle: $footerStyleOverride,
    ContentTextProps,
    HeadingTextProps,
    FooterTextProps,
    ...WrapperProps
  } = props

  styles.useVariants({
    preset: props.preset,
    verticalAlignment: verticalAlignment,
  })

  const isPressable = !!WrapperProps.onPress
  const isHeadingPresent = !!(HeadingComponent || heading || headingTx)
  const isContentPresent = !!(ContentComponent || content || contentTx)
  const isFooterPresent = !!(FooterComponent || footer || footerTx)

  const Wrapper = (isPressable ? TouchableOpacity : View) as ComponentType<
    TouchableOpacityProps | ViewProps
  >
  const HeaderContentWrapper = verticalAlignment === "force-footer-bottom" ? View : Fragment

  const $containerStyle: StyleProp<ViewStyle> = [styles.containerBase, $containerStyleOverride]

  const $headingStyle = [
    styles.heading,
    (isFooterPresent || isContentPresent) && styles.bottomSpaceXXXS,
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyle = [
    styles.content,
    isHeadingPresent && styles.topSpaceXXXS,
    isFooterPresent && styles.bottomSpaceXXXS,
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $footerStyle = [
    styles.footer,
    (isHeadingPresent || isContentPresent) && styles.topSpaceXXXS,
    $footerStyleOverride,
    FooterTextProps?.style,
  ]
  const $alignmentWrapperStyle = [
    styles.alignmentWrapper,
    LeftComponent && styles.startSpaceMD,
    RightComponent && styles.endSpaceMD,
  ]

  return (
    <Wrapper
      style={$containerStyle}
      activeOpacity={0.8}
      accessibilityRole={isPressable ? "button" : undefined}
      {...WrapperProps}
    >
      {LeftComponent}

      <View style={$alignmentWrapperStyle}>
        <HeaderContentWrapper>
          {HeadingComponent ||
            (isHeadingPresent && (
              <Text
                weight="bold"
                text={heading}
                tx={headingTx}
                txOptions={headingTxOptions}
                {...HeadingTextProps}
                style={$headingStyle}
              />
            ))}

          {ContentComponent ||
            (isContentPresent && (
              <Text
                weight="normal"
                text={content}
                tx={contentTx}
                txOptions={contentTxOptions}
                {...ContentTextProps}
                style={$contentStyle}
              />
            ))}
        </HeaderContentWrapper>

        {FooterComponent ||
          (isFooterPresent && (
            <Text
              weight="normal"
              size="xs"
              text={footer}
              tx={footerTx}
              txOptions={footerTxOptions}
              {...FooterTextProps}
              style={$footerStyle}
            />
          ))}
      </View>

      {RightComponent}
    </Wrapper>
  )
}

const styles = StyleSheet.create((theme) => ({
  containerBase: {
    flexDirection: "row",
    borderRadius: theme.spacing.md,
    padding: theme.spacing.xs,
    borderWidth: 1,
    shadowColor: theme.colors.palette.neutral800,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 12.81,
    elevation: 16,
    minHeight: 96,
    variants: {
      preset: {
        reversed: {
          flexDirection: "row",
          backgroundColor: theme.colors.palette.neutral800,
          borderColor: theme.colors.palette.neutral500,
        },
        default: {
          flexDirection: "row",
          backgroundColor: theme.colors.palette.neutral100,
          borderColor: theme.colors.palette.neutral300,
        },
      },
    },
  },

  alignmentWrapper: {
    flex: 1,
    alignSelf: "stretch",
    variants: {
      verticalAlignment: {
        "top": {
          justifyContent: "flex-start",
        },
        "center": {
          justifyContent: "center",
        },
        "space-between": {
          justifyContent: "space-between",
        },
        "force-footer-bottom": {
          justifyContent: "space-between",
        },
        "default": {
          justifyContent: "flex-start",
        },
      },
    },
  },
  heading: {
    variants: {
      preset: {
        reversed: { color: theme.colors.palette.neutral100 },
        default: {},
      },
    },
  },

  content: {
    variants: {
      preset: {
        reversed: { color: theme.colors.palette.neutral100 },
        default: {},
      },
    },
  },
  footer: {
    variants: {
      preset: {
        reversed: { color: theme.colors.palette.neutral100 },
        default: {},
      },
    },
  },
  bottomSpaceXXXS: {
    marginBottom: theme.spacing.xxxs,
  },
  topSpaceXXXS: {
    marginTop: theme.spacing.xxxs,
  },
  startSpaceMD: {
    marginStart: theme.spacing.md,
  },
  endSpaceMD: {
    marginEnd: theme.spacing.md,
  },
}))
