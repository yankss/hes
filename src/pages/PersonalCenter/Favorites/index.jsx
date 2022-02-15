import React, { Component } from 'react'
import { Tabs } from 'antd';
import { TeamOutlined, MessageOutlined } from '@ant-design/icons';
import ListShow from '../../../widgets/list-show';
import './index.css';

const { TabPane } = Tabs;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      tabKey: '',
    }
    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(key, e) {
    console.log(key);
    console.log(e);
    this.setState({ tabKey: key })
  }
  
  render() {
    const { tabKey } = this.state;
    return (
      <div style={{height: '100%'}}>
        <div className="card-container">
          <Tabs type="card" onTabClick={(key, e) => this.switchTab(key, e)}>
            <TabPane tab={
              <span>
                <MessageOutlined />
                评论收藏夹
              </span>
            } key="1">
              <ListShow tabKey={tabKey}/>
            </TabPane>
            <TabPane tab={
              <span>
                <TeamOutlined />
                用户收藏夹
              </span>
            } key="2">
              <ListShow tabKey={tabKey}/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
