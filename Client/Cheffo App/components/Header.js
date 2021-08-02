import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const Header = (props) => <Text style={styles.header} {...props} />

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    paddingTop: 75,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})

export default Header