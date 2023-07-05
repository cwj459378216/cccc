import { Component, ElementRef, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { FromComponent } from './from/from.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'smart-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListTableComponent {
  dtOptions: DataTables.Settings = {};
  // dtElement: DataTableDirective;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private elementRef: ElementRef,private http: HttpClient) { }

  ngOnInit(): void {
    const self = this;
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .get<any>(
            'https://l-lin.github.io/angular-datatables/data/data.json?_=1688545436972',
            // 'https://xtlncifojk.eu07.qoddiapp.com/',
            // dataTablesParameters, {}
          ).subscribe(resp => {
            let list = [
              {
                id: 0,
                chart: "aplication",
                visualizationType: "pie chart",
                dataset: "omni-bro-conn",
                queryBody: ""
              }
            ]
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: list
              // data: resp.data             // <-- see here
            });
          });
      },
      dom: 'Rrt<\'row mb-3 pdf-wrapper\'<\'col-sm-6\'><\'col-sm-6 pdf-content d-flex align-items-center justify-content-between\'<> B>>' +
      '<\'row\'<\'col-sm-12\'tr>>' +
      '<\'row footer-wrapper\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'Chart',
        data: 'chart'
      }, {
        title: 'Visualization type',
        data: 'visualizationType'
      },{
        title: 'Dataset',
        data: 'dataset'
      },{
        title: 'Action',
        render: (id, type, row) => {
          let actionColumn = '';
          actionColumn += `<a class="m-r-10 cursor-pointer edit-btn" title="Edit" data-id="${id}" data-row='${JSON.stringify(row)}'><i-tabler name="edit" class="icon-18" _nghost-ng-c2034356942="" ng-reflect-name="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                              <path d="M16 5l3 3"></path>
                            </svg>
                            </i-tabler></a>`;
          actionColumn += `<a class="m-r-10 cursor-pointer delete-btn"  data-id="${id}" data-row='${JSON.stringify(row)}' title="Delete"><i-tabler name="trash" class="icon-18" _nghost-ng-c2034356942="" ng-reflect-name="trash"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 7l16 0"></path>
                            <path d="M10 11l0 6"></path>
                            <path d="M14 11l0 6"></path>
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                          </svg>
                          </i-tabler></a>`;
          return actionColumn;
        }
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

  public openDialog(action: string, obj: any): void {
    obj.action = action;
    this.getTableData();
    console.log(this.tableData)
    const dialogRef = this.dialog.open(FromComponent, {
      data: obj,
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any): void {
    this.tableData.push(row_obj);
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((datatableInstance: DataTables.Api) => {
        datatableInstance.clear();
        datatableInstance.rows.add(this.tableData);
        datatableInstance.draw();
      });
    }
  }

  updateRowData(row_obj: any): boolean | any {
  }

  deleteRowData(row_obj: any): boolean | any {

  }

  getTableData() {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((datatableInstance: DataTables.Api) => {
        const data = datatableInstance.data().toArray();
        this.tableData = [...data];
      });
    }
  }

  public initActionBtnsEvent() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.bindCustomEventBySelector(dtInstance, '.edit-btn', this.editRow);
        this.bindCustomEventBySelector(dtInstance, '.delete-btn', this.deleteRow);
    });
}

  public editRow = (e: any) => {
    this.openDialog('Update', e);
  }

  public deleteRow = (e: any) => {
    this.openDialog('Delete', e);
  }


    // bindCustomEvent must be called after renderTable, you will need the dom to be rendered
   bindCustomEventBySelector(dtInstance: any, selector: any, func: any) {
      this.bindEvents(selector, func);
      dtInstance.on('draw', () => {
          this.bindEvents(selector, func);
      });
  }

  bindEvents(selector: any, func: any) {
    const elements = this.elementRef.nativeElement.querySelectorAll(selector);
    for (const element of elements) {
        element.addEventListener('click', func);
    }
  }

  ngAfterViewInit(): void {
    this.initActionBtnsEvent();
  }
}
