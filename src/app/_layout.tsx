import { useEffect, useState } from "react"
import { ViewStyle } from "react-native"

import { useFonts } from "@expo-google-fonts/space-grotesk"
import { Slot, SplashScreen } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"

import { initI18n } from "@/i18n"
import { useInitialRootStore } from "@/models"
import { customFontsToLoad } from "@/theme"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"

SplashScreen.preventAutoHideAsync()

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("src/devtools/ReactotronConfig.ts")
}

export { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"

export default function Root() {
  // Wait for stores to load and render our layout inside of it so we have access
  // to auth info etc
  const { rehydrated } = useInitialRootStore()

  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)
  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized && rehydrated

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={flex1}>
      <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

const flex1: ViewStyle = {
  flex: 1,
}
