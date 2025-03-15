import { ViewStyle } from "react-native"

import { observer } from "mobx-react-lite"

import { Screen, Text } from "../../components"

export const LoginPage = observer(function LoginPage() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="login" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
