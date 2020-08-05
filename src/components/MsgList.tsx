import React from 'react'
import { StyleSheet } from 'react-native'
import { List, ListItem } from '@ui-kitten/components'

interface Props {
  me: string
  messages: any
}

const MsgList: React.FC<Props> = ({ me, messages }) => {
  const renderItem = ({ item }: any) => (
    <ListItem
      title={item.content}
      description={item.createdAt}
      style={item.sender.id === me ? style.isMine : style.isNotMine}
    />
  )

  return <List style={style.list} data={messages} renderItem={renderItem} />
}

const style = StyleSheet.create({
  list: {
    padding: 12,
  },
  isMine: {
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    alignSelf: 'flex-end',
  },
  isNotMine: {
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    alignSelf: 'flex-start',
  },
})

export default MsgList
