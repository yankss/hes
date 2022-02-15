import React, { Component } from 'react';
import { List, Avatar, Space, Skeleton, Divider } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './index.css';

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      data: [],
      setLoading: false,
      loading: false,
    }
    this.loadMoreData = this.loadMoreData.bind(this);
  }
  
  loadMoreData() {
    const { loading, data } = this.state;
    if (loading) {
      return;
    }
    this.setState({ loading: true });
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {
        this.setState({ data: [...data, ...body.results] })
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

    this.setState({ listData });
    this.loadMoreData();
  }

  render() {
    const { data } = this.state;
    const { tabKey } = this.props;
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    return (
      <div>
        {/* 房源列表 */}
        <div
          id="scrollableDiv"
          style={{
            height: 610,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={() => this.loadMoreData()}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={item => (
                tabKey === '1' ?
                (<List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
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
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>)
                : tabKey === '2' ?
                (
                  <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                  <div>Content</div>
                </List.Item>
                ) : null
                
                
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}
