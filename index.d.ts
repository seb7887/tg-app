interface Message {
  id?: string
  content?: string
}

interface Chat {
  id?: string
  name?: string
  lastMessage?: Message
}
