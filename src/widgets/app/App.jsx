import React, { Component } from 'react';
import { HashRouter as Router, Link,Switch, Route,  } from 'react-router-dom'
import { Layout, Menu, Badge } from 'antd';
import { inject, observer } from 'mobx-react';
import menuList from '../../config/menu'
import './app.css'
import Home from '../../pages/Home';
import ContractManagement from '../../pages/ContractManagement';
import CertificationCenter from '../../pages/CertificationCenter';
import HouseManagement from '../../pages/HouseManagement';
import DataAnalysis from '../../pages/DataAnalysis';
import ProspectiveCustomerManagement from '../../pages/SystemManagement/ProspectiveCustomerManagement';
import RenterManagement from '../../pages/SystemManagement/RenterManagement';
import LandlordManagement from '../../pages/SystemManagement/LandlordManagement';
import ChetMessage  from '../../pages/ChetMessage'
import personalCenter from '../../pages/PersonalCenter/PersonalSetting';
import Favorites from '../../pages/PersonalCenter/Favorites';
import receiptManagement from '../../pages/ReceiptManagement';
import Login from '../../pages/Login';
import VRhouse from '../../pages/VRhouse'

const { Header, Content } = Layout;
const { SubMenu } = Menu;
const MenuItem = Menu.Item;

@inject('homeStore')
@observer
class App extends Component {

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

  componentDidMount() {
  }

  componentDidUpdate() {
    
    
  }



  render() {
    let { current, count } = this.state;
    let { isShowHeader } = this.props.homeStore;
    return (
      <Layout className="main-container">
        <Router>
        <Switch>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/vr-house" component={VRhouse}></Route>
          </Switch>
        </Router>
        <Router>
          <Layout className="site-layout">
            {
              isShowHeader === false  ? null :
              (
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
                            <SubMenu style={{fontSize: '.7rem'}} key={item.value} icon={<item.icon/>} title={item.label} popupClassName="children-menu">
                              {
                                item.children.map((cItem, index2) => {
                                  return (
                                      <MenuItem icon={<cItem.icon/>}  key={cItem.value}>
                                        <Link style={{fontSize: '.7rem'}} to={`${cItem.path}`}>
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
                                    ? <Badge count={count} color="cyan" style={{ marginTop: '16px', marginRight: '-5px', }}>
                                        <div style={{fontSize: '.7rem'}}>{item.label}</div>
                                      </Badge>
                                    :
                                    <div style={{fontSize: '.7rem'}}>{item.label}</div>
                                  }
                                  
                                </Link>
                              </MenuItem>
                            )
                          }else {
                            return (
                              <MenuItem icon={<item.icon/>} key={item.value} >
                                <Link style={{fontSize: '.7rem'}} to={`${item.path}`}>
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
              )
            }
            <Content
              className="site-layout-background"
              style={{
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/contract-management" component={ContractManagement}></Route>
                <Route exact path="/certification-center" component={CertificationCenter}></Route>
                <Route exact path="/house-management" component={HouseManagement}></Route>
                <Route exact path="/data-analysis" component={DataAnalysis}></Route>
                <Route exact path="/prospectiveCustomer-management" component={ProspectiveCustomerManagement}></Route>
                <Route exact path="/renter-management" component={RenterManagement}></Route>
                <Route exact path="/landlord-management" component={LandlordManagement}></Route>
                <Route exact path="/chet-message" component={ChetMessage}></Route>
                <Route exact path="/favorites" component={Favorites}></Route>
                <Route exact path="/receipt-management" component={receiptManagement}></Route>
                <Route exact path="/personalSetting" component={personalCenter}></Route>
                <Route exact path="/receipt_management" component={receiptManagement}></Route>
                {/* <Route exact path="/login" component={Login}></Route>
                <Route exact path="/vr-house" component={VRhouse}></Route> */}
              </Switch>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;
