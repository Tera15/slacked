import React, {useEffect, useState} from 'react'
import API, { graphqlOperation } from '@aws-amplify/api';
import { useParams } from 'react-router-dom'

import { deleteChannel } from '../../graphql/mutations'
import { listChannels } from '../../graphql/queries'

import { Button } from 'antd'

import { Messages } from '../messages/Messages'
import { InputField } from '../input/Input'



export const Channel = ({ match }) => {
    

    const { params } = match
    let id = params.channelID


    return(
        <div style={{height: '70vh'}}>
        <Messages id={id}/>
        <InputField id={id}/>
        </div>
    )

}