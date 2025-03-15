import { TextInput as RNTextInput } from "react-native"

import { withUnistyles } from "react-native-unistyles"

export const TextInput = withUnistyles(RNTextInput, (theme) => ({
  underlineColorAndroid: theme.colors.transparent,
  placeholderTextColor: theme.colors.textDim,
}))
export type TextInputType = RNTextInput
