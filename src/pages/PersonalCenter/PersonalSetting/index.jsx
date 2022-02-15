import React, { Component } from 'react'
import { Descriptions,
          Steps,
          Button,
          Statistic,
          Row,
          Col,
          Image, 
          Tag, 
          Tooltip, 
          Modal, 
          message 
} from 'antd';
import {  FireFilled, 
          SketchCircleFilled, 
          UserOutlined, 
          LoadingOutlined, 
          SmileOutlined, 
          Loading3QuartersOutlined, 
          FrownOutlined, 
          CloseCircleOutlined, 
          CheckOutlined,
          ExclamationCircleTwoTone,
          ExclamationCircleOutlined 
} from '@ant-design/icons';
import './index.css'

const { Step } = Steps;
const { confirm } = Modal;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      descriptionItems: [
        {
          label: '账号',
          key: 'account'
        },
        {
          label: '用户名',
          key: 'username'
        },
        {
          label: '电话',
          key: 'phone'
        },
        {
          label: '电子邮箱',
          key: 'email'
        },
        {
          label: '性别',
          key: 'gender'
        },
        {
          label: '年龄',
          key: 'age'
        },
        {
          label: '标签',
          key: 'tag'
        },
        {
          label: '身份',
          key: 'identity'
        },
      ],
      userObject: {}
    }
    this.applyHandle = this.applyHandle.bind(this);
  }

  componentDidMount() {
    const userObject = {
      account: 'yzy13544520424',
      username: 'Yankxx',
      phone: '13544520424',
      email: '2395624352@qq.com',
      gender: 1,
      age: '18',
      tag: 'cool,实惠',
      identity: 2,
      liveness: 1128,
      integralValue: 732,
      certificationStatus: 0,
      isCertification: 0,
      failureReason: '学生认证不通过，校园信息填写有误。'
    }
    // 数据处理
    userObject.gender === 0 ? userObject.gender = '女' : userObject.gender = '男';
    userObject.identity === 0 ? userObject.identity = '潜客'
    : userObject.identity === 1 ? userObject.identity = '租客'
    : userObject.identity === 2 ? userObject.identity = '房东'
    : userObject.identity = '超级管理员';
    userObject.tag = userObject.tag.split(',');
    this.setState({ userObject });

  }

  applyHandle() {
    confirm({
      title: '是否确定进行认证申请?',
      icon: <ExclamationCircleOutlined />,
      content: '进行认证申请前请确保已经完善所有个人信息，若已完善可以点击"确定"按钮申请认证，否则请先完善个人信息再进行认证申请。',
      okText: '确认申请',
      cancelText: '完善信息',
      onOk() {
        return new Promise((resolve, reject) => {   
          message.success('This is a success message');
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        console.log(11111111111);
      },
    });
  }
  
  render() {
    const { descriptionItems, userObject } = this.state;
    const { tag, certificationStatus, failureReason } = userObject;
    const actionBar = <>
      <div className='personal-setting-actionBar'>
        {
          certificationStatus === 0 ? <Button onClick={() => this.applyHandle()}>申请认证</Button>
          : certificationStatus === 2 ? <Button>重新认证</Button>
          : null
        }
        <Button>完善信息</Button>
      </div>
    </>
    
    const tagItem = <div>
      { 
        tag !== undefined ?
        (
          tag.map((tagItem, tagIndex) => {
            return (
              <Tag color="geekblue" key={tagIndex}>{tagItem}</Tag>
            )
          })
        
        ) : null
      }
    </div>

// 未提交
    const notSubmit = <>
      <Steps>
        <Step status="wait" title="未提交" icon={<UserOutlined />} />
        <Step status="wait" title="未审核" icon={<Loading3QuartersOutlined />} />
        <Step status="wait" title="认证完成" icon={<SmileOutlined />} />
      </Steps>
    </>

// 审核中
    const underCheck = <>
      <Steps>
        <Step status="finish" title="已提交" icon={<UserOutlined />} />
        <Step status="process" title="审核中" icon={<LoadingOutlined />} />
        <Step status="wait" title="认证完成" icon={<SmileOutlined />} />
      </Steps>
    </>

// 认证失败
    const errorTitle = <>
      审核不通过 
      <Tooltip title={`失败原因: ${failureReason}`}>
        <ExclamationCircleTwoTone twoToneColor={'#faad14'} />
      </Tooltip>
      
    </>

    const certificationNoPass = <>
      <Steps current={1} status="error">
        <Step status="finish" title="已提交" icon={<UserOutlined />} />
        <Step status="finish" title={errorTitle} icon={<CloseCircleOutlined />} />
        <Step status="error" title="认证失败" icon={<FrownOutlined />} />
      </Steps>
    </>


// 认证成功
    const certificationPass = <>
      <Steps>
        <Step status="finish" title="已提交" icon={<UserOutlined />} />
        <Step status="finish" title="审核通过" icon={<CheckOutlined />} />
        <Step status="finish" title="认证成功" icon={<SmileOutlined />} />
      </Steps>
    </>  

    return (
      <div>
        <div className='ps-topBar'>
          <div className='ps-infoContainer'>
            <Image
              width={150}
              style={{ borderRadius: '50%' }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <span className='ps-info-username'>Yankss</span>
          </div>
          <Row gutter={16} className='ps-statistical'>
            <Col span={12}>
              <Statistic title="活跃度" value={userObject.liveness} prefix={<FireFilled style={{ color: '#55acee'}} />} />
            </Col>
            <Col span={12}>
              <Statistic title="积分" value={userObject.integralValue} prefix={<SketchCircleFilled style={{ color: '#55acee'}} />} />
            </Col>
          </Row>
        </div>
        <Descriptions 
          title="用户信息" 
          bordered
          extra={actionBar}>
          <Descriptions.Item label="认证状态" span={3}>
          {
            certificationStatus === 0 ? notSubmit
            : certificationStatus === 1 ? underCheck
            : certificationStatus === 2 ? certificationNoPass
            : certificationStatus === 3 ? certificationPass
            : '暂无认证信息'
          }
          </Descriptions.Item>
          {
            descriptionItems.map((item, index) => {
              for (const key in userObject) {
                if(item.key === key) {
                  if(key === 'tag') {
                    return (
                      <Descriptions.Item 
                        label={<Tag color="#55acee">{item.label}</Tag>} 
                        key={item.label}
                      >
                       {tagItem}
                      </Descriptions.Item>
                      
                    )
                  }else {
                    return (
                      <Descriptions.Item 
                        label={<Tag color="#55acee">{item.label}</Tag>} 
                        key={item.label}
                      >
                        {userObject[key]}
                      </Descriptions.Item>
                    )
                  }
                }
              }
              return null;
            })
          }
        </Descriptions>
      </div>
    )
  }
}
