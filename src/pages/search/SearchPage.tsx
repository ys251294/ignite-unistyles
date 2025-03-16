import { Link, Tabs } from "expo-router"
import { observer } from "mobx-react-lite"

import { Button, Screen, Text } from "../../components"

import { StyleSheet } from "react-native-unistyles"

export const SearchPage = observer(function SearchPage() {
  return (
    <Screen style={styles.wrapper} contentContainerStyle={styles.contentContainer} preset="scroll">
      <Tabs.Screen options={{ title: "SearchPage" }} />
      <Text text="search" />
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
