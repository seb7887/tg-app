import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { client } from '@lib/client'
import DrawerContent from '@navigation/DrawerContent'
import SignInScreen from '@screens/SignIn'
import HomeScreen from '@screens/Home'
import NewChatScreen from '@screens/NewChat'
import ChatScreen from '@screens/Chat'

const AppNav = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeNav = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerStyle={{
      backgroundColor: '#222B45',
    }}
    drawerContentOptions={{
      activeTintColor: '#F2F6FF',
      inactiveTintColor: '#F2F6F8',
      labelStyle: {
        color: 'white',
      },
    }}
    drawerContent={props => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="NewChat" component={NewChatScreen} />
  </Drawer.Navigator>
)

export default function App() {
  return (
    <ApolloProvider client={client}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <AppNav.Navigator
            mode="modal"
            headerMode="none"
            screenOptions={{ gestureDirection: 'horizontal' }}
            initialRouteName="HomeNav"
          >
            <AppNav.Screen name="SignIn" component={SignInScreen} />
            <AppNav.Screen name="HomeNav" component={HomeNav} />
            <AppNav.Screen name="Chat" component={ChatScreen} />
          </AppNav.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  )
}
