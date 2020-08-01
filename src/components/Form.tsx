// @ts-nocheck
import React, { useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Formik } from 'formik'
import { Layout, Input, Icon, Divider, Button } from '@ui-kitten/components'

interface Props {
  signUp?: boolean
  onSubmit: (d: Record<string, string>) => Promise<any>
}

const Form: React.FC<Props> = ({ signUp, onSubmit }) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry)

  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        name={secureTextEntry ? 'eye-off' : 'eye'}
        style={styles.icon}
        fill="#F2F6FF"
      />
    </TouchableWithoutFeedback>
  )

  return (
    <Formik
      initialValues={{ email: '', password: '', name: undefined }}
      onSubmit={async (values, actions) => {
        const { email, name, password } = values
        actions.setSubmitting(true)
        try {
          await onSubmit({
            email,
            password,
            name,
          })
        } catch (err) {
          console.log(err)
        }

        actions.setSubmitting(false)
      }}
    >
      {({ handleChange, isSubmitting, handleSubmit }) => (
        <Layout style={styles.form}>
          <Input
            placeholder="Your email address"
            onChangeText={handleChange('email')}
            style={styles.input}
          />
          {signUp && (
            <Input
              placeholder="Your name"
              onChangeText={handleChange('name')}
              style={styles.input}
            />
          )}
          <Input
            placeholder="Your password"
            onChangeText={handleChange('password')}
            secureTextEntry={secureTextEntry}
            accessoryRight={renderIcon}
            style={styles.input}
          />
          <Divider style={styles.divider} />
          <Button onPress={handleSubmit}>
            SIGN{isSubmitting ? 'ING' : ''} {signUp ? 'UP' : 'IN'}
            {isSubmitting ? '...' : ''}
          </Button>
        </Layout>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  form: {
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    marginTop: 12,
  },
  divider: {
    marginTop: 12,
    marginBottom: 12,
  },
})

export default Form
