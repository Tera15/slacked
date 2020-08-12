import React, { useEffect, useState, useRef} from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import '@aws-amplify/pubsub';

import { List, Avatar } from 'antd';

import { onCreateMessage } from '../../graphql/subscriptions'
import { messagesByChannelId } from '../../graphql/queries'

export const Messages = ({channelID}) => {
  const messagesEnd = useRef()
  const [messages, setMessages] = useState([])

  const scrollToBottom = () => messagesEnd.current.scrollIntoView({behavior: "smooth"})
  
  useEffect(() =>{
    getMessages()
  },[])

  useEffect(() =>{
    const subscription = API
    .graphql(graphqlOperation(onCreateMessage))
    .subscribe({
      next: (event) => {
        setMessages([...messages, event.value.data.onCreateMessage])
      }
    })
    scrollToBottom()
    return () => subscription.unsubscribe()
  },[messages])

  const getMessages = async () => {
    console.log(channelID)
   const resp = await API.graphql(graphqlOperation(messagesByChannelId, {
     channelID: '1',
     sortDirection: 'ASC'
   }))
   const items = resp?.data?.messagesByChannelID?.items;
   if (items){
     setMessages(items)
     console.log(items)
   }
  }


    return(
      <div style={{height: '100%', overflowY: 'scroll'}}>
        <List
    itemLayout="vertical"
    dataSource={messages}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.author}
          description={item.body}
        />
      </List.Item>
    )}
  />
  <div ref={messagesEnd}/>
 </div>
    );
}


