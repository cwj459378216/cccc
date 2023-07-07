import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListTableComponent } from '../list-table.component';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';

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
        ]
      }
    },
    {
      name: 'Stacked Line Chart',
      flag: 'assets/images/echarts/StackedLineChart.png',
      option: {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
        ]
      }
    },
    {
      name: 'Stacked Area Chart',
      flag: 'assets/images/echarts/StackedAreaChart.png',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
        ]
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
        ]
      },
    },
    {
      name: 'Stacked Horizontal Bar',
      flag: 'assets/images/echarts/StackedHorizontalBar.png',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
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
        ]
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
