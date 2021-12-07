import React, { Component } from 'react';
import { HashRouter as Router, Link,Switch, Route,  } from 'react-router-dom'
import { Layout, Menu } from 'antd';
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
import ChetMessage  from '../../pages/ChetMessage'
// import ErrorPage from '../../pages/Error'

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: ['0'],
    }
  }

  handleClick = e => {
    console.log(e);
    this.setState({current: e.key})
  }

  render() {
    let { current } = this.state;
    return (
      <Layout className="main-container">
        <Router>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Menu onClick={this.handleClick} className="my-menu" theme="dark"  mode="horizontal" defaultSelectedKeys={current} >
                {
                  menuList.map((item, index1) => {
                    if(item.children) {
                      return (
                        <SubMenu key={item.value} icon={<item.icon/>} title={item.label} popupClassName="children-menu">
                          {
                            item.children.map((cItem, index2) => {
                              return (
                                  <MenuItem icon={<cItem.icon/>}  key={cItem.value}>
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
                        
                        <MenuItem icon={<item.icon/>} key={item.value}  >
                          <Link to={`${item.path}`}>
                          {item.label}
                          </Link>
                        </MenuItem>
                      )
                    }
                  })
                }
              </Menu>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                padding: '24px 2px',
                minHeight: 280,
              }}
            >
              <Switch>
                {/* <Route exact path="*" component={ErrorPage}></Route> */}
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/advertising-management" component={AdvertisingManagement}></Route>
                <Route exact path="/certification-center" component={CertificationCenter}></Route>
                <Route exact path="/data-analysis" component={DataAnalysis}></Route>
                <Route exact path="/building-management" component={BuildingManagement}></Route>
                <Route exact path="/house-management" component={HouseManagement}></Route>
                <Route exact path="/price-details" component={PriceDetails}></Route>
                <Route exact path="/rent-details" component={RentDetails}></Route>
                <Route exact path="/system-management" component={SystemManagement}></Route>
                <Route exact path="/chet-message" component={ChetMessage}></Route>
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
