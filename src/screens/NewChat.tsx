import React from 'react'
import { StatusBar } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const NewChat: React.FC = () => {
  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <Text category="h4">New Chat</Text>
    </Layout>
  )
}

export default NewChat
