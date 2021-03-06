import React, { useEffect, useState }  from 'react';
import './App.css';
import API, { graphqlOperation } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, useParams, Switch as SW } from "react-router-dom";

//STYLES
import { Layout } from 'antd';

//COMPONENTS
import { Channel }  from './features/channel/Channel'
import {  SideMenu } from './features/menu/Menu'
import { Logo } from './components/Logo'

//queries/mutations

 

function App() {
  const { Header, Content, Footer, Sider } = Layout;

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
     
      <Logo/>
      <SideMenu/>
    </Sider>
    <Layout style={{height:'100vh'}}>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, color: 'white', textAlign: 'center' }} >
        Created to check out the AWS Amplify framework!
      </Header>
      <Content style={{ margin: '24px 16px 0'}}>
        <SW>
          <Route exact path="/channel/:channelID" component={Channel}/>
        </SW>
      </Content>
     <Footer style={{marginTop: '3rem', textAlign: 'center',  display: 'flex', flexFlow: 'column wrap', alignItems:'center', justifyContent:"center"}}>
        <b>Slacked!</b> ...the leading slack clone side project!

      </Footer>
    </Layout>
    
  </Layout>
  </Router>
</>
  );
}

export default withAuthenticator(App);
