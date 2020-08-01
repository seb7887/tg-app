import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { client } from '@lib/client'
import SignInScreen from '@screens/SignIn'
import HomeScreen from '@screens/Home'

const AppNav = createStackNavigator()

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
            initialRouteName="Home"
          >
            <AppNav.Screen name="SignIn" component={SignInScreen} />
            <AppNav.Screen name="Home" component={HomeScreen} />
          </AppNav.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ApolloProvider>
  )
}
