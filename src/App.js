import React, { useEffect }  from 'react';
import './App.css';
import API, { graphqlOperation } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Link, Switch as SW } from "react-router-dom";

//STYLES
import { Layout, Menu, Switch } from 'antd';
import { ArrowRightOutlined, UserOutlined,  } from '@ant-design/icons';

//COMPONENTS
import { Channel }  from './features/channel/Channel'
import { Messages } from './features/messages/Messages'
import { InputField } from './features/input/Input'

import { getChannel, listChannels } from './graphql/queries'

function App() {
  const { Header, Content, Footer, Sider } = Layout;

  useEffect( () => {
  fetchChannel()
},[])

  const fetchChannel = async () =>{
    try{
     
      let response = await API.graphql(graphqlOperation(listChannels))
      console.log(response.data)
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link >Room 1</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<ArrowRightOutlined />}>
          Room 2
        </Menu.Item>
        <Menu.Item key="3" icon={<ArrowRightOutlined />}>
          Room 3
        </Menu.Item>
        <Menu.Item key="4" icon={<ArrowRightOutlined />}>
          Room 4
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{height:'100vh'}}>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <Content style={{ margin: '24px 16px 0'}}>
        <SW>
          <Route exact path="/channel/:channelID " component={Channel}/>
        </SW>
      </Content>
      <InputField/>
     <Footer style={{ textAlign: 'center' }}> <b>Slacked!</b> ...the leading slack clone side project!</Footer>
    </Layout>
    
  </Layout>
  </Router>
</>
  );
}

export default withAuthenticator(App);
