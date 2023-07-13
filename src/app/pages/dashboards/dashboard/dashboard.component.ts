import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public disEdit: boolean = false;
  public data: any;
  public stats: any;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
      // this.data = [
      //   {
      //     'label': 'item1',
      //     view: { cols: 2, rows: 1, y: 0, x: 0, id: 'demo1', hasContent: true },
      //     x: 0,
      //     y: 0,
      //     rows: 1,
      //     cols: 2
      //   },
      //   {
      //     'label': 'item2',
      //     view: { cols: 2, rows: 2, y: 0, x: 2, id: 'demo2' },
      //     x: 2,
      //     y: 0,
      //     rows: 2,
      //     cols: 2
      //   },
      //   {
      //     'label': 'item3',
      //     view: { cols: 1, rows: 1, y: 0, x: 4, id: 'demo3' },
      //     x: 4,
      //     y: 0,
      //     rows: 1,
      //     cols: 1
      //   },
      //   {
      //     'label': 'item4',
      //     view: { cols: 1, rows: 1, y: 0, x: 5, id: 'demo4' },
      //     x: 5,
      //     y: 0,
      //     rows: 1,
      //     cols: 1
      //   },
      //   {
      //     'label': 'item5',
      //     view: { cols: 1, rows: 1, y: 1, x: 0, id: 'demo5' },
      //     x: 0,
      //     y: 1,
      //     rows: 1,
      //     cols: 1
      //   },
      //   {
      //     'label': 'item6',
      //     view: { cols: 1, rows: 1, y: 1, x: 1, id: 'demo6' },
      //     x: 1,
      //     y: 1,
      //     rows: 1,
      //     cols: 1
      //   },
      //   {
      //     'label': 'item7',
      //     view: { cols: 2, rows: 2, y: 1, x: 5, label: 'Min rows & cols = 2', id: 'demo7' },
      //     x: 5,
      //     y: 1,
      //     rows: 2,
      //     cols: 2
      //   },
      //   {
      //     'label': 'item8',
      //     view: { cols: 2, rows: 2, y: 0, x: 0, label: 'Max rows & cols = 2', id: 'demo8' },
      //     x: 0,
      //     y: 2,
      //     rows: 2,
      //     cols: 2
      //   }
      // ];
      // const id = this.route.snapshot.params['id'];
      this.route.queryParams.subscribe(params => {
        const id = params['id'];
        // 处理查询参数的值
        const dashboardData = localStorage.getItem('dashboard');
        if (dashboardData) {
          const list = JSON.parse(dashboardData);
          list.forEach((e: any)=> {
            if (e.title == id) {
              this.data = e.data;
            }
          })
        }
      });

      const list = localStorage.getItem("testChartsList");
      if (list) {
        this.stats = JSON.parse(list);
        console.log(JSON.parse(list))
      }

  }
}
