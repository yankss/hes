import React, { Component } from 'react';
import { HashRouter as Router, Link,Switch, Route,  } from 'react-router-dom'
import { Layout, Menu, Badge } from 'antd';
import menuList from '../../config/menu'
import './app.css'
import Home from '../../pages/Home';
import ContractManagement from '../../pages/ContractManagement';
import CertificationCenter from '../../pages/CertificationCenter';
import BuildingManagement from '../../pages/HousingResourceManagement/BuildingManagement';
import HouseManagement from '../../pages/HousingResourceManagement/HouseManagement';
import PriceDetails from '../../pages/DataAnalysis/PriceDetails';
import RentDetails from '../../pages/DataAnalysis/RentDetails';
import ProspectiveCustomerManagement from '../../pages/SystemManagement/ProspectiveCustomerManagement';
import RenterManagement from '../../pages/SystemManagement/RenterManagement';
import LandlordManagement from '../../pages/SystemManagement/LandlordManagement';
import ChetMessage  from '../../pages/ChetMessage'
import personalCenter from '../../pages/PersonalCenter/PersonalSetting';
import Favorites from '../../pages/PersonalCenter/Favorites';
import receiptManagement from '../../pages/ReceiptManagement';
import Login from '../../pages/Login';

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: ['0'],
      count: 10,
      routerName: ''
    }
  }

  handleClick = e => {
    this.setState({current: e.key})
  }


  render() {
    let { current, count } = this.state;
    return (
      <Layout className="main-container">
        <Router>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Menu 
                onClick={this.handleClick} 
                className="my-menu"
                selectedKeys={[current]}
                theme="dark"  
                mode="horizontal" 
                defaultSelectedKeys={current} 
              >
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
                      if(item.value === '8') {
                        return (
                          <MenuItem icon={<item.icon/>} key={item.value} >
                            <Link to={`${item.path}`}>
                              { count !== 0 
                                ? <Badge count={count} color="cyan" style={{marginTop: '16px', marginRight: '-5px', }}>
                                    {item.label}
                                  </Badge>
                                :
                                item.label
                              }
                              
                            </Link>
                          </MenuItem>
                        )
                      }else {
                        return (
                          <MenuItem icon={<item.icon/>} key={item.value} >
                            <Link to={`${item.path}`}>
                            {item.label}
                            </Link>
                          </MenuItem>
                        )
                      }
                    }
                  })
                }
              </Menu>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                padding: '2px 2px',
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/contract-management" component={ContractManagement}></Route>
                <Route exact path="/certification-center" component={CertificationCenter}></Route>
                <Route exact path="/building-management" component={BuildingManagement}></Route>
                <Route exact path="/house-management" component={HouseManagement}></Route>
                <Route exact path="/price-details" component={PriceDetails}></Route>
                <Route exact path="/rent-details" component={RentDetails}></Route>
                <Route exact path="/prospectiveCustomer-management" component={ProspectiveCustomerManagement}></Route>
                <Route exact path="/renter-management" component={RenterManagement}></Route>
                <Route exact path="/landlord-management" component={LandlordManagement}></Route>
                <Route exact path="/chet-message" component={ChetMessage}></Route>
                <Route exact path="/favorites" component={Favorites}></Route>
                <Route exact path="/receipt-management" component={receiptManagement}></Route>
                <Route exact path="/personalSetting" component={personalCenter}></Route>
                <Route exact path="/receipt_management" component={receiptManagement}></Route>
                <Route exact path="/login" component={Login}></Route>
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}
