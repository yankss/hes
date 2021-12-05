import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import menuList from '../../config/menu'
import './index.css'
import homeStore from './home-store';
import ball1 from '../../assets/imgs/balls/ball01.png';
import ball2 from '../../assets/imgs/balls/ball02.png';
import ball3 from '../../assets/imgs/balls/ball03.png';
import ball4 from '../../assets/imgs/balls/ball04.png';
import ball5 from '../../assets/imgs/balls/ball05.png';


@inject('homeStore')
@observer
 class index extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
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
      // console.log(moveX, moveY);
      imgs.map((imgBall) => {
        imgBall.style.setProperty('--moveX', moveX);
        imgBall.style.setProperty('--moveY', moveY);
      });
    });

    // const cardImgs = require.context('./imgs', true, /-card\.jpg$/);
    // console.log(cardImgs.keys());
  }

  render() {
    console.log(this.props);
    return (
      <div className="home-container">
        <div className="placeholder" id="homeShow">
          <img src={ball1} alt="ball" />
          <img src={ball2} alt="ball" />
          <img src={ball3} alt="ball" />
          <img src={ball4} alt="ball" />
          <img src={ball5} alt="ball" />
        </div>
        <ul>
          {
            menuList.map(menuItem => {
              return menuItem.path ? (
                <li className="container">
                  <div className="mainContainer">
                    <a href={`#${menuItem.path}`}>
                      {menuItem.label}
                    </a>
                  </div>
                  <div className="containerIntroduce" />
                </li>
              )
              : (
                menuItem.children.map((itemChild) => (
                  <li className="container">
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
        </ul>
      </div>
    )
  }
}

export default index;