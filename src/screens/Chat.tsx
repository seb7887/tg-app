import React, { useState, useEffect, useMemo } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {
  Layout,
  Spinner,
  Divider,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from '@ui-kitten/components'

import { ME } from '@graphql/me'
import BackIcon from '@components/BackIcon'
import MsgList from '@components/MsgList'

type RouteParams = {
  Chat: {
    chat: any
  }
}

const Chat: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>()
  const { chat } = route.params
  const { loading, data } = useQuery(ME, {
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

      {loading || !data ? (
        <Spinner />
      ) : (
        <>
          <Layout>
            <TopNavigation title={chat.name} accessoryLeft={renderAction} />
            <Divider />
          </Layout>

          <Layout style={style.content}>
            <MsgList messages={chat.messages} me={data.me.id} />
          </Layout>

          <Layout style={style.message}>
            <Input style={style.input} />
            <Button>Send</Button>
          </Layout>
        </>
      )}
    </Layout>
  )
}

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  content: {
    backgroundColor: 'black',
    flex: 1,
  },
  message: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  input: {
    borderColor: '#598BFF',
    borderRadius: 12,
    flexGrow: 1,
    marginRight: 12,
  },
})

export default Chat
