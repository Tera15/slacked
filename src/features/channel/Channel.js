import React from 'react'

import { Messages } from '../messages/Messages'
import { InputField } from '../input/Input'
export const Channel = ({ match }) => {
    const { params } = match
    let id = params.channelID

    return(
        <>
        <Messages id={id}/>
        <InputField id={id}/>
        </>
    )

}