import React, { Component } from 'react'
import { Button, Row, Col, Tag, Space, Input, Popconfirm, Image  } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import ListPage from  '../../widgets/list-page';
import './index.css'

const { TextArea } = Input;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandColumns: [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'School', dataIndex: 'school', key: 'school' },
        { title: 'idCardNumber', dataIndex: 'idCardNumber', key: 'idCardNumber' },
        { 
          title: 'IsCertificationPass', 
          dataIndex: 'isCertificationPass', 
          key: 'isCertificationPass' ,
          render: (text, record) =>
              <div>
                {
                  text ===  '1' ? <Tag color='green'>已通过</Tag> 
                  : text ===  '0' ? <Tag color='red'>不通过</Tag>
                  : <Tag color='yellow'>待审核</Tag>
                }
              </div>
        },
        {
          title: '身份证',
          dataIndex: 'idCard',
          key: 'idCard'
        },
        {
          title: '学生证',
          dataIndex: 'studentCard',
          key: 'studentCard'
        },
      ],
      columns: [
        { title: 'Name', dataIndex: 'name', key: 'name', width: 100 },
        { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
        { title: 'Address', dataIndex: 'address', key: 'address', width: 300 },
        { title: 'School', dataIndex: 'school', key: 'school', width: 200 },
        { title: 'idCardNumber', dataIndex: 'idCardNumber', key: 'idCardNumber', width: 200 },
        { 
          title: 'IsCertificationPass', 
          width: 200,
          dataIndex: 'isCertificationPass', 
          key: 'isCertificationPass' ,
          
          filters: [
            {
              text: '已通过',
              value: '1'
            },
            {
              text: '不通过',
              value: '0'
            },
            {
              text: '待审核',
              value: '2'
            }
          ],
          onFilter: (value, record) => record.isCertificationPass.indexOf(value) === 0,
          render: (text, record) =>
              <div>
                {
                  text ===  '1' ? <Tag color='green'>已通过</Tag> 
                  : text ===  '0' ? <Tag color='red'>不通过</Tag>
                  : <Tag color='yellow'>待审核</Tag>
                }
              </div>
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          key: 'Action',
          render: (text, record) => {
            return (
              record.isCertificationPass === '2' ? (
                record.isPassBtton === true ? (<Space>
                  <Button onClick={() => this.handleAction(record, 'Allow')} >Allow</Button>
                  <Button onClick={() => this.handleAction(record, 'NoPass')} >NoPass</Button>
                </Space>)
                : (
                  <Space>
                    <Button onClick={() => this.handleAction(record, 'Cancle')} >取消</Button>
                    <Popconfirm
                      title="Title"
                      visible={record.popconfirmVisible}
                      onConfirm={() => this.handleAction(record, 'Sure')}
                      okButtonProps={{ loading: record.confirmLoading }}
                      onCancel={() => this.showPopconfirm(record, false)}
                    >
                      <Button onClick={() => this.showPopconfirm(record, true)} >
                        确定
                      </Button>
                    </Popconfirm>
                  </Space>
                )
              ): null
              
            )
            
          }
            
        },
      ],
      data: [
        {
          id: 1,
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
          school: '仲恺大学',
          idCardNumber: '440222399481928132',
          isCertificationPass: '1',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
          noPassReason: '',
        },
        {
          id: 2,
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
          school: '仲恺大学',
          idCardNumber: '440222340281928132',
          isCertificationPass: '2',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
          noPassReason: '',
        },
        {
          id: 3,
          key: 3,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
          school: '仲恺大学',
          idCardNumber: '440224789231928132',
          isCertificationPass: '0',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
          noPassReason: '',
        },
      ],
      filterBar: [
        {
          placeholder: '请输入用户身份证号: ',
          value: 'idCardNumber',
          name: 'idCardNumber',
          allowClear: true,
          span: 3.5,
          type: 'input'
        },
        {
          placeholder: '请输用户真实姓名: ',
          value: 'name',
          name: 'name',
          allowClear: true,
          span: 3.5,
          type: 'input'
        },
      ],
      title: '认证中心',
      tableHeight: 660,
      moduleDescription: '认证中心模块是管理员用于给用户审核身份认证的重要模块，该模块中可以观察到用户提交的审核信息，管理员将通过这些信息判断该用户能否通过学生身份认证'
    };
    this.certificationCenterList = React.createRef();
    this.handleAction = this.handleAction.bind(this);
    // this.getExpandedArr = this.getExpandedArr.bind(this);
    this.showPopconfirm = this.showPopconfirm.bind(this);
    this.changeNoPassReason = this.changeNoPassReason.bind(this);
  }


  handleAction(row, type) {
    let { data } = this.state;
    if(type === 'NoPass') {
      this.setState({ isPassBtton: false });
      // this.ListPage.expandHandle(row,row.key)
    }
    switch (type) {
      case 'Allow':
        
        break;

      case 'NoPass':
        data = data.map((item, index) => {
          if(item.id === row.id) {
            item.isPassBtton = false;
          }
          return item;
        })
        this.setState({ data },() => {
        });
        
        break;

      case 'Cancle':
        data = data.map((item, index) => {
          if(item.id === row.id) {
            item.isPassBtton = true;
          }
          return item;
        })
        this.setState({ data },() => {
        });
        break;

      case 'Sure':
        data = data.map((item, index) => {
          if(item.id === row.id) {
            item.confirmLoading = true;
          }
          return item;
        })
        this.setState({ data }, () => {
          setTimeout(() => {
            data = data.map((item, index) => {
              if(item.id === row.id) {
                item.confirmLoading = false;
                item.popconfirmVisible = false;
              }
              return item;
            })
            this.setState({ data });
          }, 1000);
        });
        
        break;
    
      default:
        break;
    }
  }

  showPopconfirm(row, flag) {
    let { data } = this.state;
    data = data.map((item, index) => {
      if(item.id === row.id) {
        item.popconfirmVisible = flag;
      }
      return item;
    })
    this.setState({ data });
  }

  getExpandedArr(expandedArr) {
    console.log('expandedArr', expandedArr);
  }

  changeNoPassReason(text, record){
    let value = text.currentTarget.value;
    record.noPassReason = value;
    let { data } = this.state;
    data = data.map(item => {
      if(item.id === record.id){
        item.noPassReason = value;
      }
      return item;
    })
    this.setState({ data }, () => {
      console.log(this.state);
    })
  }

  searchHandle() {
    let { searchData } = this.certificationCenterList.current.state
    console.log(searchData);
  }
  resetHandle() {
    console.log(this.certificationCenterList.current);
    this.certificationCenterList.current.resetHandle();
  }


  render() {
    const { 
        columns,
        data,
        title,
        tableHeight,
        filterBar,
        expandColumns,
        moduleDescription
    } = this.state;

    const tableExpand = {
      expandedRowRender: record => 
        <div>
          <Row className='expandedContainer'>
            {
              expandColumns.map((item, index) => {
                return (
                  item.dataIndex !== 'Action' && item.dataIndex !== 'isCertificationPass' && item.dataIndex !== 'idCard' && item.dataIndex !== 'studentCard' ? 
                  (
                    <Col span={5} key={item.key} style={{marginTop: '10px'}}>
                        <Tag color='blue'>{item.title}</Tag> : { record[`${item.key}`]} 
                    </Col>
                  )
                  : item.dataIndex === 'isCertificationPass' ?
                  (
                    <Col className='expandedRowImg' span={5} key={item.key} style={{marginTop: '10px'}}>
                        <Tag color='blue'>{item.title}</Tag> : 
                        {
                          record[`${item.key}`] ===  '1' ? '已通过'
                          : record[`${item.key}`] ===  '0' ? '不通过'
                          : '待审核'
                        }
                    </Col>
                  )
                  : item.dataIndex === 'idCard' ?
                  (
                    <Col className='expandedRowImg' span={5} key={item.key} style={{marginTop: '10px'}}>
                        <Tag color='blue'>{item.title}</Tag> : <Image
                          width={100}
                          src="https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%BA%AB%E4%BB%BD%E8%AF%81%E6%A0%B7%E4%BE%8B"
                        />
                    </Col>
                  )
                  : item.dataIndex === 'studentCard' ?
                  (
                    <Col className='expandedRowImg' span={5} key={item.key} style={{marginTop: '10px'}}>
                        <Tag color='blue'>{item.title}</Tag> : <Image
                          width={100}
                          src="https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E5%AD%A6%E7%94%9F%E8%AF%81%E6%A0%B7%E4%BE%8B"
                        />
                    </Col>
                  )
                  : null
                )
              })
            }
            {
              record.isPassBtton === false ? 
              <TextArea 
                placeholder="请输入不通过的原因..." 
                className='noPass-reason-input' 
                showCount 
                maxLength={50}
                onChange={(text) => this.changeNoPassReason(text, record)}
              />
              : null
            }
          </Row>
        </div>,
      rowExpandable: record => record.name !== 'Not Expandable',
      expandIcon: ({ expanded, onExpand, record }) =>
        expanded ? (
          <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
        ) : (
          <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
        )
      
    }

    const headerButtonArray =  [
      <Button key="3" type="primary" onClick={() => this.resetHandle()}>重置</Button>,
      <Button key="2" type="primary" onClick={() => this.searchHandle()}>搜索</Button>,
    ]
    return (
      <div>
        <ListPage
          columns={columns}
          data={data}
          title={title}
          tableHeight={tableHeight}
          tableExpand={tableExpand}
          headerButtonArray={headerButtonArray}
          onRef={ c => this.ListPage = c}
          getExpandedArr={this.getExpandedArr}
          filterBar={filterBar}
          moduleDescription={moduleDescription}
          ref={this.certificationCenterList}
        />
      </div>
    )
  }
}
