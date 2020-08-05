import React from 'react'
import { StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'

const BackIcon = () => (
  <Icon name="arrow-back" fill="#F2F6FF" style={style.icon} />
)

const style = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
})

export default BackIcon
