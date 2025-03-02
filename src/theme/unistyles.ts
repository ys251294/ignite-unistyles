import { colors as colorsLight } from "./colors"
import { colors as colorsDark } from "./colorsDark"
import { spacing as spacingLight } from "./spacing"
import { spacing as spacingDark } from "./spacingDark"
import { timing } from "./timing"
import { typography } from "./typography"

import { StyleSheet } from "react-native-unistyles"

const lightTheme = {
  colors: colorsLight,
  typography,
  timing,
  spacing: spacingLight,
  isDark: false,
}
const darkTheme = {
  colors: colorsDark,
  typography,
  timing,
  spacing: spacingDark,
  isDark: true,
}

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
}

const breakpoints = {
  xs: 0, // <-- make sure to register one breakpoint with value 0
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
  // use as many breakpoints as you need
}

const settings = {
  adaptiveThemes: true,
}

StyleSheet.configure({
  themes: appThemes,
  breakpoints,
  settings,
})

type AppThemes = typeof appThemes
type AppBreakpoints = typeof breakpoints

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
