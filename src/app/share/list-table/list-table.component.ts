import {Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef, ViewEncapsulation, OnDestroy} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import toastr from "../utils/toastr";
import {ListTableService} from "./list-table.service";
import { dataSource, timeRange, TIME_INTERVAL } from '../global/data-source';
import { Router } from '@angular/router';
import {PageBreadcrumbService} from 'src/app/shared/layout/page-breadcrumb/page-breadcrumb.service';
import { visibilityState, ADAPTER, zeekRunning, LICENSE} from 'src/app/shared/global/global';

@Component({
    selector: 'smart-list-table',
    templateUrl: './list-table.component.html',
    styleUrls: ['./list-table.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ListTableComponent implements OnInit, OnDestroy {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    public dtOptions: any = {};
    public random: string;
    public dtTrigger: Subject<any> = new Subject();
    @Input() searchText: string;
    @Input() permissions: boolean = true;
    @Input() hideTable: boolean = false;
    @Input() tableId: string;
    @Input() showHead: boolean = false;
    @Input() showNewBtn: boolean = false;
    @Input() newBtbText: string;
    @Input() showEditBtn: boolean = false;
    @Input() showDownloadBtn: boolean = false;
    @Input() showDecodeBtn: boolean = false;
    @Input() showActionColumn: any = true;
    @Input() showDeleteBtn: boolean = false;
    @Input() showExportBtn: boolean = false;
    @Input() showExportBtnReset: boolean = false;
    @Input() titleArray: string[];
    @Input() data: any;
    @Input() dtColumns: any;
    @Input() dtButtons: any;
    @Input() dtActionButtons: any;
    @Input() responsive: any;
    @Input() responsiveName: boolean;
    @Input() title: string;
    @Input() title1: string;
    @Input() columnDefs: any;
    @Input() dtRowsGroup: any;
    @Input() showAnalyzeBtn: any;
    @Input() showAlarmSetting: any;
    @Input() showRevieve: any;
    @Input() exportFileName: any;
    @Input() importCsvParameter: {
        fileType,
        tableName,
        tableType,
        tableTitle
    };
    @Input() actionClass: any = '';
    // 排序
    @Input() order: any;
    @Input() withPadding: any;

    @Input() showImportButton: boolean;
    @Input() showIPSearch: boolean;
    @Input() multiSelect: boolean;
    @Input() selectList: any;
    @Input() hideDefaultSearch: boolean;

    @Output() modalOpen: EventEmitter<any> = new EventEmitter();
    @Output() rowEdit: EventEmitter<any> = new EventEmitter();
    @Output() rowDelete: EventEmitter<any> = new EventEmitter();
    @Output() rowDownload: EventEmitter<any> = new EventEmitter();
    @Output() rowClick: EventEmitter<any> = new EventEmitter();
    @Output() rowRightClick: EventEmitter<any> = new EventEmitter();
    @Output() analyzeUploadFile: EventEmitter<any> = new EventEmitter();
    @Output() rowGenerate: EventEmitter<any> = new EventEmitter();
    @Output() rowDropdown: EventEmitter<any> = new EventEmitter();
    @Output() rowDownloadAndJump: EventEmitter<any> = new EventEmitter();
    @Output() dropItem: EventEmitter<any> = new EventEmitter();
    @Output() rowAlarmSetting: EventEmitter<any> = new EventEmitter();

    @Output() tableReset: EventEmitter<any> = new EventEmitter();

    @Output() importCsv: EventEmitter<any> = new EventEmitter();
    @Output() hostToDetail: EventEmitter<any> = new EventEmitter();
    @Output() jump: EventEmitter<any> = new EventEmitter<any>();
    @Output() showDetails: EventEmitter<any> = new EventEmitter<any>();

    @Input() hideHover: any;
    @Input() pageLength: number;
    @Input() showSettingBtn: boolean;
    @Input() titleID: number;
    @Input() visibility: any;
    @Input() pdfPlugin: true;
    @Input() showJumpBtn: any;
    @Input() showDownloadAndJump2Decode: any;
    @Input() listAppend: boolean;

    @Output() pageChange: EventEmitter<any> = new EventEmitter();
    @Input() fullscreenable: boolean = true;
    // public searchValue: any;
    @Input()  rowClick2Decode: string;
    @Input() public showAlarmBtn: any;
    @Input() public showHideColumnInPdf: any;
    @Input() public showColumn: any;
    @Input() public showJumpKibana: any
    @Input() public params: any;

    @Output() dataChange: EventEmitter<any> = new EventEmitter();
    @Output() ipSearchChange: EventEmitter<any> = new EventEmitter();
    @Input() showListTable: boolean = true;
    private rerenderBool: boolean;
    @Input() public fnCreatedRow: any;
    @Input() private actionColumnWidth: any;
    public currentPage: number = 0;

    public actionShow: boolean;

    public timeout: any;
    public searchValue: any = ''
    public globalSearch: boolean = false

    public chinaOnly: boolean = false

    public needGlobalSearch = false;
    public realTimeEvent: any;
    public monitoring: boolean = TIME_INTERVAL.realtime;
    constructor(private elementRef: ElementRef, private translate: TranslateService, private listTableService: ListTableService, 
        private router: Router, private pageBreadcrumbService: PageBreadcrumbService,) {
        this.realTimeEvent = pageBreadcrumbService.dateChange.subscribe( (data) => {
            // 监听 dateChange 事件
            if (data) {
                this.monitoring = data.monitoring;
                if (this.monitoring && this.globalSearch) {
                    this.globalSearch = false
                    this.handleChangeIPGlobal({ target: { checked: false }})
                }
            }
         });
        // this.listTableService.change.subscribe(isOpen => {
        //     // console.log(isOpen);
        //     // this.clear();
        //     // this.initListTable();
        // });
        if (LICENSE && LICENSE.omniLicenseEntity && LICENSE.omniLicenseEntity.option4) {
            this.chinaOnly = true
        } else {
            this.chinaOnly = false
        }
    }

    ngOnInit() {
        // console.log(this.showSettingBtn)
        // console.log(this.titleName)
        const per = localStorage.getItem('permissions');
        if (per) {
            this.actionShow = per.includes('admin');
        }
        this.initListTable();
        window.addEventListener('resizeTable',  this.resizeTable);

    }


    public searchGlboal = () => {
        // this.showSearchList = false
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.ipSearchChange.emit({ hostIP: this.searchValue || undefined})
        }, 1000)
        
    }

    public handleKeyup($event) {
        this.searchValue = $event.target.value
        if (this.globalSearch) {
            this.searchGlboal()
        } else {
            this.searchTable(this.searchValue)
        }
    }

    public handleChangeIPGlobal($event) {
        
        // this.searchValue = ''
        // $('.input1').val('')
        if ($event.target.checked) {
            this.needGlobalSearch = true;
            this.searchTableWithoutDraw('')
            this.ipSearchChange.emit({ hostIP: this.searchValue || undefined})
        } else {
            this.needGlobalSearch = false;
            this.ipSearchChange.emit({ hostIP:  undefined})
            setTimeout(() => {
                this.searchTable(this.searchValue)
            }, 1000)
            
        }
    }


    public initListTable() {
        this.random = Math.random().toFixed(100).toString().replace('.', '');
        // console.log(this.order);
        const that = this;
        this.dtOptions = {
            // serverSide: true,
            // ajax: {
            //     url: '/api/bro/conn/transaction/custom/ip',
            //     type: 'POST',
            // },
            // "sDom": '<\'row mb-3 pdf-wrapper\'<\'col-sm-6\'><\'col-sm-6 pdf-content d-flex align-items-center justify-content-between\'<> B>>' +
            //     // "< 'test' f >" +
            //     '<\'row\'<\'col-sm-12\'tr>>' +
            //     '<\'row footer-wrapper\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
            retrieve: true,
            // destroy: true,
            search: {
                search : this.searchText
            },
            pageLength: this.pageLength || 10,
            // Declare the use of the extension in the dom parameter
            dom: 'Rrt<\'row mb-3 pdf-wrapper\'<\'col-sm-6\'><\'col-sm-6 pdf-content d-flex align-items-center justify-content-between\'<> B>>' +
                // "< 'test' f >" +
                '<\'row\'<\'col-sm-12\'tr>>' +
                '<\'row footer-wrapper\'<\'col-sm-12 col-md-5\'i><\'col-sm-12 col-md-7\'p>>',
            buttons: [],
            // columns: [],
            oLanguage: {
                sZeroRecords: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.noMatch">${this.translate.instant('LIST_TABLE_CONTENT.noMatch')}</span>`,
                sInfo: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.showing">${this.translate.instant('LIST_TABLE_CONTENT.showing')}</span> _START_
                        <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.to">${this.translate.instant('LIST_TABLE_CONTENT.to')}</span> _END_
                        <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.of">${this.translate.instant('LIST_TABLE_CONTENT.of')}</span> _TOTAL_
                        <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.entries">${this.translate.instant('LIST_TABLE_CONTENT.entries')}</span>`,
                sInfoEmpty: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.showing">${this.translate.instant('LIST_TABLE_CONTENT.showing')}</span> 0
                             <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.to">${this.translate.instant('LIST_TABLE_CONTENT.to')}</span> 0
                             <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.of">${this.translate.instant('LIST_TABLE_CONTENT.of')}</span> 0
                             <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.entries">${this.translate.instant('LIST_TABLE_CONTENT.entries')}</span>`,
                sInfoFiltered: `(<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.filteredFrom">${this.translate.instant('LIST_TABLE_CONTENT.filteredFrom')}</span> 
                                <span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.totalEntries">${this.translate.instant('LIST_TABLE_CONTENT.totalEntries')}</span>)`,
                sEmptyTable: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.isEmpty">${this.translate.instant('LIST_TABLE_CONTENT.isEmpty')}</span>`,
                sInfoThousands: ',',
                oPaginate: {
                    sFirst: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.first">${this.translate.instant('LIST_TABLE_CONTENT.first')}</span>`,
                    sPrevious: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.previous">${this.translate.instant('LIST_TABLE_CONTENT.previous')}</span>`,
                    sNext: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.next">${this.translate.instant('LIST_TABLE_CONTENT.next')}</span>`,
                    sLast: `<span class="LIST_TABLE_CONTENT LIST_TABLE_CONTENT.last">${this.translate.instant('LIST_TABLE_CONTENT.last')}</span>`
                }
            },
            // fnCreatedRow: (nRow, aData, iDataIndex) => {
            //     $('td:eq(0)', nRow).html("<span class='row-details row-details-close' data_id='" + aData.id + "'></span>&nbsp;" + aData[0]);
            // },
            // Use this attribute to enable the responsive extension
            responsive: that.responsive,
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                // Unbind first in order to avoid any duplicate handler
                // (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', row).unbind('click');
                $('td', row).bind('click', (e) => {
                    self.clickHandler(e, row, data);
                });
                $('td', row).unbind('mousedown');
                $('td', row).mousedown((e) => {
                    self.rightClickHandler(e, row, data)
                })
                return row;
            },
            initComplete(settings) {
                const _$this = this;
                // 重写搜索事件
                // $(`#searchid${that.random} input`).bind('keyup',
                //                                         function(e) {
                //         const val = $(this).val();
                //         // if (e.keyCode == 13 || (e.keyCode == 8 && (val.length === 0))) {
                //         //     _$this.api().search(val).draw();
                //         // }

                //         that.searchValue = val;
                //         if (that.globalSearch) {
                //             that.searchGlboal()
                //         } else {
                //             _$this.api().search(val).draw();
                //             that.translateTableContent();
                //         }
                //     });

                // 翻页,搜索,排序 都会触发
                _$this.on('draw.dt', function(e) {
                    that.translateTableContent();
                    that.pageChange.emit(e);
                    // console.log($(`#tableid${that.random} th[aria-sort]`))
                    return false

                });
                that.bindAjaxSort();
                // 排序 搜索
                // _$this.on('order.dt', function(e) {
                //     // alert(1)
                //     console.log($(`#tableid${that.random} th[aria-sort]`))
                // });
                // // 排序 搜索
                // _$this.on('search.dt', function(e) {
                //     // alert(2)
                //     console.log($(`#tableid${that.random} th[aria-sort]`))
                //
                // });
                // 翻页
                _$this.on('page.dt', function(e) {
                    let pageInfo = _$this.api().page.info()
                    that.currentPage = Math.floor(pageInfo.start / pageInfo.length) || 0
                });
            }
        };
        if (this.multiSelect) {
            this.dtOptions.select = {
                style: 'multi'
            }
        }
        // console.log(this.dtOptions)
        if (this.showExportBtn) {
            this.dtOptions.buttons = [];
            if (this.showExportBtnReset) {
                this.dtOptions.buttons.push({
                    text: 'Reset',
                    className: 'btn-export btn-outline-success btn-sm mr-1',
                    action:  () => {
                        this.tableReset.emit();
                    }
                })
            }
            this.dtOptions.buttons.push(   {
                extend: 'pdfHtml5',
                text: 'PDF',
                sExtends: 'pdfHtml5',
                className: 'btn-export btn-outline-danger btn-sm mr-1',
                title: this.exportFileName ? this.exportFileName : 'NetEyez',
                customize(doc) {
                    doc.styles.tableHeader.color = '#000000';
                    doc.styles.tableHeader.fillColor = '#ffdb8e';
                },
                bom: true,
                orientation: 'landscape',
                pageSize: 'TABLOID',
                exportOptions: {
                    columns: 
                    that.showColumn ? that.showColumn :
                    (that.showHideColumnInPdf ? ':not(.hide)' : ':visible'),
                    format: {
                        body: function (data, row, column, node: any) {
                            // Strip $ from salary column to make it numeric
                            // console.log(node.classList)
                            if (node.classList.contains('bytes') || node.classList.contains('packets') || node.classList.contains('pdfexport')) {
                                if (node.firstChild.getAttribute) {
                                    return node.firstChild.getAttribute('title')
                                } else {
                                    return data
                                }
                            } else {
                                if (node.firstChild) {
                                    return node.textContent
                                } else {
                                    return data
                                }
                            }
                        }
                    }
                }
            })
            this.dtOptions.buttons.push(    {
                extend: 'csv',
                text: 'CSV',
                className: 'btn-export btn-outline-primary btn-sm mr-1',
                title: this.exportFileName ? this.exportFileName : 'NetEyez',
                bom: true,
                exportOptions: {
                    columns:  
                    that.showColumn ? that.showColumn :
                    (that.showHideColumnInPdf ? ':not(.hide)' : ':visible'),
                    format: {
                        body: function (data, row, column, node: any) {
                            // Strip $ from salary column to make it numeric
                            if (node.classList.contains('bytes') || node.classList.contains('packets') || node.classList.contains('pdfexport')) {
                                if (node.firstChild.getAttribute) {
                                    return node.firstChild.getAttribute('title')
                                } else {
                                    return data
                                }
                            } else {
                                if (node.firstChild) {
                                    return node.textContent
                                } else {
                                    return data
                                }
                            }
                        }
                    }
                }
            })

            if (this.pdfPlugin) {
                this.dtOptions.buttons.forEach(element => {
                    element.exportOptions = {
                        format: {
                            body: function (data, row, column, node: any) {
                                // Strip $ from salary column to make it numeric
                                if (node.childNodes.length > 2) {
                                    return node.childNodes[1].childNodes[1].textContent
                                } else {
                                    if (node.classList.contains('bytes') || node.classList.contains('packets') || node.classList.contains('pdfexport')) {
                                        if (node.firstChild.getAttribute) {
                                            return node.firstChild.getAttribute('title')
                                        } else {
                                            return data
                                        }
                                    } else {
                                        return node.firstChild.textContent
                                    } 
                                }
                            }
                        }
                    }
                });
            }
        }

        const actionColumn = {
            title: 'Action',
            data: 'id',
            width: this.actionColumnWidth,
            className: `LISTTABLE.ACTION table-small-hide ${this.actionClass} hide`,
            orderable: false,
            render: (id, type, row) => {
                let actionColumn = '';

                if (this.showDownloadBtn) {
                    row.description = ''
                    actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.download btn btn-success btn-xs btn-icon rounded-circle download-btn" data-id="${id}" title="Download"
                                   style="margin-right: 10px;" href="javaScript:;" data-row='${JSON.stringify(row)}' data-path="${row.path}" smartstubclick=""><i
                                        class="fal fa-download"></i></a>`;
                }

                if (this.showEditBtn) {
                    actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.edit btn btn-success btn-xs btn-icon rounded-circle edit-btn" title="Edit"
                            data-id="${id}" data-row='${JSON.stringify(row)}' style="margin-right: 10px;" href="javaScript:;"
                            smartstubclick=""><i class="fal fa-edit"></i></a>`;
                }

                if (this.showDeleteBtn) {
                    row.description = ''
                    if (zeekRunning.pauseStatus && this.showAnalyzeBtn == 'capture') {
                        actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.delete btn btn-danger btn-xs btn-icon rounded-circle " data-id="${id}" data-row='${JSON.stringify(row)}' title="Delete"
                            style="margin-right: 10px;opacity: 0.5;" href="javaScript:;" smartstubclick=""><i
                                class="fal fa-times"></i></a>`;
                    } else {
                        actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.delete btn btn-danger btn-xs btn-icon rounded-circle delete-btn" data-id="${id}" data-row='${JSON.stringify(row)}' title="Delete"
                            style="margin-right: 10px;" href="javaScript:;" smartstubclick=""><i
                                class="fal fa-times"></i></a>`;
                    }
                    
                }

                if (this.showAnalyzeBtn) {
                    // console.log(row);
                    // console.log(zeekRunning.pauseStatus)
                    // fix: pause 的时候 capture fille disable 分析按钮 review with Bryan and Ruby
                    if (zeekRunning.pauseStatus && this.showAnalyzeBtn == 'capture') {
                        actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.CaptureMsg btn btn-secondary btn-xs btn-icon rounded-circle plus-btn " data-id="${id}"
                                        style="margin-right: 10px;opacity: 0.5;cursor: auto;" href="javaScript:;" data-id title="Please go to Overview tab to stop traffic capture in order to analyze captured file."
                                        smartstubclick="" disabled="true"><i class="fal fa-align-center"></i></a>`;
                    } else {
                        if (3 === row.status) {
                            actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.Analysis btn btn-secondary btn-xs btn-icon rounded-circle plus-btn " data-id="${id}"
                    style="margin-right: 10px;opacity: 0.5;cursor: auto;" href="javaScript:;" data-id title="Analysis"
                    smartstubclick="" disabled="true"><i class="fal fa-align-center"></i></a>`;
                        } else {
                            actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.Analysis btn btn-secondary btn-xs btn-icon rounded-circle plus-btn analyze-upload-file analyze-upload-file-${id}" data-id="${id}"
                    style="margin-right: 10px;" href="javaScript:;" data-id title="Analysis"
                    smartstubclick=""><i class="fal fa-align-center"></i></a>`;
                        }
                    } 

                }

                if (this.showDecodeBtn) {
                    let btn = '';
                    if (dataSource.source == 'realtime') {
                        btn = 'not-allow-yyh';
                    }
                    actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.Decode btn btn-xs btn-success btn-icon rounded-circle decode-btn ${btn}" data-row='${JSON.stringify(row)}' data-id="${row[this.rowClick2Decode]}" title="Decode"
                                   style="margin-right: 10px;" href="javaScript:;" data-path="${row.path}" smartstubclick=""><i
                                        class="fal fa-bug"></i></a>`;
                }

                if (this.showAlarmBtn) {
                    actionColumn += `<a class="btn btn-success btn-xs btn-icon rounded-circle alarm-btn" data-id="${row.serverIp}"
                            title="Link To Alarm"
                            style="margin-right: 10px;" href="javaScript:;" smartstubclick=""><i
                            class="fal fa-link"></i></a>`
                }

                if (this.showAlarmSetting) {
                    actionColumn += `<a class="LIST_TABLE_CONTENT StatusSetting btn btn-success btn-xs btn-icon rounded-circle edit-alarm-btn" title="Status Setting"
                            data-id="${id}" data-row='${JSON.stringify(row)}' style="margin-right: 10px;" href="javaScript:;"
                            smartstubclick=""><i class="fal fa-cog"></i></a>`
                }

                if (this.showRevieve) {
                    actionColumn += `<a class="LIST_TABLE_CONTENT StatusSetting btn btn-success btn-xs btn-icon rounded-circle edit-alarm-btn" title="Retrieve Log"
                            data-id="${id}" data-row='${JSON.stringify(row)}' style="margin-right: 10px;" href="javaScript:;"
                            smartstubclick=""><i class="fal fa-cog"></i></a>`
                }

                if (this.showJumpBtn && !this.chinaOnly) {
                    actionColumn += `<a class="btn btn-success btn-xs btn-icon rounded-circle jump" data-id="${id}"
                    data-row='${JSON.stringify(row)}' title="Link To Kibana"
                    style="margin-right: 10px;" href="javaScript:;"><i
                        class="fal fa-link"></i></a>`;
                }

                if (this.showDownloadAndJump2Decode) {
                    actionColumn += `<a class="LIST_TABLE_CONTENT PUBLIC.Decode btn btn-xs btn-success btn-icon rounded-circle download-and-jump2decode" data-row='${JSON.stringify(row)}' data-id="${row[this.rowClick2Decode]}" title="Decode"
                                   style="margin-right: 10px;" href="javaScript:;" data-path="${row.path}" smartstubclick=""><i
                                        class="fal fa-bug"></i></a>`;
                }
                    
                if (this.showJumpKibana && !this.chinaOnly) {
                    if (row.status == 1 || (zeekRunning.pauseStatus && this.showAnalyzeBtn == 'capture')) {
                        actionColumn +=
                            `<a class="btn btn-dark btn-xs btn-icon rounded-circle plus-btn"
                        style="margin-right: 10px;opacity: 0.5;cursor: auto;" href="javaScript:;" data-id title="Kibana"
                        smartstubclick=""><i class="fal fa-cogs"></i>
                    </a>`
                    } else {
                        actionColumn +=
                            `<a class="btn btn-dark btn-xs btn-icon rounded-circle plus-btn jump-kibana"
                        style="margin-right: 10px;" href="javaScript:;" data-id title="Kibana"
                        smartstubclick=""><i class="fal fa-cogs"></i>
                    </a>`
                    }
                    
                }

                if (this.showAnalyzeBtn == 'capture') {
                    if (zeekRunning.pauseStatus) {
                        this.dtActionButtons = `<a class="LIST_TABLE_CONTENT PUBLIC.Decode btn btn-primary btn-xs btn-icon rounded-circle plus-btn capture-file-decode"
                        style="margin-right: 10px;opacity: 0.5;" href="javaScript:;" data-id title="Decode"
                        smartstubclick="" disabled="true"><i class="fal fa-bug"></i></a>
                    <a class="LIST_TABLE_CONTENT PUBLIC.download btn btn-info btn-xs btn-icon rounded-circle plus-btn capture-download"
                        style="margin-right: 10px;opacity: 0.5;" href="javaScript:;" data-id title="Download"
                        smartstubclick=""><i class="fal fa-download"></i></a>`;
                    } else {
                        this.dtActionButtons = `<a class="LIST_TABLE_CONTENT PUBLIC.Decode btn btn-primary btn-xs btn-icon rounded-circle plus-btn capture-file-decode"
                        style="margin-right: 10px;" href="javaScript:;" data-id title="Decode"
                        smartstubclick="" disabled="true"><i class="fal fa-bug"></i></a>
                    <a class="LIST_TABLE_CONTENT PUBLIC.download btn btn-info btn-xs btn-icon rounded-circle plus-btn capture-download"
                        style="margin-right: 10px;" href="javaScript:;" data-id title="Download"
                        smartstubclick=""><i class="fal fa-download"></i></a>`;
                    }
                    
                } 


                actionColumn += this.dtActionButtons ? this.dtActionButtons.replace('data-id', `data-id="${id}"`) : '';

                return actionColumn;
            },
        };

        this.dtOptions.buttons = this.dtOptions.buttons.concat(this.dtButtons);
        const item = localStorage.getItem('permissions');
        if (item && (item.includes('admin') || this.showActionColumn == 'always')) {
            this.dtOptions.columns = this.showActionColumn ? this.dtColumns.concat(actionColumn) : this.dtColumns;
        } else {
            this.dtOptions.columns = this.dtColumns;
        }

        this.dtOptions.columnDefs = this.columnDefs;
        this.dtOptions.rowsGroup = this.dtRowsGroup;
        this.dtOptions.order = this.order;
        if (this.fnCreatedRow) {
            this.dtOptions.fnCreatedRow = this.fnCreatedRow;
        }
        // console.log(this.dtOptions)
    }

    private bindAjaxSort() {
        const that = this;
        // console.log($(`#tableid${this.random} th.ajaxSort`))
        if (this.rerenderBool) {
            return true;
        }
        // $(`#tableid${this.random} th.ajaxSort`).off()
        $(`#tableid${this.random}`).on('click', 'th.ajaxSort', function(e) {
            const className = $(this).attr("class").split(' ');
            const txt = className[2]
            let sortTxt = $(this).attr("aria-sort");
            let order = false;

            // if (sortTxt && sortTxt === "descending") {
            if (!$(this).hasClass("sorting_desc")) {
                order = true;
            } else {
                order = false;
            }
            const sortId = $(`#tableid${that.random} thead tr th`).index(this);
            console.log(that.needGlobalSearch)
            if (that.needGlobalSearch) {
                that.dataChange.emit({txt, order, sortId});
            }
            return false;
        })
    }

    public resizeTable = (e) => {
        let that = this
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            const pageLength = e.detail.fullScreen ? 25 : that.pageLength || 10;
            dtInstance.page.len(pageLength).draw();
        });
    }

    public clickHandler(e, row, info) {
        this.rowClick.emit({
            e,
            row,
            info
        });
    }

    public rightClickHandler(e, row, info) {
        if (e.which == 3) {
            window.oncontextmenu = () => {
                event.preventDefault(); // 阻止默认事件行为
                return false;
            };
            this.rowRightClick.emit({
                e,
                row,
                info
            });
            setTimeout(() => {
                window.oncontextmenu = undefined;
            })
        }
    }

    public openModal(e) {
        this.modalOpen.emit(e);
    }

    public editRow = (e) => {
        this.rowEdit.emit(e);
        e.stopPropagation();
    }

    public deleteRow = (e) => {
        this.rowDelete.emit(e);
        e.stopPropagation();
    }

    public generateRow = (e) => {
        this.rowGenerate.emit(e);
        e.stopPropagation();
    }
    public dropdownRow = (e) => {
        this.rowDropdown.emit(e);
        e.stopPropagation();
    }

    public dropItemRow = (e) => {
        this.dropItem.emit(e);
    }

    public downloadAndJump2Decode = (e) => {
        this.rowDownloadAndJump.emit(e);
        e.stopPropagation();
    }

    public toDecodeRow = (e) => {
        // console.log(e.target.parentNode.getAttribute('data-id'));
        const ip = e.target.parentNode.getAttribute('data-id');
        const row = e.target.parentNode.getAttribute('data-row')
        let obj = JSON.parse(row)
        let filter = encodeURI(`ip.addr==${ip}`)
        if (this.rowClick2Decode == 'serverIp') {
            filter = encodeURI(`ip.addr==${ip}`)
        } else {
            filter = encodeURI(`ip.addr==${obj.srcIp} and ip.addr==${obj.dstIp} and tcp.port==${obj.srcPort}`)
        } 
        console.log(filter)
        this.row2Decode(filter);
    }

    public toAlarmRow = (e) => {
        const serverIp = e.target.parentNode.getAttribute('data-id');
        this.listTableService.checkExistAlarm({ ...this.params, serverIp }).subscribe(res => {
            if (res.data) {
                this.router.navigate(['/alarm', { serverIp }]);
            } else {
                toastr.warning(this.translate.instant('TOASTR.This server does not have an alarm'))
            }
        
        })
        
    }

    public editAlarm = (e) => {
        this.rowAlarmSetting.emit(e);
        e.stopPropagation();
    }

    public downloadRow = (e) => {
        this.rowDownload.emit(e);
        e.stopPropagation();
    }

    public analyzeRow = (e) => {
        this.analyzeUploadFile.emit(e);
        e.stopPropagation();
    }

    public hostRow = (e) => {
        this.hostToDetail.emit(e);
        e.stopPropagation();
    }

    public clickJump = (e) => {
        this.jump.emit(e);
        e.stopPropagation();
    }

    public clickDetails = (e) => {
        this.showDetails.emit(e);
        e.stopPropagation();
    }

    public importCsvRow = (e) => {
        const fileInputDom = document.getElementById('import-csv' + this.random);
        // Bug #1490 2次导入相同的Assetbook，第二次导入后响应很慢
        e.target.value = ''
        fileInputDom.click();
        e.stopPropagation();
    }

    public uploadFile() {
        const fileInputDom = document.getElementById('import-csv' + this.random);
        // console.log(fileInputDom);
        fileInputDom.addEventListener('change', (ev: Event) => {
            // console.log(e.target['files'][0]);
            // console.log(ev);
            const formData = new FormData();
            const f = ev.target['files'][0];
            // console.log(f);
            formData.append('file', f);
            // console.log(formData);
            this.listTableService.importCsv(this.importCsvParameter.fileType, this.importCsvParameter.tableName,
                                            this.importCsvParameter.tableType, this.importCsvParameter.tableTitle, formData).subscribe(
                res => {
                    let success = this.translate.instant('TOASTR.Import success')
                    let error = this.translate.instant('TOASTR.Import failure')
                    if (res.status) {
                        let errorNum = Number(res.errorNum)
                        if (errorNum) {
                            toastr.warning(`${success}：${res.successesNum} - ${error}：${res.errorNum}`);
                        } else {
                            toastr.success(`${success}：${res.successesNum} - ${error}：${res.errorNum}`);
                        }
                        this.importCsv.emit(true);
                    } else {
                        toastr.error(error);
                    }
                });
        });
    }

    public renderTable(data) {
        this.translateTableHeader();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.clear();
            dtInstance.rows.add(data || []).draw();
            dtInstance.page(this.currentPage).draw('page')
            this.translateTableContent();
            dtInstance.columns.adjust()
            if (!this.showExportBtn) {
                let dom = document.getElementById(`tableid${this.random}_wrapper`)
                if (dom) {
                    dom.classList.add('without-pdf')
                }
            }
        });
    }

    public searchTable(name) {
        this.searchText = name;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.search(name).draw();
        });
    }

    public searchTableWithoutDraw(name) {
        this.searchText = name;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.search(name);
        });
    }

    public clear() {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.off('draw');
        });
    }

    public initActionBtnsEvent() {
        this.dtTrigger.next();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.translateTableHeader();
            this.translateTableContent();
            this.bindCustomEventBySelector(dtInstance, '.edit-btn', this.editRow);
            this.bindCustomEventBySelector(dtInstance, '.delete-btn', this.deleteRow);
            this.bindCustomEventBySelector(dtInstance, '.download-btn', this.downloadRow);
            this.bindCustomEventBySelector(dtInstance, '.analyze-upload-file', this.analyzeRow);
            this.bindCustomEventBySelector(dtInstance, '.generate-btn', this.generateRow);
            this.bindCustomEventBySelector(dtInstance, '.dropdown-toggle', this.dropdownRow);
            this.bindCustomEventBySelector(dtInstance, '.dataTable .dropdown-menu', this.dropItemRow);
            this.bindCustomEventBySelector(dtInstance, '.decode-btn', this.toDecodeRow);
            this.bindCustomEventBySelector(dtInstance, '.alarm-btn', this.toAlarmRow);
            this.bindCustomEventBySelector(dtInstance, '.edit-alarm-btn', this.editAlarm);
            this.bindCustomEventBySelector(dtInstance, '.host-to-detail', this.hostRow);
            this.bindCustomEventBySelector(dtInstance, '.jump', this.clickJump);
            this.bindCustomEventBySelector(dtInstance, '.download-and-jump2decode', this.downloadAndJump2Decode);
            if (this.showImportButton) {
                this.bindCustomEventBySelector(dtInstance, '.import-csv', this.importCsvRow);
                this.uploadFile();
            }
            if (this.multiSelect) {
                dtInstance.on('select', (e, dt, node, config) => {
                    var rows = dt.rows( { selected: true } ).data().toArray();
                    this.selectList.length = 0
                    rows.forEach(item => {
                        this.selectList.push(item)
                    })
                })

                dtInstance.on('deselect', (e, dt, node, config) => {
                    var rows = dt.rows( { selected: true } ).data().toArray();
                    this.selectList.length = 0
                    rows.forEach(item => {
                        this.selectList.push(item)
                    })
                })
            }
        });
    }

    // bindCustomEvent must be called after renderTable, you will need the dom to be rendered
    bindCustomEventBySelector(dtInstance, selector, func) {
        this.bindEvents(selector, func);
        dtInstance.on('draw', () => {
            this.bindEvents(selector, func);
        });
    }

    bindEvents(selector, func) {
        const elements = this.elementRef.nativeElement.querySelectorAll(selector);
        for (const element of elements) {
            element.addEventListener('click', func);
        }
    }

    translateTableHeader() {
        if (document.querySelectorAll('th')) {
            document.querySelectorAll('th').forEach((item) => {
                if (item.classList && item.classList[0] && item.classList[0].indexOf('LISTTABLE') !== -1) {
                    const newTitle = this.translate.instant(item.classList[0]) || item.innerText;
                    item.innerText = newTitle;
                }
            });
        }
    }

    private row2Decode(filter) {
        if (dataSource.source && dataSource.source != 'realtime' && filter) {
            this.router.navigate(['/capture/decode'],
                { queryParams: { fullPath: dataSource.source, filter: filter} });
        }
    }

    deleteALl(): void {
        this.rerenderBool = true;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.clear().draw();
            // dtInstance.rows.add(list).draw();
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    addList(list){
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.rows.add(list).draw();
            this.translateTableHeader()
        });
    }

    translateTableContent() {
        const listTableContent = document.querySelectorAll('.LIST_TABLE_CONTENT');
        if (listTableContent) {
            listTableContent.forEach( item => {
                if (item.classList && item.classList[1] && item.classList[1].indexOf('LIST_TABLE_CONTENT') !== -1) {
                    const newTitle = this.translate.instant(item.classList[1]) || item['innerText'];
                    item['innerText'] = newTitle;
                } else if (item.classList && item.classList[1] && item.classList[1].indexOf('PUBLIC') !== -1){
                    const newTitle = this.translate.instant(item.classList[1]) || item.getAttribute("title");
                    item.setAttribute("title", newTitle);
                }
            });
        }
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resizeTable', this.resizeTable);
        if (this.realTimeEvent) { this.realTimeEvent.unsubscribe(); }
    }
}
