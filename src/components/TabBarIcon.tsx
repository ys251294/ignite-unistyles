import { StyleSheet } from "react-native"

import { Icon } from "./Icon"

export const TabBarIcon = (props: {
  icon: React.ComponentProps<typeof Icon>["icon"]
  color: string
}) => {
  return <Icon size={28} style={styles.tabBarIcon} {...props} />
}

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
})
