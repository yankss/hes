import React, { Component } from 'react'
import * as echarts from 'echarts';
import ListPage from '../../../widgets/list-page';
import { Tag, Space, Button, Tooltip, Popconfirm, message, Modal } from 'antd';
import { FundTwoTone, DeleteTwoTone, BulbTwoTone } from '@ant-design/icons';
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
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <Button type="link">{text}</Button>,
          align: 'center'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
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
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
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
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              {
                record.actionImg.map((item, index) => {
                  if(index === 0) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to show this task?"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          onClick={() => record.actionMethod[index](record)}
                        >
                          {item}
                        </Button>
                      </Popconfirm>
                      
                    )
                  }
                  if(index === 1) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to delete this task?"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          onClick={() => record.actionMethod[index](record)}
                        >
                          {item}
                        </Button>
                      </Popconfirm>
                    )
                  }
                  if(index === 2) {
                    return (
                      <Popconfirm
                        key={index}
                        title="Are you sure to notice this task?"
                        onConfirm={this.confirm}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          onClick={() => record.actionMethod[index](record)}
                        >
                          {item}
                        </Button>
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
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser', 'houseManagement'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '4',
          name: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '5',
          name: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '6',
          name: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '7',
          name: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
        {
          key: '8',
          name: '小成',
          age: 32,
          address: '钟落潭广新路388号',
          tags: ['cool', 'teacher', '稳重'],
          actionImg: [<FundTwoTone />, <DeleteTwoTone />, <BulbTwoTone />],
          actionMethod: [
            this.showFundTwoTone,
            this.showDeleteTwoTone,
            this.showBulbTwoTone
          ]
        },
      ],
      title: '房屋管理',
      tableHeight: 460,
      chartVisible: false,
      chartOptions: {},
    };
    
    this.showFundTwoTone = this.showFundTwoTone.bind(this);
    this.showDeleteTwoTone = this.showDeleteTwoTone.bind(this);
    this.showBulbTwoTone = this.showBulbTwoTone.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
    this.closeChartVisible = this.closeChartVisible.bind(this);
  }
  


  confirm(e) {
    message.success('Click on Yes');
    this.setState({ chartVisible: true })
    setTimeout(() => {
      if(this.state.chartVisible === true) {
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
      }
    }, 0);
  }
  cancel(e) {
    message.error('Click on No');
  }
  showFundTwoTone(text) {
    console.log('show');
    console.log('text', text);
  }
  showDeleteTwoTone(text) {
    console.log('delete');
    console.log('text', text);
  }
  showBulbTwoTone(text) {
    console.log('bulb');
    console.log('text', text);
  }
  closeChartVisible() {
    this.setState({ chartVisible: false });
  }


  render() {
    const { columns, data, title, tableHeight, chartVisible } = this.state;

    return (
      <div className="my-content">
        <ListPage 
          columns={columns} 
          data={data} 
          title={title}
          tableHeight={tableHeight}
        >
        </ListPage>
        {/* 图标弹框 */}
        <Modal
          title="Modal 400px width"
          centered
          onCancel={this.closeChartVisible}
          visible={chartVisible}
          width={1100}
        >
          <div id='main' style={{width: '1000px', height: '700px'}}></div>
        </Modal>
      </div>
    )
  }
}
