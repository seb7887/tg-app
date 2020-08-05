import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Layout, Icon, Divider, Avatar } from '@ui-kitten/components'

interface Props {
  navigation: any
}

const DrawerContent: React.FC<Props> = props => {
  const navigation = useNavigation()

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('jwt')
      navigation.navigate('SignIn')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout style={style.layout}>
      <DrawerContentScrollView>
        <Layout style={style.userInfo}>
          <Avatar source={require('@assets/profile.png')} size="large" />
        </Layout>
        <Divider />
        <Layout>
          <DrawerItem
            label="Home"
            labelStyle={style.label}
            icon={() => (
              <Icon name="home-outline" style={style.icon} fill="#F2F6FF" />
            )}
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            label="New Chat"
            labelStyle={style.label}
            icon={() => (
              <Icon
                name="message-square-outline"
                style={style.icon}
                fill="#F2F6FF"
              />
            )}
            onPress={() => props.navigation.navigate('NewChat')}
          />
          <DrawerItem
            label="Sign Out"
            labelStyle={style.label}
            icon={() => (
              <Icon name="log-out-outline" style={style.icon} fill="#F2F6FF" />
            )}
            onPress={signOut}
          />
        </Layout>
      </DrawerContentScrollView>
    </Layout>
  )
}

const style = StyleSheet.create({
  layout: {
    flex: 1,
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    color: '#F2F6FF',
  },
  icon: {
    width: 20,
    height: 20,
  },
})

export default DrawerContent
