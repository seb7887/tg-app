import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { Layout, Text } from '@ui-kitten/components'

const Home: React.FC = () => {
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const jwt = await AsyncStorage.getItem('jwt')
      console.log('jwt', jwt)
      if (!jwt) {
        navigation.navigate('SignIn')
      }
    })()
  }, [])

  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <Text category="h2">Home Screen</Text>
    </Layout>
  )
}

export default Home
