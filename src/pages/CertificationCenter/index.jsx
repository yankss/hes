import React, { Component } from 'react'
import { Button, Row, Col, Tag, Space, Input, Popconfirm } from 'antd';
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import ListPage from  '../../widgets/list-page';
import './index.css'

const { TextArea } = Input;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerButtonArray: [
        <Button key="1" type="primary">
          Primary
        </Button>,
      ],
      columns: [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'School', dataIndex: 'school', key: 'school' },
        { title: 'IdCard', dataIndex: 'idCard', key: 'idCard' },
        { title: 'IsCertificationPass', 
          dataIndex: 'isCertificationPass', 
          key: 'isCertificationPass' ,
          render: (text, record) =>
              <div>
                {
                  text ===  'Yes' ? 
                  <Tag color='green'>Yes</Tag> : 
                  <Tag color='red'>No</Tag>
                }
              </div>
        },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (text, record) => {
            return (
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
            )
            
          }
            
        },
      ],
      data: [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440222399481928132',
          isCertificationPass: 'Yes',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440222340281928132',
          isCertificationPass: 'Yes',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
        },
        {
          key: 3,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
          school: '仲恺大学',
          idCard: '440224789231928132',
          isCertificationPass: 'No',
          popconfirmVisible: false,
          confirmLoading: false,
          isPassBtton: true,
        },
      ],
      title: '认证中心',
      tableHeight: 460,
    };
    this.handleAction = this.handleAction.bind(this);
    // this.getExpandedArr = this.getExpandedArr.bind(this);
    this.showPopconfirm = this.showPopconfirm.bind(this);
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
          if(item.key === row.key) {
            item.isPassBtton = false;
          }
          return item;
        })
        this.setState({ data },() => {
          console.log(this.state.data);
        });
        
        break;

      case 'Cancle':
        data = data.map((item, index) => {
          if(item.key === row.key) {
            item.isPassBtton = true;
          }
          return item;
        })
        this.setState({ data },() => {
          console.log(this.state.data);
        });
        break;

      case 'Sure':
        data = data.map((item, index) => {
          if(item.key === row.key) {
            item.confirmLoading = true;
          }
          return item;
        })
        this.setState({ data }, () => {
          console.log(data);
          setTimeout(() => {
            data = data.map((item, index) => {
              if(item.key === row.key) {
                item.confirmLoading = false;
                item.popconfirmVisible = false;
              }
              return item;
            })
            this.setState({ data });
          }, 2000);
        });
        
        break;
    
      default:
        break;
    }
  }

  showPopconfirm(row, flag) {
    let { data } = this.state;
    data = data.map((item, index) => {
      if(item.key === row.key) {
        item.popconfirmVisible = flag;
      }
      return item;
    })
    this.setState({ data });
  }

  getExpandedArr(expandedArr) {
    console.log('expandedArr', expandedArr);
  }


  render() {
    const { columns, data, title, tableHeight, headerButtonArray, isPassBtton } = this.state;
    const tableExpand = {
      expandedRowRender: record => <div>
        <Row>
          {
            columns.map((item, index) => {
              if(item.title !== 'Action') {
                return (
                  <Col span={5} key={item.key} style={{marginTop: '10px'}}>
                      <Tag color='blue'>{item.title}</Tag> : { record[`${item.key}`]} 
                  </Col>
                )
              }else {
                return null;
              }
            })
          }
          {
            isPassBtton === false ? 
            <TextArea placeholder="请输入不通过的原因..." className='noPass-reason-input' showCount maxLength={50}  />
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
        />
      </div>
    )
  }
}
