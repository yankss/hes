import React, { Component } from 'react'
import { BackTop, List, Avatar, Button, PageHeader, Tag, Drawer, Space, Input, Select, DatePicker, Row, Col } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment';
import MessageDetail from './component/MessageDetail'
import NewTopic from './component/NewTopic';
import * as topicApi from '../../api/topicApi';
import './index.css'


const { TextArea } = Input;
const {Option} = Select;
const { RangePicker } = DatePicker;
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      newTopicVisible: false,
      messageBoardVisible: false,
      commitObject: 'xxx',
      tagChildren: [
        { label: '热血', color: 'gold', value: 1 },
        { label: '搞笑', color: 'lime', value: 2 },
        { label: '无聊', color: 'green', value: 3 }, 
        { label: '美食', color: 'cyan', value: 4 },
        { label: '运动', color: 'blue', value: 5 }
      ],
      searchObject: {},
      commentContainer: ''
    };
    this.newTopic = React.createRef();
    this.comment = this.comment.bind(this);
    this.tagChange = this.tagChange.bind(this);
    this.publisherChange = this.publisherChange.bind(this);
    this.topicChange = this.topicChange.bind(this);
    this.showNewTopicBoard = this.showNewTopicBoard.bind(this);
    this.dateChange = this.dateChange.bind(this);
  }
  showMessageBoard(flag, listItem) {
    this.setState({ messageBoardVisible: flag})
    if(listItem) {
      this.setState({ commitObject: listItem.title || 'xxx'})
    }
  }

  showNewTopicBoard(flag) {
    this.setState({ newTopicVisible: flag});
  }

  comment(co) {
    this.setState({ commitObject: co})
  }
  tagChange(value, option) {
    let searchObject = {};
    option = option.map((item, index) => {
      return item.value;
    })
    searchObject.tagArr = option;
    searchObject = Object.assign(this.state.searchObject, searchObject);
    this.setState({searchObject});
  }
  publisherChange(value) {
    let searchObject = {};
    searchObject.author = value;
    searchObject = Object.assign(this.state.searchObject, searchObject);
    this.setState({searchObject});
  }
  topicChange(value) {
    let searchObject = {};
    searchObject.topic = value;
    searchObject = Object.assign(this.state.searchObject, searchObject);
    this.setState({searchObject});
  }
  dateChange(dates,dateString) {
    let searchObject = {};
    searchObject.date = dates;
    searchObject.startDate = dateString[0];
    searchObject.endDate = dateString[1];
    searchObject = Object.assign(this.state.searchObject, searchObject);
    this.setState({searchObject});
  }
  searchHandle() {
    let {date, ...searchObject} = this.state.searchObject
  }
  resetHandle() {
    let searchObject = {};
    this.setState({searchObject})
  }
  sentComment = () => {
    let { commentContainer } = this.state;
    this.setState({sureCommentContainer: commentContainer})
  }
  commentContainerChange = (e) => {
    this.setState({commentContainer: e.target.value})
  }
  resetCommentContainer = () => {
    this.setState({sureCommentContainer: undefined})
  }
  sumbitHandle = () => {
    let formData = this.newTopic.current.state.formData
    console.log(sessionStorage.getItem('uid'), sessionStorage.getItem('username'));
    formData.tag = formData.tag.join('、')
    formData.uid = sessionStorage.getItem('uid');
    formData.username = sessionStorage.getItem('username');
    formData.CreatedUser = sessionStorage.getItem('username');
    topicApi.newTopic(formData).then(res => {
        if(res.state === 200) {
            console.log(res);
        }
    })

  }

  componentDidMount() {
    let data = [];
    for (let i = 0; i < 4; i++) {
      data.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }
    this.setState({listData: data});

    
  }
  

  render() {
    const { listData
          , initLoading
          , loading
          , messageBoardVisible
          , commitObject
          , tagChildren
          , newTopicVisible
          , searchObject
          , commentContainer
          ,sureCommentContainer  } = this.state;

    function tagRender(props) {
      const { value, closable, onClose, label } = props;
      let color = 
      value === 1 ? 'gold'
      : value === 2 ? 'lime'
      : value === 3 ? 'green'
      : value === 4 ? 'cyan'
      : 'blue'
      const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color={color}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 , fontSize: '.7rem'}}
        >
          {label}
        </Tag>
      );
    }

    const style = {
      height: 40,
      width: 40,
      lineHeight: '40px',
      borderRadius: '50%',
      backgroundColor: '#1088e9',
      color: '#fff',
      textAlign: 'center',
      fontSize: 14,
    };

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 44,
            lineHeight: '32px',
            marginBottom: '12px',
          }}
        >
          <Button onClick={this.onLoadMore} style={{marginBottom: '12px'}}>loading more</Button>
          <BackTop visibilityHeight={100}>
            <div style={style}>UP</div>
          </BackTop>
        </div>
      ) : null;

    return (
      <div className="chetMessage-page">
        <PageHeader
          title="留言板"
          className="site-page-header"
          tags={<Tag color="blue">Running</Tag>}
          extra={[
            <Button key="3" type="primary" style={{marginLeft: '20px'}} onClick={() => this.showNewTopicBoard(true)}>
              新建话题
            </Button>,
            <Button key="1" type="primary" style={{marginLeft: '20px'}} onClick={() => this.searchHandle()}>
              搜索
            </Button>,
            <Button key="2" type="primary" style={{marginLeft: '20px'}} onClick={() => this.resetHandle()}>
              重置
            </Button>,
          ]}
        >
        </PageHeader>
        <Row>
          <Col span={24}>
            <div className='fiter-bar'>
              <Select
                mode="multiple"
                showArrow
                value={searchObject.tagArr}
                style={{float: 'left', marginRight: '20px', width: '50%'}}
                allowClear={true}
                placeholder="请输入标签 ："
                tagRender={tagRender}
                onChange={this.tagChange}
                options={tagChildren}
              >
              </Select>
              <Select
                style={{float: 'left', marginRight: '20px', width: '20%'}}
                showSearch
                value={searchObject.author}
                allowClear={true}
                placeholder="请输入作者："
                onChange={(value) => this.publisherChange(value)}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              <Select
                style={{float:  'left', width: '20%'}}
                showSearch
                value={searchObject.topic}
                allowClear={true}
                placeholder="请输入话题："
                onChange={(value) => this.topicChange(value)}
                optionFilterProp="children"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
              <RangePicker
                style={{ width: '300px', marginLeft: '20px'}}
                value={searchObject.date}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={this.dateChange}
              />
            </div>
          </Col>
        </Row>

        {/* 列表内容 */}
        <List
          className="list-container"
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={listData}
          loadMore={loadMore}
          renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <Button icon={<StarOutlined/>} >156</Button>,
              <Button icon={<LikeOutlined/>} >143</Button>,
              <Button icon={<MessageOutlined/>} onClick={() => this.showMessageBoard(true, item)}>2</Button>
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={ <Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}<Tag style={{ marginLeft: '10px', fontSize: '18px'}} color='blue'>运动</Tag></a>}
              description={item.description}
            />
            <div style={{fontSize: '16px'}}>{item.content}</div>
          </List.Item>
          )}
        />
        {/* 评论区抽屉  */}
        <Drawer
          title={`话题详情`}
          placement="right"
          size={'large'}
          onClose={() => this.showMessageBoard(false)}
          visible={messageBoardVisible}
          closable={false}
          destroyOnClose={true}
          getContainer={false}
          footer={
            <Space className='footer-container'>
              <h3>回复 : <Tag style={{fontSize: '16px'}} color="geekblue">{commitObject}</Tag></h3>
              <TextArea 
                placeholder="说说你的观点和看法..." 
                showCount maxLength={100} 
                style={{ height: 60, width: 600}}
                allowClear={true}
                value={commentContainer}
                onChange={this.commentContainerChange}
              />
              <Button onClick={this.sentComment}>发送</Button>
            </Space>
          }
        >
          <div>
            <MessageDetail 
              comment={this.comment}
              sureCommentContainer={sureCommentContainer}
              resetCommentContainer={this.resetCommentContainer}
            />
          </div>
        </Drawer>

        {/* NewTopic抽屉 */}
        <Drawer
          title="新建一个话题"
          width={720}
          onClose={() => this.showNewTopicBoard(false)}
          visible={newTopicVisible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={() => this.showNewTopicBoard(false)}>取消</Button>
              <Button onClick={() => this.sumbitHandle()} type="primary">
                提交
              </Button>
            </Space>
          }
        >
          <NewTopic ref={this.newTopic}/>
        </Drawer>
      </div>
    )
  }
}
