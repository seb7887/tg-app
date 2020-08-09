import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {
  Layout,
  Text,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from '@ui-kitten/components'

import { CHATS } from '@graphql/chats'
import ChatList from '@components/ChatList'

const MenuIcon = () => (
  <Icon name="menu-outline" style={style.icon} fill="#F2F6FF" />
)

interface Props {
  navigation: any
}

const Home: React.FC<Props> = props => {
  const [token, setToken] = useState<string | null>(null)
  const navigation = useNavigation()
  const { loading, data } = useQuery(CHATS, {
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

  const toggleOpenDrawer = () => props.navigation.toggleDrawer()

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleOpenDrawer} />
  )

  const renderTitle = () => <Text category="h4">TG CHAT</Text>

  return (
    <Layout style={style.layout}>
      <StatusBar barStyle="light-content" />

      <Layout level="1">
        <TopNavigation
          alignment="center"
          title={renderTitle}
          accessoryLeft={renderMenuAction}
        />
        <Divider />
      </Layout>

      {loading || !data ? <Spinner /> : <ChatList chats={data.chats} />}
    </Layout>
  )
}

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
  nav: {
    fontSize: 24,
  },
  drawer: {
    width: '80%',
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: 'black',
  },
})

export default Home
