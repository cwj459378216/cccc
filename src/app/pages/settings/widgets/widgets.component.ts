import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {
  public ajax: any;
  public colums: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.ajax = (dataTablesParameters: any, callback: any) => {
      this.http
        .get<any>(
          'https://l-lin.github.io/angular-datatables/data/data.json?_=1688545436972',
          // 'https://xtlncifojk.eu07.qoddiapp.com/',
          // dataTablesParameters, {}
        ).subscribe(resp => {
          // let list = [
          //   {
          //     id: 0,
          //     chart: "aplication",
          //     visualizationType: "pie chart",
          //     dataset: "omni-bro-conn",
          //     queryBody: ""
          //   },
          //   {
          //     id: 1,
          //     chart: "ip martix",
          //     visualizationType: "line chart",
          //     dataset: "omni-bro-conn",
          //     queryBody: ""
          //   }
          // ]
          let list = [];
          const testChartsList = localStorage.getItem('testChartsList');
          if (testChartsList) {
            list = JSON.parse(testChartsList);
          }
          callback({
            // recordsTotal: resp.recordsTotal,
            // recordsFiltered: resp.recordsFiltered,
            data: list
            // data: resp.data             // <-- see here
          });
        });
    }
    this.colums = [{
      title: 'Chart',
      data: 'chart'
    }, {
      title: 'Visualization type',
      data: 'visualizationType'
    },{
      title: 'Dataset',
      data: 'dataset'
    }]
  }
}
