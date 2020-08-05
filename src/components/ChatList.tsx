import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { List, ListItem, Avatar } from '@ui-kitten/components'

interface Props {
  chats: any
}

const ChatImage = () => <Avatar source={require('@assets/profile.png')} />

const ChatList: React.FC<Props> = ({ chats }) => {
  const navigation = useNavigation()

  const renderItem = ({ item }: any) => (
    <ListItem
      title={item.name}
      accessoryLeft={ChatImage}
      description={item.lastMessage.content}
      onPress={() => navigation.navigate('Chat', { chat: item })}
    />
  )

  return <List style={style.list} data={chats} renderItem={renderItem} />
}

const style = StyleSheet.create({
  list: {
    padding: 12,
  },
})

export default ChatList
