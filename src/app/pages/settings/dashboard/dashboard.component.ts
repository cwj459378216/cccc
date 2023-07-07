import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public ajax: any;
  public colums: any;
  constructor(private http: HttpClient, private router: Router) { }

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
          //     title: "aplication",
          //     status: "true",
          //     modified: "2023-01-02 09:20:10",
          //     data: ""
          //   },
          //   {
          //     id: 1,
          //     title: "ip martix",
          //     status: "false",
          //     modified: "2023-01-02 08:10:10",
          //     data: ""
          //   }
          // ]
          const dashboard =  localStorage.getItem("dashboard");
          console.log(dashboard)
          let list = [];
          if (dashboard) {
            list = JSON.parse(dashboard);
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
      title: 'Title',
      data: 'title'
    }, {
      title: 'Status',
      data: 'status'
    }, {
      title: 'Modified',
      data: 'modified'
    }]
  }

  modalOpen(event: any) {
    this.router.navigate(['/settings/dashboard/add']);
  }

  edit(event: any) {
    alert(2)
  }

  delete(event: any) {
    alert(3)
    event.currentTarget.getAttribute('data-id');
  }
}
