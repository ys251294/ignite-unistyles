import type { TextProps } from "react-native"
import { type ComponentType, createElement, forwardRef } from "react"

import { withUnistyles } from "react-native-unistyles"

// credits to @hirbod
const NativeText = forwardRef(function NativeText(props, ref) {
  return createElement("RCTText", { ...props, ref })
}) as ComponentType<TextProps>

NativeText.displayName = "RCTText"

export const LeanText = withUnistyles(NativeText)
