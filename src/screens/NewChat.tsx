import React, { useState, useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { useQuery } from '@apollo/client'
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Spinner,
  Text,
} from '@ui-kitten/components'

import { USERS } from '@graphql/chats'
import BackIcon from '@components/BackIcon'

const NewChat: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const navigation = useNavigation()
  const { loading, data } = useQuery(USERS, {
    skip: !token,
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  useEffect(() => {
    ;(async () => {
      const jwt = await AsyncStorage.getItem('jwt')
      if (!jwt) {
        navigation.navigate('SignIn')
      } else {
        setToken(jwt)
      }
    })()
  }, [])

  const renderAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  )

  return (
    <Layout style={style.layout}>
      <StatusBar barStyle="light-content" />
      <>
        <Layout>
          <TopNavigation title="New Chat" accessoryLeft={renderAction} />
          <Divider />
        </Layout>
        {loading || !data ? (
          <Spinner />
        ) : (
          <Layout>
            {data.chats.map((user: any) =>
              user.participants.map((u: any) => (
                <Text key={u.id}>{u.name}</Text>
              ))
            )}
          </Layout>
        )}
      </>
    </Layout>
  )
}

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
})

export default NewChat
