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
  Drawer,
  DrawerItem,
} from '@ui-kitten/components'

import { CHATS } from '@graphql/chats'

const MenuIcon = () => (
  <Icon name="menu-outline" style={style.icon} fill="#F2F6FF" />
)

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(null)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
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

  const signOut = async () => {
    await AsyncStorage.removeItem('jwt')
    navigation.navigate('SignIn')
  }

  const toggleOpenDrawer = () => setShowDrawer(!showDrawer)

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleOpenDrawer} />
  )

  const renderTitle = () => <Text category="h4">TG CHAT</Text>

  console.log('data', data)

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

      {showDrawer && (
        <Layout style={style.drawer}>
          <Drawer>
            <DrawerItem title="New Chat" />
            <DrawerItem title="Sign Out" onPress={signOut} />
          </Drawer>
        </Layout>
      )}

      {loading && <Text category="h4">Loading</Text>}
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
