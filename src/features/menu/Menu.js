import React, { useState, useEffect } from 'react'
import API, { graphqlOperation, Auth } from '@aws-amplify/api';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from 'react-router-dom'

import { Button, Menu, Modal } from 'antd'
import { UserOutlined, MinusOutlined  } from '@ant-design/icons';

import { ChannelForm } from './ChannelForm'

import { getChannel, listChannels } from '../../graphql/queries'
import { onCreateChannel, onDeleteChannel } from '../../graphql/subscriptions'
import { Channel } from '../channel/Channel';



export const SideMenu = () => {
    const [modal, setModal] = useState(false)
    const [channels, setChannels] = useState([])
    
    useEffect( () => {
    fetchChannel()
  },[channels])



  useEffect( () => {
    const subscription =  API
    .graphql(graphqlOperation(onCreateChannel))
    .subscribe({
        next: (event) => {
            setChannels([...channels, event.value.data.onCreateChannel])
        }
    })
    return () => subscription.unsubscribe() 
  },[channels])

  useEffect( () => {
    const subscription =  API
    .graphql(graphqlOperation(onDeleteChannel))
    .subscribe({
        next: (event) => {
            setChannels(channels.filter(channel => channel.id !== event.value.data.onDeleteChannel))
        }
    })
    return () => subscription.unsubscribe() 
  },[channels])

 
    const fetchChannel = async () =>{
      try{
       
        const response = await API.graphql(graphqlOperation(listChannels))
        const channelList = response.data.listChannels.items
        setChannels(channelList)
        console.log(channelList[0])
       }catch(error){
         console.log({error})
       }
    } 



    const hideModal = () => setModal(false)


    return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{display:'flex', flexDirection: 'column', padding:'0.5rem', marginTop: '0.5rem'}}>
    {
      channels.map(channel => {
        const { id, name } = channel
         return  <Menu.Item key={id} icon={<MinusOutlined />}>
                  <Link to={`/channel/${id}`} >{name}</Link>
                  </Menu.Item>
                  
        
      })
    }

<div style={{height: '10rem',display: 'flex', flexDirection: 'column', justifyContent:'space-evenly'}}>
   <Button onClick={() => setModal(true)}>Add Channel</Button>
   <Modal
    visible={modal}
    title="Add Channel"
    onCancel={hideModal}
    footer={[
        <Button key="back" onClick={() => hideModal()}>
          Cancel
        </Button>
      ]}
   >
       <ChannelForm hideModal={() => hideModal()}/>
   </Modal>
    <AmplifySignOut/>
   </div>
</Menu>
)}


