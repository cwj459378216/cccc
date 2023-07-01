import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';

@Component({
    selector: 'smart-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListTableComponent {
  dtOptions: DataTables.Settings = {};
  dtElement: DataTableDirective;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  ngOnInit(): void {
    const self = this;
    this.dtOptions = {
      ajax: 'https://l-lin.github.io/angular-datatables/data/data.json?_=1688196379486',
      dom: 'Rrt<\'row mb-3 pdf-wrapper\'<\'col-sm-6\'><\'col-sm-6 pdf-content d-flex align-items-center justify-content-between\'<> B>>' +
      '<\'row\'<\'col-sm-12\'tr>>' +
      '<\'row footer-wrapper\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }
    ],
      language: {
        paginate: {
          previous: `<div id ="previous"><div><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
       </svg></div></div>`, // 在这里定义自定义的文本,
          first: '1',
          last: '2',
          next: `<div id ="next"><div><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 6l6 6l-6 6"></path>
       </svg></div></div>`
        }
      }
    };
  }

  public searchTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((datatableInstance: DataTables.Api) => {
        // const searchTerm = 'example'; // The search term you want to use
        datatableInstance.search(filterValue).draw();
      });
    }
  }
}
