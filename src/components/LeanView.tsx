import type { ViewProps } from "react-native"
import { type ComponentType, createElement, forwardRef } from "react"

import { withUnistyles } from "react-native-unistyles"

// credits to @hirbod
const NativeView = forwardRef(function NativeView(props, ref) {
  return createElement("RCTView", { ...props, ref })
}) as ComponentType<ViewProps>

NativeView.displayName = "RCTView"

export const LeanView = withUnistyles(NativeView)
