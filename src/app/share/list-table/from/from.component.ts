import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListTableComponent } from '../list-table.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { data1, data2, graph, graph1 } from './testData';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.scss']
})
export class FromComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  stateGroups: any[] = [
    {
      letter: 'C',
      names: ['conn', 'conn-realtime', 'conn-pcap'],
    },
    {
      letter: 'H',
      names: ['http', 'http-realtime', 'http-pcap'],
    },
    // {
    //   letter: 'D',
    //   names: ['Delaware'],
    // },
    // {
    //   letter: 'F',
    //   names: ['Florida'],
    // },
    // {
    //   letter: 'G',
    //   names: ['Georgia'],
    // },
    // {
    //   letter: 'H',
    //   names: ['Hawaii'],
    // },
    // {
    //   letter: 'I',
    //   names: ['Idaho', 'Illinois', 'Indiana', 'Iowa'],
    // },
    // {
    //   letter: 'K',
    //   names: ['Kansas', 'Kentucky'],
    // },
    // {
    //   letter: 'L',
    //   names: ['Louisiana'],
    // },
    // {
    //   letter: 'M',
    //   names: [
    //     'Maine',
    //     'Maryland',
    //     'Massachusetts',
    //     'Michigan',
    //     'Minnesota',
    //     'Mississippi',
    //     'Missouri',
    //     'Montana',
    //   ],
    // },
    // {
    //   letter: 'N',
    //   names: [
    //     'Nebraska',
    //     'Nevada',
    //     'New Hampshire',
    //     'New Jersey',
    //     'New Mexico',
    //     'New York',
    //     'North Carolina',
    //     'North Dakota',
    //   ],
    // },
    // {
    //   letter: 'O',
    //   names: ['Ohio', 'Oklahoma', 'Oregon'],
    // },
    // {
    //   letter: 'P',
    //   names: ['Pennsylvania'],
    // },
    // {
    //   letter: 'R',
    //   names: ['Rhode Island'],
    // },
    // {
    //   letter: 'S',
    //   names: ['South Carolina', 'South Dakota'],
    // },
    // {
    //   letter: 'T',
    //   names: ['Tennessee', 'Texas'],
    // },
    // {
    //   letter: 'U',
    //   names: ['Utah'],
    // },
    // {
    //   letter: 'V',
    //   names: ['Vermont', 'Virginia'],
    // },
    // {
    //   letter: 'W',
    //   names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    // },
  ];

  stateGroupOptions: Observable<any[]>;
  // option group
  stateForm = this._formBuilder.group({
    stateGroup: '',
  });

  colors: any[] = [
    '#4e91f0',
    '#c097f8',
    '#2cc3b4',
    '#ff9514',
   ]
  // state
  stateCtrl = new FormControl('');
  filteredStates: Observable<any[]>;
  states: any[] = [
    {
      name: 'Basic Line Chart',
      flag: 'assets/images/echarts/BasicLineChart.png',
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Stacked Line Chart',
      flag: 'assets/images/echarts/StackedLineChart.png',
      option: {
        tooltip: {
          trigger: 'axis'
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
        ],
        color: this.colors
      }
    },
    {
      name: 'Stacked Area Chart',
      flag: 'assets/images/echarts/StackedAreaChart.png',
      option: {
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Basic Bar',
      flag: 'assets/images/echarts/BasicBar.png',
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ],
        color: this.colors
      },
    },
    {
      name: 'Stacked Horizontal Bar',
      flag: 'assets/images/echarts/StackedHorizontalBar.png',
      option: {
        legend: {},
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Doughnut Chart',
      flag: 'assets/images/echarts/DoughnutChart.png',
      option: {
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Hide Overlapped Label',
      flag: 'assets/images/echarts/HideOverlappedLabel.png',
      option: {
        legend: [
          {
            data: graph.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'none',
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            labelLayout: {
              hideOverlap: true
            },
            scaleLimit: {
              min: 0.4,
              max: 2
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            }
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Les Miserables',
      flag: 'assets/images/echarts/LesMiserables.png',
      option: {
        legend: [
          {
            data: graph1.categories.map(function (a) {
              return a.name;
            })
          }
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true
            },
            data: graph1.nodes,
            links: graph1.links,
            categories: graph1.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            }
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'From Left to Right Tree',
      flag: 'assets/images/echarts/FromLeftToRightTree.png',
      option: {
        series: [
          {
            type: 'tree',
            data: [data1],
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Sankey with Levels Setting',
      flag: 'assets/images/echarts/SankeywithLevelsSetting.png',
      option: {
        series: [
          {
            type: 'sankey',
            data: data2.nodes,
            links: data2.links,
            emphasis: {
              focus: 'adjacency'
            },
            levels: [
              {
                depth: 0,
                itemStyle: {
                  color: '#fbb4ae'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 1,
                itemStyle: {
                  color: '#b3cde3'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 2,
                itemStyle: {
                  color: '#ccebc5'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              },
              {
                depth: 3,
                itemStyle: {
                  color: '#decbe4'
                },
                lineStyle: {
                  color: 'source',
                  opacity: 0.6
                }
              }
            ],
            lineStyle: {
              curveness: 0.5
            }
          }
        ],
        color: this.colors
      }
    },
    {
      name: 'Stage Speed Gauge',
      flag: 'assets/images/echarts/StageSpeedGauge.png',
      option:  {
        series: [
          {
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 40,
              fontSize: 20
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} km/h',
              color: 'inherit'
            },
            data: [
              {
                value: 70
              }
            ]
          }
        ],
        color: this.colors
      }
    }
  ];

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<FromComponent>,
    private _formBuilder: FormBuilder,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ListTableComponent,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.states.filter((state) =>
      state.name.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit() {
     // option group
     this.stateGroupOptions = this.stateForm
     .get('stateGroup')!
     .valueChanges.pipe(
       startWith(''),
       map((value) => this._filterGroup(value || ''))
     );
  }

    // option group
    private _filterGroup(value: string): any[] {
      if (value) {
        return this.stateGroups
          .map((group) => ({
            letter: group.letter,
            names: _filter(group.names, value),
          }))
          .filter((group) => group.names.length > 0);
      }

      return this.stateGroups;
    }

  doAction(): void {
    this.states.forEach( e => {
      console.log(this.local_data.chart)
      if (e.name == this.local_data.visualizationType) {
        this.local_data.option = e.option;
        this.local_data.img = e.flag
        this.local_data.enable = true;
        this.local_data.title = this.local_data.chart;
        this.local_data.type = "echarts";
        this.local_data.color = "primary";
      }
    })
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};
