import React, { Component } from 'react';
import { Input, Tooltip, Button, Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';
import * as userApi from '../../api/user';

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userObject: {},
      userObj: {},
      formType: 2,
      psFormItems: [
        {
          label: '账号',
          key: 'account',
          type: 'input',
          disabled: false,
          placeholder: '请输入账号'
        },
        {
          label: '用户名',
          key: 'username',
          type: 'input',
          disabled: false,
          placeholder: '请输入用户名'
        },
        {
          label: '密码',
          key: 'password',
          type: 'input',
          disabled: false,
          placeholder: '请输入密码'
        },
        {
          label: '确认密码',
          key: 'surePassword',
          type: 'input',
          disabled: false,
          placeholder: '请再次输入密码'
        },
        {
          label: '电话',
          key: 'phone',
          type: 'input',
          disabled: false,
          placeholder: '请输入电话'
        },
        {
          label: '电子邮箱',
          key: 'email',
          type: 'input',
          disabled: false,
          placeholder: '请输入电子邮箱'
        },
        {
          label: '性别',
          key: 'gender',
          type: 'input',
          disabled: false,
          placeholder: '选择输入性别'
        },
        {
          label: '年龄',
          key: 'age',
          type: 'input',
          disabled: false,
          placeholder: '请输入年龄'
        },
      ],
    }
    this.registerFormRef = React.createRef();
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
    
    let { formType } = this.state;
    if(formType === 1) {
      this.setState({ userObj: {} })
    }else if(formType === 2){
      this.registerFormRef.current.resetFields();
    }
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
  handleRegister = () => {
    let loginCard = document.querySelector('.login-card')
    let registerCard = document.querySelector('.register-card')
    loginCard.style.transform = 'rotateY(180deg)'
    registerCard.style.transform = 'rotateY(0deg)'
    this.setState({ formType: 2 })
    this.setState({ userObject: {}})
  }
  handleGoLogin = () => {
    this.handleReset();
    this.setState({ formType: 1 })
    let loginCard = document.querySelector('.login-card')
    let registerCard = document.querySelector('.register-card')
    loginCard.style.transform = 'rotateY(0deg)'
    registerCard.style.transform = 'rotateY(-180deg)'
  }
  handleSubmit = () => {
    let {userObject} = this.state;
    let { surePassword, ...userObj} = userObject;
    userObj.gender === '男' ? userObj.gender = 1 : userObj.gender = 2
    userApi.registered(userObj).then(res => {
      console.log(res); 
      message.success({
        content: 'This is a prompt message with custom className and style',
        className: 'custom-class',
        style: {
          marginTop: '10vh',
        },
      });
      setTimeout(() => {
        this.handleReset();
        this.setState({ formType: 1 })
        let loginCard = document.querySelector('.login-card')
        let registerCard = document.querySelector('.register-card')
        loginCard.style.transform = 'rotateY(0deg)'
        registerCard.style.transform = 'rotateY(-180deg)'
      }, 1000);
      }).then(err => {
        if(err !== undefined) {
          console.log(err);
          message.error({
            content: `${err}`,
            className: 'custom-class',
            style: {
              marginTop: '10vh',
            },
          });
        }
      })
  }
  onChangeFormData = (e) => {
    let userObject = {};
    let { id, value } = e.target;
    userObject[`${id}`] = value;
    userObject = Object.assign(this.state.userObject, userObject);
    console.log(userObject);
    this.setState({ userObject})
  }


  render() {
    const { userObj, psFormItems, userObject } = this.state;
    return (
      <div className='main-container-login'>
        <div className='rotateCardContainer'>
          <div className='login-card'>
            <div className='card-title-login'>
              登录
            </div>
            <div className='card-container-login'>
              <Input
                className='login-input'
                onChange={(e) => this.accountChange(e.target)}
                value={userObj.username}
                placeholder="请输入账号..."
                allowClear={true}
                prefix={<UserOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Extra information">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
              <Input.Password
                className='login-input'
                onChange={(e) => this.passwordChange(e.target)}
                value={userObj.password}
                placeholder="请输入密码..."
                allowClear={true}
                prefix={<LockOutlined className="site-form-item-icon" />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <div className='action-bar-login'>
                <Button onClick={() => this.handleLogin()}>登录</Button>
                <Button onClick={() => this.handleReset()}>重置</Button>
                <Button onClick={this.handleRegister}>注册</Button>
              </div>
            </div>
          </div>
          <div className='register-card'>
            <div className='card-title-register'>
              注册
            </div>
            <div className='card-container-register'>
              <Form
                autoComplete="off"
                onFinish={() => this.onFinish()}
                onFinishFailed={() => this.onFinishFailed()}
                className='registerForm'
                ref={this.registerFormRef}
              >
                {
                  psFormItems.map((item, index) => {
                    return (
                      item.type === 'input' ?
                      (
                        <Form.Item
                          rules={item.rules}
                          key={item.key}
                          className='registerFormItem'
                        >
                          <div className='registerFormItemLabel'>{`${item.label} :`}</div>
                          <Form.Item
                            name={item.key}
                            rules={item.rules}
                            style={{margin: '0'}}
                          >
                            <Input 
                              disabled={item.disabled}
                              placeholder={item.placeholder}
                              value={userObject[`${item.key}`]}
                              onChange={(e) => this.onChangeFormData(e)}
                            />
                          </Form.Item>
                          
                        </Form.Item>
                      )
                      : null
                    )
                  })
                }
              </Form>
            <div className='action-bar-login'>
              <Button onClick={this.handleGoLogin}>登录</Button>
              <Button onClick={this.handleSubmit}>提交</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </div>
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