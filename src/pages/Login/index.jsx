import React, { Component } from 'react';
import { Input, Tooltip, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import * as userApi from '../../api/user';

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userObj: {
      }
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.accountChange = this.accountChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }


  componentDidMount() {
    // userApi.getListData().then(res => {
    //   console.log(res);
    // })
  }

  handleLogin() {
    let { userObj } = this.state;
    userApi.login(userObj).then(res => {
    console.log(res); 
    console.log(this.props);
    let { history } = this.props;
    history.push('/renter-management')
    console.log(window.location);
    }).then(err => {
      if(err !== undefined) {
        console.log(err);
      }
    })
  }

  handleReset() {
    console.log(2222222222222);
  }

  accountChange(target) {
    const { value } = target;
    const { userObj } = this.state;
    let newUserObj = {
      ...userObj,
      username: value
    }
    this.setState({ userObj: newUserObj })
  }

  passwordChange(target) {
    const { value } = target;
    const { userObj } = this.state;
    let newUserObj = {
      ...userObj,
      password: value
    }
    this.setState({ userObj: newUserObj })
  }


  render() {
    let { userObj } = this.state;
    return (
      <div className='main-container-login'>
        <div className='login-card'>
          <div className='card-title-login'>
            房屋无忧管理系统
          </div>
          <div className='card-container-login'>
            <Input
              onChange={(e) => this.accountChange(e.target)}
              value={userObj.username}
              placeholder="Enter your username"
              allowClear={true}
              prefix={<UserOutlined className="site-form-item-icon" />}
              suffix={
                <Tooltip title="Extra information">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <Input.Password
              onChange={(e) => this.passwordChange(e.target)}
              value={userObj.password}
              placeholder="input password"
              allowClear={true}
              prefix={<LockOutlined className="site-form-item-icon" />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <div className='action-bar-login'>
              <Button onClick={() => this.handleLogin()}>登录</Button>
              <Button onClick={() => this.handleReset()}>重置</Button>
            </div>
          </div>
          
        </div>
        <h2 className='appName'>房无忧</h2>
        <h3 className='welcomeText'>Welcome To You!</h3>
      </div>
    );
  }
}

export default index;