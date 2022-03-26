import React, { Component } from 'react'
import * as echarts from 'echarts';
import ListPage from '../../widgets/list-page';
import { Tag, Space, Button, Tooltip, Popconfirm, message, Modal, notification, Drawer } from 'antd';
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
import NewHouse  from '../../widgets/NewHouse'
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
          title: '租客姓名',
          dataIndex: 'renterName',
          key: 'renterName',
          width: 150,
          align: 'left',
          render: text => <Button style={{paddingLeft: '0'}} type="link">{text}</Button>,
        },
        {
          title: '租客电话',
          dataIndex: 'renterPhone',
          key: 'renterPhone',
          width: 150,
          align: 'left',
          render: text => <Button style={{paddingLeft: '0'}} type="link">{text}</Button>,
        },
        {
          title: '房东姓名',
          dataIndex: 'landlordName',
          key: 'landlordName',
          width: 150,
          align: 'left',
          render: text => <Button style={{paddingLeft: '0'}} type="link">{text}</Button>,
        },
        {
          title: '房东电话',
          dataIndex: 'landlordPhone',
          key: 'landlordPhone',
          width: 150,
          align: 'left',
          render: text => <Button style={{paddingLeft: '0'}} type="link">{text}</Button>,
        },
        {
          title: '房屋地址',
          dataIndex: 'address',
          key: 'address',
          width: 200,
          render: address => (
            <Tooltip placement="top" title={address}>
              <span>{address}</span>
            </Tooltip>
          )
        },
        {
          title: '租赁状态',
          key: 'leaseState',
          dataIndex: 'leaseState',
          width: 130,
          render: leaseState => (
            <>
              {
                leaseState === 1 ? 
                (<Tag color='blue'>已出租</Tag>) : 
                (<Tag color='yellow'>未出租</Tag>)
              }
            </>
          ),
        },
        {
          title: '房屋标签',
          key: 'tags',
          dataIndex: 'tags',
          width: 300,
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
          title: '月租',
          dataIndex: 'rent',
          key: 'rent',
          width: 100,
          fixed: 'right',
        },
        {
          title: '水费单价',
          dataIndex: 'waterRate',
          key: 'waterRate',
          width: 100,
          fixed: 'right',
          render: (text, record) => (
            <>
              {
                record.leaseState === 1 ?
                record.waterFee :
                `${record.waterRate}元/升`
              }
            </>
          )
        },
        {
          title: '电费单价',
          dataIndex: 'electricityRate',
          key: 'electricityRate',
          width: 130,
          fixed: 'right',
          render: (text, record) => (
            <>
              { 
                record.leaseState === 1 ?
                record.electricityFee :
                `${record.electricityRate}元/度`
              }
            </>
          )
        },
        {
          title: '总房租',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          width: 130,
          fixed: 'right',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.totalAmount - b.totalAmount,
          render: (text, record) => (
            <>
              { 
                record.leaseState === 1 ?
                <Button type='link'>{text}</Button> :
                <Button danger type='link'>暂无</Button>
              }
            </>
          )
          // render: (text, record) => <Button type='link'>{text}</Button>
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (text, record) => (
            <Space size="middle">
              {
                record.actionImg.map((item, index) => {
                  if(index === 0) {
                    return (
                      <Popconfirm
                        key={index}
                        title="是否显示该房屋的租金曲线图?"
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
                        title="是否要对该房屋信息进行修改?"
                        onConfirm={(e) => this.confirm(e, 'showEditTwoTone', record)}
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
                        title="是否要通知该房屋租客上交租金?"
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
          renterPhone: '13566437666',
          rent: 500,
          totalAmount: 0,
          waterFee: 10.2,
          waterRate: 0.7,
          electricityRate: 1.5,
          electricityFee: 50.1,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          renterName: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
          leaseState: 1,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '2',
          renterPhone: '13566437666',
          rent: 400,
          totalAmount: 0,
          waterFee: 17.2,
          electricityFee: 170.1,
          electricityRate: 1.5,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          waterRate: 0.7,
          renterName: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser', 'houseManagement'],
          leaseState: 1,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '3',
          renterPhone: '13566437666',
          rent: 800,
          totalAmount: 0,
          waterFee: 10.2,
          electricityFee: 200.1,
          waterRate: 0.7,
          electricityRate: 1.5,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          renterName: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
          leaseState: 0,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '4',
          renterPhone: '13566437666',
          totalAmount: 0,
          rent: 750,
          waterFee: 40.2,
          electricityFee: 150.1,
          waterRate: 0.7,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          electricityRate: 1.5,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: 0,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '5',
          renterPhone: '13566437666',
          totalAmount: 0,
          rent: 1050,
          waterFee: 43.2,
          electricityFee: 350.1,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          waterRate: 0.7,
          electricityRate: 1.5,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: 1,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '6',
          renterPhone: '13566437666',
          totalAmount: 0,
          rent: 400,
          waterFee: 10.2,
          electricityFee: 50.1,
          waterRate: 0.7,
          electricityRate: 1.5,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: 1,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '7',
          renterPhone: '13566437666',
          totalAmount: 0,
          rent: 400,
          waterFee: 10.2,
          electricityFee: 50.1,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          waterRate: 0.7,
          electricityRate: 1.5,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: 0,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
        {
          key: '8',
          renterPhone: '13566437666',
          totalAmount: 0,
          rent: 400,
          waterFee: 10.2,
          electricityFee: 50.1,
          landlordPhone: '13445667342',
          landlordName: '完犊子',
          waterRate: 0.7,
          electricityRate: 1.5,
          renterName: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          leaseState: 1,
          actionImg: [<FundTwoTone />, <EditTwoTone />, <BulbTwoTone />],
        },
      ],
      title: '房屋管理',
      tableHeight: 400,
      tableWidth: '100%',
      chartVisible: false,
      chartOptions: {},
      chartTitle: '',
      address: '',
      tagChildren: [
        { label: '热血', color: 'gold', value: 1 },
        { label: '搞笑', color: 'lime', value: 2 },
        { label: '无聊', color: 'green', value: 3 }, 
        { label: '美食', color: 'cyan', value: 4 },
        { label: '运动', color: 'blue', value: 5 }
      ],
      leaseStateTag: [
        { label: '已出租', value: 1 },
        { label: '未出租', value: 0 },
      ],
      newHouseVisible: false,
      newHouseObject: {},
      drawerTitle: '',
      filterBar: [
        {
          placeholder: '请输入租客姓名: ',
          value: 'renterName',
          name: 'renterName',
          allowClear: true,
          span: 3.5,
          type: 'input'
        },
        {
          placeholder: '请输入屋主姓名: ',
          value: 'landlordName',
          name: 'landlordName',
          allowClear: true,
          span: 3.5,
          type: 'input'
        },
        {
          placeholder: '请输入租赁状态: ',
          value: 'leaseState',
          name: 'leaseState',
          allowClear: true,
          span: 5,
          type: 'select',
          mode: 'tags',
          options: [
            { label: '已出租', value: 1 },
            { label: '未出租', value: 0 },
          ],
        },
        {
          placeholder: '请输入标签: ',
          value: 'tags',
          name: 'tags',
          allowClear: true,
          span: 8,
          type: 'select',
          mode: 'multiple',
          options: [
            { label: '热血', color: 'gold', value: 1 },
            { label: '搞笑', color: 'lime', value: 2 },
            { label: '无聊', color: 'green', value: 3 }, 
            { label: '美食', color: 'cyan', value: 4 },
            { label: '运动', color: 'blue', value: 5 }
          ],
        },
      ],
      moduleDescription: '本管理模块是名为房屋管理，房屋用户可以在此模块管理自己发布的房屋信息，也可以查看房屋信息以及通知租客按时交租。'
      
    };
    
    this.aaa = React.createRef();
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.closeChartVisible = this.closeChartVisible.bind(this);
    this.showNewHouseBoard = this.showNewHouseBoard.bind(this);
    this.searchHandle = this.searchHandle.bind(this);
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
              data: ['电单价', '水单价', '月水费', '月电费', '总租金']
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
              data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '电单价',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '水单价',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '月水费',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '月电费',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '总租金',
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

      case 'showEditTwoTone':
        setTimeout(() => {
          this.setState({ newHouseObject: record });
          this.showNewHouseBoard(true);
        }, 100);
        
        
        
        
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
  showNewHouseBoard(flag, isNewButton) {
    if(isNewButton === true) {
      this.setState({newHouseObject: {}})
    }
    this.setState({ newHouseVisible: flag})
  }
  searchHandle() {
    let { searchData } = this.aaa.current.state
    console.log(searchData);
  }
  resetHandle() {
    console.log(this.aaa.current);
    this.aaa.current.resetHandle();
  }

  render() {
    const { columns, 
            data, 
            title, 
            tableHeight, 
            tableWidth, 
            chartVisible, 
            moduleDescription,
            address, 
            newHouseVisible,
            newHouseObject,
            filterBar } = this.state;
    

    const headerButtonArray =  [
      <Button key="1" type="primary" onClick={() => this.showNewHouseBoard(true, true)}>新建房屋</Button>,
      <Button key="3" type="primary" onClick={() => this.resetHandle()}>重置</Button>,
      <Button key="2" type="primary" onClick={() => this.searchHandle()}>搜索</Button>,
    ]


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
          ref={this.aaa}
          moduleDescription={moduleDescription}
        >
        </ListPage>
        {/* 图标弹框 */}
        <Modal
          title={`位于${address}房子近几个月的租金曲线图 :`}
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
          <NewHouse newHouseObject={newHouseObject}/>
        </Drawer>
      </div>
    )
  }
}
