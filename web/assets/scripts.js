window.Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };
  
  var spark1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark2 = {
    chart: {
      id: 'spark2',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
    }],
    stroke: {
      curve: 'smooth'
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    markers: {
      size: 0
    },
    colors: ['#fff'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark3 = {
    chart: {
      id: 'spark3',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  var spark4 = {
    chart: {
      id: 'spark4',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    xaxis: {
      crosshairs: {
        width: 1
      },
    },
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  }
  
  new ApexCharts(document.querySelector("#spark1"), spark1).render();
  new ApexCharts(document.querySelector("#spark2"), spark2).render();
  new ApexCharts(document.querySelector("#spark3"), spark3).render();
  new ApexCharts(document.querySelector("#spark4"), spark4).render();
  
  
  var optionsLine = {
    chart: {
      height: 328,
      type: 'line',
      zoom: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 1,
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    //colors: ["#3F51B5", '#2196F3'],
    series: [{
        name: "영어",
        data: [1, 15, 26, 20, 33, 27]
      },
      {
        name: "수학",
        data: [3, 33, 21, 42, 19, 32]
      },
      {
        name: "정보",
        data: [0, 39, 52, 11, 29, 43]
      }
    ],
    title: {
      text: '수업 이수상황',
      align: 'left',
      offsetY: 25,
      offsetX: 20
    },
    subtitle: {
      text: '수업 일정',
      offsetY: 55,
      offsetX: 20
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9
      }
    },
    grid: {
      show: true,
      padding: {
        bottom: 0
      }
    },
    labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
    xaxis: {
      tooltip: {
        enabled: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20
    }
  }
  
  var chartLine = new ApexCharts(document.querySelector('#line-adwords'), optionsLine);
  chartLine.render();
  
  var optionsCircle4 = {
    chart: {
      type: 'radialBar',
      height: 350,
      width: 380,
    },
    plotOptions: {
      radialBar: {
        size: undefined,
        inverseOrder: true,
        hollow: {
          margin: 5,
          size: '48%',
          background: 'transparent',
  
        },
        track: {
          show: false,
        },
        startAngle: -180,
        endAngle: 180
  
      },
    },
    stroke: {
      lineCap: 'round'
    },
    series: [71, 63, 77],
    labels: ['좋음', '보통', '나쁨'],
    legend: {
      show: true,
      floating: true,
      position: 'right',
      offsetX: 70,
      offsetY: 200
    },
  }
  
  var chartCircle4 = new ApexCharts(document.querySelector('#radialBarBottom'), optionsCircle4);
  chartCircle4.render();
  
  
  var optionsBar = {
    chart: {
      height: 380,
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        horizontal: false,
      },
    },
    series: [{
      name: '좋음',
      data: [14, 25, 21, 17, 12, 13, 11, 19]
    }, {
      name: '보통',
      data: [13, 23, 20, 8, 13, 27, 33, 12]
    }, {
      name: '나쁨',
      data: [11, 17, 15, 15, 21, 14, 15, 13]
    }],
    xaxis: {
      categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4'],
    },
    fill: {
      opacity: 1
    },
  
  }
  
  var chartBar = new ApexCharts(
    document.querySelector("#barchart"),
    optionsBar
  );
  
  chartBar.render();
  
  var optionsArea = {
    chart: {
      height: 380,
      type: 'area',
      stacked: false,
    },
    stroke: {
      curve: 'straight'
    },
    series: [{
        name: "영어",
        data: [11, 15, 26, 20, 33, 27]
      },
      {
        name: "수학",
        data: [32, 33, 21, 42, 19, 32]
      },
      {
        name: "정보",
        data: [20, 39, 52, 11, 29, 43]
      }
    ],
    xaxis: {
      categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2'],
    },
    tooltip: {
      followCursor: true
    },
    fill: {
      opacity: 1,
    },
  
  }
  
  var chartArea = new ApexCharts(
    document.querySelector("#areachart"),
    optionsArea
  );
  
  chartArea.render();



  
      
  var options = {
    series: [{
    name: '영어',
    data: [80, 50, 30, 40, 100, 20],
  }, {
    name: '수학',
    data: [20, 30, 40, 80, 20, 80],
  }, {
    name: '정보',
    data: [44, 76, 78, 13, 43, 10],
  }],
    chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: '수업별 이수 정도'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  yaxis: {
    stepSize: 20
  },
  xaxis: {
    categories: ['2011', '2012', '2013', '2014', '2015', '2016']
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart1"), options);
  chart.render();

  var options = {
    series: [
    {
      name: '영어',
      data: [
        {
          x: '단원1',
          y: 10
        },
        {
          x: '단원2',
          y: 60
        },
        {
          x: '단원3',
          y: 41
        }
      ]
    },
    {
      name: '수학',
      data: [
        {
          x: '단원1',
          y: 10
        },
        {
          x: '단원2',
          y: 20
        },
        {
          x: '단원3',
          y: 51
        },
        {
          x: '단원4',
          y: 30
        },
        {
          x: '단원5',
          y: 20
        },
        {
          x: '단원6',
          y: 30
        }
      ]
    },{
      name: '정보',
      data: [
        {
          x: '단원1',
          y: 10
        },
        {
          x: '단원2',
          y: 20
        },
        {
          x: '단원3',
          y: 51
        },
        {
          x: '단원4',
          y: 30
        },
        {
          x: '단원5',
          y: 20
        },
        {
          x: '단원6',
          y: 30
        }
      ]
    }  
  ],
    legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap'
  },
  title: {
    text: '과목별 세부 단원 학습률',
    align: 'center'
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart2"), options);
  chart.render();
      
  var options = {
    series: [
    {
      name: '학생1',
      data: [
        {
          x: '영어',
          y: 503,
        },
        {
          x: '수학',
          y: 580,
        },
        {
          x: '정보',
          y: 135,
        },
      ],
    },
    {
      name: '학생2',
      data: [
        {
          x: '영어',
          y: 733,
        },
        {
          x: '수학',
          y: 385,
        },
        {
          x: '정보',
          y: 715,
        },
      ],
    },
    {
      name: '학생3',
      data: [
        {
          x: '영어',
          y: 255,
        },
        {
          x: '수학',
          y: 211,
        },
        {
          x: '정보',
          y: 441,
        },
      ],
    },
    {
      name: '학생4',
      data: [
        {
          x: '영어',
          y: 428,
        },
        {
          x: '수학',
          y: 749,
        },
        {
          x: '정보',
          y: 559,
        },
      ],
    },
  ],
    chart: {
    height: 350,
    type: 'line',
  },
  plotOptions: {
    line: {
      isSlopeChart: true,
    },
  },
  tooltip: {
    followCursor: true,
    intersect: false,
    shared: true,
  },
  dataLabels: {
    background: {
      enabled: true,
    },
    formatter(val, opts) {
      const seriesName = opts.w.config.series[opts.seriesIndex].name
      return val !== null ? seriesName : ''
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
    },
  },
  xaxis: {
    position: 'bottom',
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
  },
  stroke: {
    width: [2, 3, 4, 2],
    dashArray: [0, 0, 5, 2],
    curve: 'smooth',
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart3"), options);
  chart.render();

  var options = {
    series: [
    {
      name: '수학',
      data: [
        {
          x: '학생1',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-08').getTime()
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-02').getTime(),
            new Date('2019-03-05').getTime()
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-07').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-03').getTime(),
            new Date('2019-03-09').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-08').getTime(),
            new Date('2019-03-11').getTime()
          ]
        },
        {
          x: 'Validation',
          y: [
            new Date('2019-03-11').getTime(),
            new Date('2019-03-16').getTime()
          ]
        },
        {
          x: '학생1',
          y: [
            new Date('2019-03-01').getTime(),
            new Date('2019-03-03').getTime()
          ],
        }
      ]
    },
    {
      name: '영어',
      data: [
        {
          x: '학생1',
          y: [
            new Date('2019-03-02').getTime(),
            new Date('2019-03-05').getTime()
          ]
        },
        {
          x: 'Test',
          y: [
            new Date('2019-03-06').getTime(),
            new Date('2019-03-16').getTime()
          ],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-10').getTime(),
              strokeColor: '#CD2F2A'
            }
          ]
        },
        {
          x: 'Code',
          y: [
            new Date('2019-03-03').getTime(),
            new Date('2019-03-07').getTime()
          ]
        },
        {
          x: 'Deployment',
          y: [
            new Date('2019-03-20').getTime(),
            new Date('2019-03-22').getTime()
          ]
        },
        {
          x: '학생1',
          y: [
            new Date('2019-03-10').getTime(),
            new Date('2019-03-16').getTime()
          ]
        }
      ]
    },
    {
      name: '정보',
      data: [
        {
          x: 'Code',
          y: [
            new Date('2019-03-10').getTime(),
            new Date('2019-03-17').getTime()
          ]
        },
        {
          x: 'Validation',
          y: [
            new Date('2019-03-05').getTime(),
            new Date('2019-03-09').getTime()
          ],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-07').getTime(),
              strokeColor: '#CD2F2A'
            }
          ]
        },
      ]
    }
  ],
    chart: {
    height: 350,
    type: 'rangeBar'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%'
    }
  },
  xaxis: {
    type: 'datetime'
  },
  stroke: {
    width: 1
  },
  fill: {
    type: 'solid',
    opacity: 0.6
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart4"), options);
  chart.render();