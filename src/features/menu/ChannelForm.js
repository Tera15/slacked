import React, {useState, useEffect} from 'react'
import API, { graphqlOperation } from '@aws-amplify/api';


import { Form, Input, Button, Radio } from 'antd';

import { createChannel } from '../../graphql/mutations'
 
export const ChannelForm = ({ hideModal }) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [inputValue, setInputValue] = useState('')

    

    
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;


        const handleSubmit = async () => {
            if (inputValue){
                try{
                    const input ={
                        name: inputValue
                    }
                   await API.graphql(graphqlOperation(createChannel,{input}))
                    setInputValue('')
                    hideModal()
                }catch(error){
                    console.log({error})
                } 
            } else {
                alert('enter a name for the channel')
            }
        
        }
   
       
    return(
        <>
        <Form 
          {...formItemLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          style={{display: 'flex', flexDirection: 'column'}}
        >
          <Form.Item label="Name">
            <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Pick a cool name" />
          </Form.Item>
           
           <Button onClick={handleSubmit} type="submit ">Add</Button>
           
        </Form>
      </>
    )
}