import { Link } from "expo-router"
import { observer } from "mobx-react-lite"

import { Button, Screen, Text } from "../../components"

import { StyleSheet } from "react-native-unistyles"

export const LoginPage = observer(function LoginPage() {
  return (
    <Screen style={styles.wrapper} contentContainerStyle={styles.contentContainer} preset="scroll">
      <Text text="login" />
      <Link asChild href={".."}>
        <Button text="Go Back" />
      </Link>
    </Screen>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  wrapper: {
    flex: 1,
  },
})
