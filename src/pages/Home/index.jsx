import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
import menuList from '../../config/menu'
import './index.css'
import homeStore from './home-store';


@inject('homeStore')
@observer
export default class Home extends Component {
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

    const cardImgs = require.context('./imgs', true, /-card\.jpg$/);
    console.log(cardImgs.keys());
  }

  render() {
    console.log(this.props);
    return (
      <div className="home-container">
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
