import { View } from "react-native"

import { Link } from "expo-router"

import { Button, Screen, Text } from "@/components"
import { $styles } from "@/theme"

import { StyleSheet } from "react-native-unistyles"

export default function NotFoundPage() {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.root}>
      <Text>Whoops!</Text>
      <View style={styles.buttonWrapper}>
        <Link asChild href={".."}>
          <Button text="Go Back" style={$styles.flex1} />
        </Link>
        <Link asChild href={"/_sitemap"}>
          <Button text="Site Map" style={$styles.flex1} />
        </Link>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
  root: {
    paddingHorizontal: 16,
  },
})
