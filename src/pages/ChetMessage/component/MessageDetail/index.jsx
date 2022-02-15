import React, { Component, } from 'react'
import { List, Avatar, Skeleton, Button, Badge, Carousel } from 'antd';
import { LikeOutlined, StarOutlined } from '@ant-design/icons';
import './index.css'

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


export default class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toplicData: [],
      initLoading: true
    }
    this.onClickPublisher = this.onClickPublisher.bind(this);
  }

  componentDidMount() {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let result = res.results;
        result = result.map((item, index) => {
          item.avatar = item.picture.large
          return item;
        })
        console.log('result', result);
        this.setState({
          initLoading: false,
          data: result,
          commitListData: result,
        }, () => {
          let data = [];
          for (let i = 0; i < 1; i++) {
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
          this.setState({ toplicData: data});
        });
      });
    
  }

  componentWillUnmount() {
    clearTimeout();
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      commitListData: this.state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
      ),
    });
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const data = this.state.data.concat(res.results);
        this.setState(
          {
            data,
            commitListData: data,
            loading: false,
          },
          () => {
            window.dispatchEvent(new Event('resize'));
          },
        );
      });
  };

  commit(listItem) {
    const commemtName = listItem.name.last
    this.props.comment(commemtName)
  }
  onClickPublisher(listItem) {
    const commentName = listItem.title;
    this.props.comment(commentName);
  }

  render() {
    const { toplicData,  commitListData,  initLoading, loading } = this.state;

    const contentStyle = {
      height: '160px',
      color: '#fff',
      lineHeight: '160px',
      textAlign: 'center',
      background: '#364d79',
      width: '250px',
      margin: 0
    };

    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

      
    return (
      <div>
        {/* 话题头 */}
        <List
          itemLayout="vertical"
          size="large"
          pagination={false}
          dataSource={toplicData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <div>
                  {/* 轮播图 */}
                  <Carousel effect="fade" autoplay>
                    <div style={{width: '250px'}}>
                      <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    </div>
                    <div style={{width: '250px'}}>
                      <h3 style={contentStyle}>1</h3>
                    </div>
                    <div style={{width: '250px'}}>
                      <h3 style={contentStyle}>2</h3>
                    </div>
                  </Carousel>
                  <div className='interactive-bar'>
                    <Button icon={<StarOutlined/>}>111</Button>
                    <Button icon={<LikeOutlined/>}>222</Button>
                  </div>
                </div>
                
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Button onClick={()=>this.onClickPublisher(item)} type='link'>{item.title}</Button>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        {/* 话题评论 */}
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={commitListData}
          renderItem={item => (
            <List.Item
              actions={[
                <Button key="list-loadmore-edit" onClick={() => this.commit(item)}>commit</Button>,
                <Badge count={8} color="cyan">
                  <Button key="list-loadmore-more">more</Button>
                </Badge>
                
              ]}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
