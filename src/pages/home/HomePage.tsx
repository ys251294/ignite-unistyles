import { ViewStyle } from "react-native"

import { observer } from "mobx-react-lite"

import { Screen, Text } from "../../components"

export const HomePage = observer(function HomePage() {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="home" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
