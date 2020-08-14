import React, {useEffect, useState} from 'react'
import API, { graphqlOperation } from '@aws-amplify/api';

import { deleteChannel } from '../../graphql/mutations'
import { listChannels } from '../../graphql/queries'

import { Button } from 'antd'

import { Messages } from '../messages/Messages'
import { InputField } from '../input/Input'



export const Channel = ({ match }) => {
    // const [channels, setChannels] = useState([])
    // useEffect(() =>{
       
    // },[channels])
    
    // const fetchChannel = async () =>{
    //     try{
         
    //       const response = await API.graphql(graphqlOperation(listChannels))
    //       const channelList = response.data.listChannels.items
    //       setChannels(channelList)
    //       console.log(channelList[0])
    //      }catch(error){
    //        console.log({error})
    //      }
    //   } 

    const { params } = match
    let id = params.channelID

    const handleDeleteChannel = async (id) =>{
        
        let input = {
            id: id+""
        }
        console.log(input)
       try{
       await API.graphql(graphqlOperation(deleteChannel, {input}))
        console.log('worked')
       } catch (error) {
           console.log({error})
       }
    }

    return(
        <>
        <div style={{height: '70vh'}}>
        <Messages id={id}/>
        <InputField id={id}/>
        <Button onClick={() => {

            handleDeleteChannel(id)
            
        }} style={{margin: '2rem'}} type="primary">Delete Channel</Button>
        </div>
        
        </>
    )

}