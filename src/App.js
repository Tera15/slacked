import React, { useEffect, useState }  from 'react';
import './App.css';
import API, { graphqlOperation } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Link, Switch as SW } from "react-router-dom";

//STYLES
import { Layout, Menu, Button } from 'antd';
import { UserOutlined,  } from '@ant-design/icons';

//COMPONENTS
import { Channel }  from './features/channel/Channel'


import { getChannel, listChannels } from './graphql/queries'

function App() {
  const { Header, Content, Footer, Sider } = Layout;
  const [channels, setChannels] = useState([])
  useEffect( () => {
  fetchChannel()
},[])

  const fetchChannel = async () =>{
    try{
     
      const response = await API.graphql(graphqlOperation(listChannels))
      const channelList = response.data.listChannels.items
      setChannels(channelList)
     }catch(error){
       console.log({error})
     }
  } 


  return (
  <>  
    <Router exact path="/">
     <Layout>
     
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
     
      <div className="logo" style={{fontWeight: '700', color: 'white', textAlign: 'center', fontSize: '2rem'}}>SLACKED!</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{display:'flex', flexDirection: 'column', padding:'0.5rem', marginTop: '0.5rem'}}>
          {
            channels.map(channel => {
              const { id, name } = channel
               return  <Menu.Item key={id} icon={<UserOutlined />}>
                        <Link to={`/channel/${id}`} >{name}</Link>
                        </Menu.Item>
              
            })
          }

          <Button className="button" style={{marginTop: '1rem'}}>Add Channel</Button>
      </Menu>
    </Sider>
    <Layout style={{height:'100vh'}}>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0'}}>
        <SW>
          <Route exact path="/channel/:channelID" component={Channel}/>
        </SW>
      </Content>
     <Footer style={{ textAlign: 'center' }}> <b>Slacked!</b> ...the leading slack clone side project!</Footer>
    </Layout>
    
  </Layout>
  </Router>
</>
  );
}

export default withAuthenticator(App);
