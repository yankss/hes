import React, { Component } from 'react'
import * as echarts from 'echarts';
import './index.css'

var setTimeInterval;

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.renderMainChart = this.renderMainChart.bind(this);
    this.renderTitleChart = this.renderTitleChart.bind(this);
    this.titleInterval = this.titleInterval.bind(this);
  }


  componentDidMount() {
    this.renderMainChart()
    this.renderTitleChart();
    this.titleInterval();
    
  }
  componentWillUnmount() {
    clearInterval(setTimeInterval);
  }

 

  renderMainChart() {
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      backgroundColor: '#2c343c',
      title: {
        text: '房屋标签分析图',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }

  renderTitleChart() {
    let app = {};

    let chartDom = document.getElementById('Dynamic');
    let myChart = echarts.init(chartDom);
    let option;

    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        now = new Date(+now - 2000);
      }
      return res;
    })();
    const categories2 = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(10 - len - 1);
      }
      return res;
    })();
    const data = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();
    const data2 = (function () {
      let res = [];
      let len = 0;
      while (len < 10) {
        res.push(+(Math.random() * 10 + 5).toFixed(1));
        len++;
      }
      return res;
    })();
    option = {
      title: {
        text: 'Dynamic Data'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: categories
        },
        {
          type: 'category',
          boundaryGap: true,
          data: categories2
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: 'Price',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: 'Order',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: 'Dynamic Bar',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data
        },
        {
          name: 'Dynamic Line',
          type: 'line',
          data: data2
        }
      ]
    };
    app.count = 11;
    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
      data.shift();
      data.push(Math.round(Math.random() * 1000));
      data2.shift();
      data2.push(+(Math.random() * 10 + 5).toFixed(1));
      categories.shift();
      categories.push(axisData);
      categories2.shift();
      categories2.push(app.count++);
      myChart.setOption({
        xAxis: [
          {
            data: categories
          },
          {
            data: categories2
          }
        ],
        series: [
          {
            data: data
          },
          {
            data: data2
          }
        ]
      });
    }, 2100);

    option && myChart.setOption(option);
  }
  titleInterval() {
    setTimeInterval = setInterval(() => {
      const show = document.querySelector('span[data-show]')
      
      let next = show.nextElementSibling
      if(next === null) {
        next = document.querySelector('.titleSpan:first-child')
      }
      const up = document.querySelector('span[data-up]')
      if (up) {
        up.removeAttribute('data-up')
      }
    
      show.removeAttribute('data-show')
      show.setAttribute('data-up', '')
      next.setAttribute('data-show', '')
    
    }, 2000)
  }


  render() {
    return (
      <div>
        <div>
          <h4 >
            在这里，你可以观察的
            <div className='mask'>
              <span className='titleSpan' data-show>热门房屋种类</span>
              <span className='titleSpan'>其他房屋的租金曲线</span>
              <span className='titleSpan'>a concert hall.</span>
              <span className='titleSpan'>an arcade.</span>
            </div>
          </h4>
        </div>
        <div id='Dynamic' style={{width: '100%', height: "60vh"}}></div>
        <div id='main' style={{width: '100%', height: '600px'}}></div>
      </div>
    )
  }
}
