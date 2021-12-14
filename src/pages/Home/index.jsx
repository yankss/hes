import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import menuList from '../../config/menu'
import { Card, Button, Typography } from 'antd';
import './index.css'
import homeStore from './home-store';
import ball1 from '../../assets/imgs/balls/ball01.png';
import ball2 from '../../assets/imgs/balls/ball02.png';
import ball3 from '../../assets/imgs/balls/ball03.png';
import ball4 from '../../assets/imgs/balls/ball04.png';
import ball5 from '../../assets/imgs/balls/ball05.png';

const { Meta } = Card;
const { Title, Paragraph, Text, Link } = Typography;

@inject('homeStore')
@observer
 class index extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
    }
  }

  componentDidMount() {
    const rows = document.querySelectorAll('ul li');
    homeStore.setRows(rows);
    const clientH = document.documentElement.clientHeight;
    const clientW = document.documentElement.clientWidth;
    let imgs = document.querySelectorAll('#homeShow img');
    imgs = Array.from(imgs);
    document.addEventListener('mousemove', (e) => {
      const eeee = window.event;
      const mouseX = eeee.screenX;
      const mouseY = eeee.screenY;
      let moveX = 0;
      let moveY = 0;
      moveX = ((clientW / 2) - mouseX) / 90;
      moveY = ((clientH / 2) - mouseY) / 90;
      imgs.map((imgBall, index) => {
        imgBall.style.setProperty('--moveX', moveX);
        imgBall.style.setProperty('--moveY', moveY);
        return imgBall;
      });
    }, { passive: true });
    setTimeout(() => {
      this.setState({ loading: false});
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout();
    
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="home-container">
        <div className="placeholder" id="homeShow">
          <img src={ball1} alt="ball" />
          <img src={ball2} alt="ball" />
          <img src={ball3} alt="ball" />
          <img src={ball4} alt="ball" />
          <img src={ball5} alt="ball" />
          <Typography className='description'>
            <Title>Introduction</Title>
            <Paragraph>
              In the process of internal desktop applications development, many different design specs and
              implementations would be involved, which might cause designers and developers difficulties and
              duplication and reduce the efficiency of development.
            </Paragraph>
            <Paragraph>
              After massive project practice and summaries, Ant Design, a design language for background
              applications, is refined by Ant UED Team, which aims to <Text strong>
                uniform the user interface specs for internal background projects, lower the unnecessary
                cost of design differences and implementation and liberate the resources of design and
                front-end development</Text>.
            </Paragraph>
            <Title level={2}>Guidelines and Resources</Title>
            <Paragraph>
              We supply a series of design principles, practical patterns and high quality design resources
              (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people create their product
              prototypes beautifully and efficiently.
            </Paragraph>

            <Paragraph>
              <ul>
                <li>
                  <Link href="/docs/spec/proximity">Principles</Link>
                </li>
                <li>
                  <Link href="/docs/spec/overview">Patterns</Link>
                </li>
                <li>
                  <Link href="/docs/resources">Resource Download</Link>
                </li>
              </ul>
            </Paragraph>

            <Paragraph>
              Press <Text keyboard>Esc</Text> to exit...
            </Paragraph>
            </Typography>
        </div>
        <div className="home-main-container">
          {
            menuList.map((menuItem, index1) => {
              return menuItem.path ? (
                <a href={`#${menuItem.path}`} key={index1}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="item-container"
                    loading={loading}
                  >
                    <Button type="link">{menuItem.label}</Button>
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
                </a>
                // <div className="item-container" key={index1}>
                //   <a href={`#${menuItem.path}`} >
                //     {menuItem.label}
                //   </a>
                // </div>
              )
              : (
                menuItem.children.map((itemChild, index2) => (
                  <a href={`#${itemChild.path}`} key={index2}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    className="item-container"
                    loading={loading}
                  >
                    <Button type="link">{itemChild.label}</Button>
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>
                  </a>
                  // <div className="item-container" key={index2}>
                  //   <a href={`#${itemChild.path}`} >
                  //     {itemChild.label}
                  //   </a>
                  // </div>
                ))
              )
            })
          }
        </div>
        
        {/* <ul>
          {
            menuList.map((menuItem, index1) => {
              return menuItem.path ? (
                <li className="container" key={index1}>
                  <div className="mainContainer">
                    <a href={`#${menuItem.path}`}>
                      {menuItem.label}
                    </a>
                  </div>
                  <div className="containerIntroduce" />
                </li>
              )
              : (
                menuItem.children.map((itemChild, index2) => (
                  <li className="container" key={index2}>
                    <div className="mainContainer">
                      <a href={`#${itemChild.path}`}>
                        {itemChild.label}
                      </a>
                    </div>
                    <div className="containerIntroduce" />
                  </li>
                ))
              )
            })
          }
        </ul> */}
      </div>
    )
  }
}

export default index;