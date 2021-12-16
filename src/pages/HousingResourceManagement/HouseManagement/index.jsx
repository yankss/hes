import React, { Component } from 'react'
import * as echarts from 'echarts';
import ListPage from '../../../widgets/list-page';
import { Tag, Space, Button, Tooltip, Popconfirm, message, Modal, notification, Col, Input, Row, Select, Drawer } from 'antd';
import { FundTwoTone, EditTwoTone, BulbTwoTone, SmileOutlined  } from '@ant-design/icons';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import NewHouse  from '../../../widgets/NewHouse'
import './index.css'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);


export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns : [
        {
          title: 'RenterName',
          dataIndex: 'renterName',
          key: 'renterName',
          render: text => <Button type="link">{text}</Button>,
        },
        {
          title: 'RenterPhone',
          dataIndex: 'renterPhone',
          key: 'renterPhone',
          render: text => <Button type="link">{text}</Button>,
        },
        {
          title: 'LandlordName',
          dataIndex: 'landlordName',
          key: 'landlordName',
          render: text => <Button type="link">{text}</Button>,
        },
        {
          title: 'LandlordPhone',
          dataIndex: 'landlordPhone',
          key: 'landlordPhone',
          render: text => <Button type="link">{text}</Button>,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          render: address => (
            <Tooltip placement="top" title={address}>
              <span>{address}</span>
            </Tooltip>
          )
        },
        {
          title: 'LeaseState',
          key: 'leaseState',
          dataIndex: 'leaseState',
          render: leaseState => (
            <>
              {
                leaseState === '已出租' ? 
                (<Tag color='blue'>{leaseState}</Tag>) : 
                (<Tag color='yellow'>{leaseState}</Tag>)
              }
            </>
          ),
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          width: '300px',
          render: tags => (
            <>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Rent',
          dataIndex: 'rent',
          key: 'rent',
          width: 100,
          fixed: 'right',
        },
        {
          title: 'WaterRate',
          dataIndex: 'waterRate',
          key: 'waterRate',
          width: 100,
          fixed: 'right',
        },
        {
          title: 'ElectricityRate',
          dataIndex: 'electricityRate',
          key: 'electricityRate',
          width: 100,
          fixed: 'right',
        },
        {
          title: 'TotalAmount',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          width: 100,
          fixed: 'right',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.totalAmount - b.totalAmount,
          render: (text, record) => <Button type='link'>{text}</Button>
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          // width: 300,
          render: (text, record) => (
            <Space size="middle">
              {
                record.actionImg.map((item, index) => {
                  if(index === 0) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to show this task?"
                        onConfirm={(e) => this.confirm(e, 'showFundTwoTone', record)}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>{item}</Button>
                      </Popconfirm>
                      
                    )
                  }
                  if(index === 1) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to delete this task?"
                        onConfirm={(e) => this.confirm(e, 'showDeleteTwoTone', record)}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>{item}</Button>
                      </Popconfirm>
                    )
                  }
                  if(index === 2) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to notice this task?"
                        onConfirm={(e) => this.confirm(e, 'showBulbTwoTone',record)}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button>{item}</Button>
                      </Popconfirm>
                    )
                  }else {
                    return null;
                  }
                })
              }
            </Space>
          ),
        },
        
      ],
      data : [
        {
          key: '1',
          rent: 500,
          totalAmount: 0,
          waterRate: 10.2,
          electricityRate: 50.1,
          renterName: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
          leaseState: '已出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '2',
          rent: 400,
          totalAmount: 0,
          waterRate: 17.2,
          electricityRate: 170.1,
          renterName: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser', 'houseManagement'],
          leaseState: '已出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '3',
          rent: 800,
          totalAmount: 0,
          waterRate: 10.2,
          electricityRate: 200.1,
          renterName: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
          leaseState: '未出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '4',
          totalAmount: 0,
          rent: 750,
          waterRate: 40.2,
          electricityRate: 150.1,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: '未出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '5',
          totalAmount: 0,
          rent: 1050,
          waterRate: 43.2,
          electricityRate: 350.1,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: '已出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '6',
          totalAmount: 0,
          rent: 400,
          waterRate: 10.2,
          electricityRate: 50.1,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: '已出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '7',
          totalAmount: 0,
          rent: 400,
          waterRate: 10.2,
          electricityRate: 50.1,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: '未出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '8',
          totalAmount: 0,
          rent: 400,
          waterRate: 10.2,
          electricityRate: 50.1,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: '已出租',
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
      ],
      title: '房屋管理',
      tableHeight: 500,
      tableWidth: '150%',
      chartVisible: false,
      chartOptions: {},
      chartTitle: '',
      address: '',
      tagChildren: [
        { value: 'gold' },
        { value: 'lime' },
        { value: 'green' }, 
        { value: 'cyan' },
        { value: 'blue'}
      ],
      leaseStateTag: [
        { value: 'blue' },
        { value: 'yellow' },
      ],
      newHouseVisible: false
      
    };
    
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.closeChartVisible = this.closeChartVisible.bind(this);
    this.showNewHouseBoard = this.showNewHouseBoard.bind(this);
  }
  

  componentDidMount() {
    let data = this.state.data;
    data.map(item => {
      item.totalAmount = item.rent  + item.electricityRate + item.waterRate;
      item.totalAmount = (item.totalAmount+'').slice(0,(item.totalAmount+'').indexOf('.')+3)
      return item;
    })

    this.setState({ data });
  }

  confirm(e, type, record) {
    message.success('Click on Yes');
    switch (type) {
      case 'showFundTwoTone':
        console.log(record);
        this.setState({ chartTitle: record.name })
        this.setState({ address: record.address });
        this.setState({ chartVisible: true })
        setTimeout(() => {
          var chartDom = document.querySelector('#main')
          var myChart = echarts.init(chartDom);
          var option;
    
          option = {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          };
    
          option && myChart.setOption(option);
          this.setState({ chartOptions: option});
        
        }, 0);
      break;

      case 'showDeleteTwoTone':
      
      break;

      case 'showBulbTwoTone':
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      break;
    
      default:
        break;
    }
  }
  
  cancel(e) {
    message.error('Click on No');
  }
  closeChartVisible() {
    this.setState({ chartVisible: false });
  }
  showNewHouseBoard(flag) {
    console.log(1111111111111);
    this.setState({ newHouseVisible: flag})
  }

  render() {
    const { columns, data, title, tableHeight, tableWidth, chartVisible, chartTitle, address, tagChildren, leaseStateTag, newHouseVisible } = this.state;
    
    const headerButtonArray =  [
      <Button key="1" type="primary" onClick={() => this.showNewHouseBoard(true)}>NewHouse</Button>,
      <Button key="3" type="primary">Reset</Button>,
      <Button key="2" type="primary">Search</Button>,
      
    ]

    function tagRender(props) {
      console.log('props', props);
      const { value, closable, onClose } = props;
      const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color={value}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
        >
          {
            value === 'gold' ? '热血' 
            : value === 'lime' ? '搞笑' 
            : value === 'green' ? '无聊' 
            : value === 'cyan' ? '美食' 
            : value === 'blue' ? '已出租' 
            : value === 'yellow' ? '未出租' 
            : '运动 '
          }
        </Tag>
      );
    }

    const filterBar = (
      <>
        <Row className='filter-bar'>
          <Col style={{margin: '0 10px'}} span={3}><Input placeholder="请输入租客姓名 :" allowClear={true}/></Col>
          <Col style={{margin: '0 10px'}} span={3}><Input placeholder="请输入屋主姓名 :" allowClear={true}/></Col>
          <Col style={{margin: '0 10px'}} span={6}><Input placeholder="请输入地址 :" allowClear={true}/></Col>
          <Col style={{margin: '0 10px'}} span={3}>
            <Select
              mode="multiple"
              showArrow
              style={{float:  'left', marginRight: '20px', width: '100%'}}
              allowClear={true}
              placeholder="请输入租赁状态 :"
              tagRender={tagRender}
              onChange={this.tagChange}
              options={leaseStateTag}
            >
            </Select>
          </Col>
          <Col style={{margin: '0 10px'}} span={6}>
            <Select
              mode="multiple"
              showArrow
              style={{float:  'left', marginRight: '20px', width: '100%'}}
              allowClear={true}
              placeholder="请输入标签 ："
              tagRender={tagRender}
              onChange={this.tagChange}
              options={tagChildren}
            >
            </Select>
          </Col>
        </Row>
      </>
    )
    return (
      <div className="my-content">
        <ListPage 
          columns={columns} 
          data={data} 
          title={title}
          tableHeight={tableHeight}
          headerButtonArray={headerButtonArray}
          filterBar={filterBar}
          tableWidth={tableWidth}
        >
        </ListPage>
        {/* 图标弹框 */}
        <Modal
          title={`${chartTitle}位于${address}房子近几个月的租金曲线图 :`}
          centered
          onCancel={this.closeChartVisible}
          visible={chartVisible}
          width={1100}
        >
          <div id='main' style={{width: '1000px', height: '600px'}}></div>
        </Modal>
        <Drawer
          title="Create a new house"
          width={720}
          onClose={() => this.showNewHouseBoard(false)}
          visible={newHouseVisible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={() => this.showNewHouseBoard(false)}>Cancel</Button>
              <Button onClick={() => this.showNewHouseBoard(false)} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <NewHouse/>
        </Drawer>
      </div>
    )
  }
}
