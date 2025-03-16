import { ErrorInfo } from "react"
import { ScrollView, View } from "react-native"

import { Button, Icon, Screen, Text } from "../../components"

import { StyleSheet } from "react-native-unistyles"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={styles.heading} preset="subheading" tx="errorScreen:title" />
        <Text tx="errorScreen:friendlySubtitle" />
      </View>

      <ScrollView
        style={styles.errorSection}
        contentContainerStyle={styles.errorSectionContentContainer}
      >
        <Text style={styles.errorContent} weight="bold" text={`${props.error}`.trim()} />
        <Text
          selectable
          style={styles.errorBacktrace}
          text={`${props.errorInfo?.componentStack ?? ""}`.trim()}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={styles.resetButton}
        onPress={props.onReset}
        tx="errorScreen:reset"
      />
    </Screen>
  )
}

const styles = StyleSheet.create((theme) => ({
  contentContainer: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },

  errorBacktrace: {
    color: theme.colors.textDim,
    marginTop: theme.spacing.md,
  },

  errorContent: {
    color: theme.colors.error,
  },

  errorSection: {
    backgroundColor: theme.colors.separator,
    borderRadius: 6,
    flex: 2,
    marginVertical: theme.spacing.md,
  },

  errorSectionContentContainer: {
    padding: theme.spacing.md,
  },

  heading: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },

  resetButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xxl,
  },

  topSection: {
    alignItems: "center",
    flex: 1,
  },
}))
