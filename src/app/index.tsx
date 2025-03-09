import { View } from "react-native"

import { observer } from "mobx-react-lite"

import { Image, Screen, Text } from "@/components"
import { isRTL } from "@/i18n"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { StyleSheet } from "react-native-unistyles"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

export default observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={styles.welcomeHeading}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={styles.welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          uniProps={(theme) => ({
            tintColor: theme.colors.palette.neutral900,
          })}
        />
      </View>

      <View style={[styles.bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen:postscript" size="md" />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "57%",
    justifyContent: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  bottomContainer: {
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: "43%",
    backgroundColor: theme.colors.palette.neutral100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "space-around",
  },
  welcomeLogo: {
    height: 88,
    width: "100%",
    marginBottom: theme.spacing.xxl,
  },
  welcomeFace: {
    height: 169,
    width: 269,
    position: "absolute",
    bottom: -47,
    right: -80,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  },
  welcomeHeading: {
    marginBottom: theme.spacing.md,
  },
}))
