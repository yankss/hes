import React, { Component } from 'react';
import { HashRouter as Router, Link,Switch, Route,  } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import menuList from '../../config/menu'
import './app.css'
import Home from '../../pages/Home';
import AdvertisingManagement from '../../pages/AdvertisingManagement';
import CertificationCenter from '../../pages/CertificationCenter';
import DataAnalysis from '../../pages/DataAnalysis'
import BuildingManagement from '../../pages/HousingResourceManagement/BuildingManagement';
import HouseManagement from '../../pages/HousingResourceManagement/HouseManagement';
import PriceDetails from '../../pages/PriceDetails';
import RentDetails from '../../pages/RentDetails';
import SystemManagement from '../../pages/SystemManagement'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="main-container">
        <Router>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
              {
                menuList.map((item, index1) => {
                  if(item.children) {
                    return (
                      <SubMenu key="sub1" icon={<UserOutlined />} title={item.label}>
                        {
                          item.children.map((cItem, index2) => {
                            return (
                                <MenuItem icon={<UserOutlined />} key={cItem.value}>
                                  <Link to={`${cItem.path}`}>
                                    {cItem.label}
                                  </Link>
                                </MenuItem>
                            )
                          })
                        }
                      </SubMenu>
                    )
                  }else {
                    return (
                      <MenuItem icon={<UserOutlined />} key={item.value}>
                        <Link to={`${item.path}`}>
                          {item.label}
                        </Link>
                      </MenuItem>
                    )
                  }
                })
              }
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: '24px 0px',
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/advertising-management" component={AdvertisingManagement}></Route>
                <Route exact path="/certification-center" component={CertificationCenter}></Route>
                <Route exact path="/data-analysis" component={DataAnalysis}></Route>
                <Route exact path="/building-management" component={BuildingManagement}></Route>
                <Route exact path="/house-management" component={HouseManagement}></Route>
                <Route exact path="/price-details" component={PriceDetails}></Route>
                <Route exact path="/rent-details" component={RentDetails}></Route>
                <Route exact path="/system-management" component={SystemManagement}></Route>
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
