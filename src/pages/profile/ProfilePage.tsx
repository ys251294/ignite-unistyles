import { Link, Stack } from "expo-router"
import { observer } from "mobx-react-lite"

import { Button, Screen, Text } from "../../components"

import { StyleSheet } from "react-native-unistyles"

export const ProfilePage = observer(function ProfilePage() {
  return (
    <Screen style={styles.wrapper} contentContainerStyle={styles.contentContainer} preset="scroll">
      <Stack.Screen options={{ title: "ProfilePage" }} />
      <Text text="profile" />
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
