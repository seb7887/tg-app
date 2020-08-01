import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { StatusBar, StyleSheet } from 'react-native'
import { Layout, Text, Divider } from '@ui-kitten/components'

import { SIGN_IN } from '@graphql/signin'
import Form from '@components/Form'

const SignIn: React.FC = () => {
  const [signIn, { data }] = useMutation(SIGN_IN)
  const navigation = useNavigation()

  const login = async ({ email, password }: Record<string, string>) => {
    await signIn({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }

  useEffect(() => {
    ;(async () => {
      if (data && data.signin.jwt) {
        try {
          console.log('d', data.signin)
          await AsyncStorage.setItem('jwt', data.signin.jwt)
          navigation.navigate('Home')
        } catch (err) {
          console.log(err)
        }
      }
    })()
  }, [data])

  return (
    <Layout style={styles.layout}>
      <StatusBar barStyle="light-content" />

      <Layout>
        <Text category="h1">TG CLONE APP</Text>
        <Divider />
        <Form onSubmit={login} />
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SignIn
