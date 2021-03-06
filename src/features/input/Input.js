import React, { useState } from 'react'
import { Auth } from 'aws-amplify'
import { createMessage } from '../../graphql/mutations'
import { Input, Button } from 'antd';

import API, { graphqlOperation } from '@aws-amplify/api';


export const InputField = ( { id } ) => {
        
    const [inputValue, setInputValue] = useState('')
    

  
    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    const sendMessage = async () => {
        let author = Auth.user.username +''
        console.log(Auth)
            if (Auth && inputValue){
                const input = {
                    author: author,
                    body: inputValue,
                    channelID: id
                }

    
                try{
                    await API.graphql(graphqlOperation(createMessage, {input}))
                } catch (error) {
                    console.log({error})
                } finally {
                    setInputValue('')
                }
            }
    }

    


return (  
    <div>
    <Input value={inputValue} onChange={handleChange}/>
    <Button style={{width:'100%'}} onClick={sendMessage}>Send</Button>
    </div>
    )
}