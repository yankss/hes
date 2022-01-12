import React, { Component } from 'react'
import { Descriptions, Steps , Button, Statistic, Row, Col, Image, Tag } from 'antd';
import { FireFilled, SketchCircleFilled, UserOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import './index.css'

const { Step } = Steps;

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
  
  render() {
    const { descriptionItems, userObject } = this.state;
    const { tag, certificationStatus } = userObject;
    const actionBar = <>
      <div className='personal-setting-actionBar'>
        <Button>编辑</Button>
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
        <Step status="finish" title="未提交" icon={<UserOutlined />} />
        <Step status="process" title="审核中" icon={<LoadingOutlined />} />
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
    const certificationNoPass = <>
      <Steps>
        <Step status="finish" title="已提交" icon={<UserOutlined />} />
        <Step status="process" title="已审核" icon={<LoadingOutlined />} />
        <Step status="wait" title="认证失败" icon={<SmileOutlined />} />
      </Steps>
    </>

// 认证成功
    const certificationPass = <>
      <Steps>
        <Step status="finish" title="已提交" icon={<UserOutlined />} />
        <Step status="process" title="已审核" icon={<LoadingOutlined />} />
        <Step status="wait" title="认证成功" icon={<SmileOutlined />} />
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
