import {data, getValue, getSum} from './data.js'



var myChart = echarts.init(document.getElementById('main'), null, {
  width: 739,
  height: 400,
});

let option = {
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  tooltip: {
    formatter: function (param) {
      return param.name + '<br>' + (param.data.coord || '');
    }
  },
  dataset: {
    source: data
  },
  // title: {
  //   text: 'Проекты в программах и вне программ',
  //   textStyle: {
  //     fontFamily: 'Inter',
  //     fontWeight: '600',
  //     fontSize: 16,
  //     lineHeight: 24,
  //   },
  //   subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
  //   itemGap: 8,
  // },
  legend: {
    icon: 'circle',
    itemGap: 18,
    textStyle: {
      color: '#00203399',
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
    },
    bottom: 10,
  },
  xAxis: {
    type: 'category',
    data: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь'],
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed'
      }
    },
    axisLabel: {
      show: true,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
    },
    splitLine: {
      show: false
    },
    axisLine: {
      show: true 
    },
    axisTick: {
      show: true,
    },
    position: 'left',
  },
  series: [
    {
      id: 'x',
      name: 'В программе ЦП',
      type: 'bar',
      stack: 'In',
      color: '#56B9F2',
      barWidth: '34px',
      barCategoryGap: '20%',
      emphasis: {
        focus: 'none'
      },
      data: getValue(data, 'В программе ЦП')
    },
    {
      name: 'В программе ИТ',
      type: 'bar',
      stack: 'In',
      color: '#0078D2',
      barWidth: '34px',
      label: {
        show: true,
        position: 'top',
        formatter: function(params) {
          let list = []
          data.forEach(el => {
            if (el.period == params.name && el.name == 'В программе ЦП') {
               list.push(el.value + params.data)
            }
          })
          for (const i of list) {
            return i
          }
        }
      },
      emphasis: {
        focus: 'none'
      },
      data: getValue(data, 'В программе ИТ')
    },
    {
      name: 'Вне программ ЦП',
      type: 'bar',
      stack: 'Out',
      color: '#22C38E',
      barWidth: '34px',
      emphasis: {
        focus: 'none'
      },
      data: getValue(data, 'Вне программ ЦП')
    },
    {
      name: 'Вне программ ИТ',
      type: 'bar',
      stack: 'Out',
      color: '#00724C',
      barWidth: '34px',
      label: {
        show: true,
        position: 'top',
        formatter: function(params) {
          let list = []
          data.forEach(el => {
            if (el.period == params.name && el.name == 'Вне программ ЦП') {
               list.push(el.value + params.data)
            }
          })
          for (const i of list) {
            return i
          }
        },
      },
      emphasis: {
        focus: 'none'
      },
      data: getValue(data, 'Вне программ ИТ')
    },
  ]
};

myChart.setOption(option);

