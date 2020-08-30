import React, { useEffect, useState, useRef} from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import '@aws-amplify/pubsub';

import { List } from 'antd';

import { onCreateMessage } from '../../graphql/subscriptions'
import { messagesByChannelId } from '../../graphql/queries'

export const Messages = ({ id }) => {

  const messagesEnd = useRef()
  const [messages, setMessages] = useState([])

  const scrollToBottom = () => messagesEnd.current.scrollIntoView({behavior: "smooth"})
  
  useEffect(() =>{
    getMessages()
  },[id])

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
    
   const resp = await API.graphql(graphqlOperation(messagesByChannelId, {
     channelID: id,
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
      <List.Item style={{marginLeft: '2rem'}}>
        <List.Item.Meta
          // avatar={<Avatar src={item.avatar} />}
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


