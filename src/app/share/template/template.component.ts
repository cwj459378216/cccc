import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GridsterConfig,GridsterItem } from "angular-gridster2";


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit{
  public options!: GridsterConfig;
  public dashboard!: Array<GridsterItem>;
  public fullscreen:string="fullscreen";
  public fullscreenIndex:string="demo1";
  public echartsInstance1:any;
  public echartsInstance2:any;
  public echartsOption1: any;
  public echartsOption2: any;
  gridsterContainerHeight: string = '800px';
  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }
   constructor(
   ) { }
   webSite: any[] = [ ];
   salesData: any[] =  [ ];
   offlineChartData: any[] = [];

   ngOnInit() {
       let self = this;
       this.echartsOption1 = {
           title: {
               text: '折线图堆叠'
           },
           tooltip: {
               trigger: 'axis'
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
               },
               right:'10%'
           },
           xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['周一','周二','周三','周四','周五','周六','周日']
           },
           yAxis: {
               type: 'value'
           },
           series: [
               {
                   name:'邮件营销',
                   type:'line',
                   stack: '总量',
                   data:[120, 132, 101, 134, 90, 230, 210]
               },
               {
                   name:'联盟广告',
                   type:'line',
                   stack: '总量',
                   data:[220, 182, 191, 234, 290, 330, 310]
               },
               {
                   name:'视频广告',
                   type:'line',
                   stack: '总量',
                   data:[150, 232, 201, 154, 190, 330, 410]
               },
               {
                   name:'直接访问',
                   type:'line',
                   stack: '总量',
                   data:[320, 332, 301, 334, 390, 330, 320]
               },
               {
                   name:'搜索引擎',
                   type:'line',
                   stack: '总量',
                   data:[820, 932, 901, 934, 1290, 1330, 1320]
               }
           ]
       };
       this.echartsOption2 = {
           title: {
               text: '折线图堆叠'
           },
           tooltip: {
               trigger: 'axis'
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
               },
               right:'10%'
           },
           xAxis: {
               type: 'category',
               boundaryGap: false,
               data: ['周一','周二','周三','周四','周五','周六','周日']
           },
           yAxis: {
               type: 'value'
           },
           series: [
               {
                   name:'邮件营销',
                   type:'line',
                   stack: '总量',
                   data:[120, 132, 101, 134, 90, 230, 210]
               },
           ]
       };
      //  this.http.get('/chart').subscribe((res: any) => {
      //      this.webSite = res.visitData.slice(0, 10);
      //      this.salesData = res.salesData;
      //      this.offlineChartData = res.offlineChartData;
      //  });
       this.options = {
           gridType: 'fit',
           compactType: 'none',/*对齐类型*/
           itemChangeCallback:function (item,itemComponent){
               //console.info('itemChanged', item, itemComponent);
               let echarts = document.getElementById(`${item['id']}`);

               // const chart = new G2.Chart({
               //     container: document.getElementById(`${item.id}`),
               //     forceFit: true,
               //     height: itemComponent.height-30
               // });
               // chart.forceFit()

               if(echarts){/*在gridster2 Change的时候出发echarts的resize方法*/
                   echarts.style.width = itemComponent.width+'px';
                   echarts.style.height = itemComponent.height-30+'px';

                   // /*根据不同的模块 重置相应的图*/
                   let a = {"demo1":self.echartsInstance1,"demo2":self.echartsInstance2} as any;
                   a[item['id']].resize();
               }
               console.log('itemChangeCallback', item, itemComponent);
           },
           itemResizeCallback:function (item, itemComponent){
               // const chart = new G2.Chart({
               //     container: document.getElementById(`${item.id}`),
               //     forceFit: true,
               //     height: itemComponent.height-30
               // });
               //chart.forceFit()
               let echarts = document.getElementById(`${item['id']}`);
               if(echarts){/*在gridster2 resize的时候出发echarts的resize方法*/
                   echarts.style.width = itemComponent.width+'px';
                   echarts.style.height = itemComponent.height-30+'px';
               //     /*根据不同的模块 重置相应的图*/
                  //  console.log(self['echartsInstance1'])
                   setTimeout(()=>{
                   let a = {"demo1":self.echartsInstance1,"demo2":self.echartsInstance2} as any;
                    console.log("延迟打印")
                    // console.log(self['echartsInstance1'])
                    a[item['id']].resize();
                   },1000);
               }
                   //console.log('itemResize', item, itemComponent);
               console.log('itemResizeCallback', item, itemComponent);
           },
           margin: 10,
           outerMargin: true,
           minCols: 1,
           maxCols: 8,
           minRows: 1,
           maxRows: 10,
           maxItemCols: 5,
           minItemCols: 1,
           maxItemRows: 5,
           minItemRows: 1,
           defaultItemCols: 1,
           defaultItemRows: 1,
           fixedColWidth: 250,
           fixedRowHeight: 250,
           draggable: { /*是否可拖拽*/
               enabled: true,
               /*stop: AppComponent.eventStop*/
           },
           resizable: { /*是否可以缩放*/
               enabled: true,
               /*stop: AppComponent.eventStop*/
           },
           swap: false,
           displayGrid: 'onDrag&Resize' /*显示行和列的背景网格。选项：'永远' 缩放和拖拽时| 从不*/,
           pushItems: true,
           enableEmptyCellDrop: true,
           emptyCellDropCallback: this.emptyCellClick.bind(this),
       };
       this.dashboard = [
        {
          'label': 'item1',
          view: { cols: 2, rows: 1, y: 0, x: 0, id: 'demo1', hasContent: true },
          x: 0,
          y: 0,
          rows: 1,
          cols: 2
        },
        {
          'label': 'item2',
          view: { cols: 2, rows: 2, y: 0, x: 2, id: 'demo2' },
          x: 2,
          y: 0,
          rows: 2,
          cols: 2
        },
        {
          'label': 'item3',
          view: { cols: 1, rows: 1, y: 0, x: 4, id: 'demo3' },
          x: 4,
          y: 0,
          rows: 1,
          cols: 1
        },
        {
          'label': 'item4',
          view: { cols: 1, rows: 1, y: 0, x: 5, id: 'demo4' },
          x: 5,
          y: 0,
          rows: 1,
          cols: 1
        },
        {
          'label': 'item5',
          view: { cols: 1, rows: 1, y: 1, x: 0, id: 'demo5' },
          x: 0,
          y: 1,
          rows: 1,
          cols: 1
        },
        {
          'label': 'item6',
          view: { cols: 1, rows: 1, y: 1, x: 1, id: 'demo6' },
          x: 1,
          y: 1,
          rows: 1,
          cols: 1
        },
        {
          'label': 'item7',
          view: { cols: 2, rows: 2, y: 1, x: 5, label: 'Min rows & cols = 2', id: 'demo7' },
          x: 5,
          y: 1,
          rows: 2,
          cols: 2
        },
        {
          'label': 'item8',
          view: { cols: 2, rows: 2, y: 2, x: 0, label: 'Max rows & cols = 2', id: 'demo8' },
          x: 0,
          y: 2,
          rows: 2,
          cols: 2
        }
      ];
      //  this.dashboard =[
      //    {'label':'item1',
      //      view:{cols: 2, rows: 1, y: 0, x: 0,id:"demo1",hasContent: true,},
      //    },
      //    {'label':'item2',
      //      view:{cols: 2, rows: 2, y: 0, x: 2,id:"demo2"},
      //    },
      //    {'label':'item3',
      //      view:{cols: 1, rows: 1, y: 0, x: 4,id:"demo3"},
      //    },
      //    {'label':'item4',
      //      view:{cols: 1, rows: 1, y: 0, x: 5,id:"demo4"},
      //    },
      //    {'label':'item5',
      //      view:{cols: 1, rows: 1, y: 1, x: 0,id:"demo5"},
      //    },
      //    {'label':'item6',
      //      view:{cols: 1, rows: 1, y: 1, x: 1,id:"demo6"},
      //    },
      //    {'label':'item7',
      //      view:{cols: 2, rows: 2, y: 1, x: 5, label: 'Min rows & cols = 2',id:"demo7"},
      //      //view:{cols: 2, rows: 2, y: 1, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
      //    },
      //    {'label':'item8',
      //      //view:{cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
      //      view:{cols: 2, rows: 2, y: 2, x: 0, label: 'Max rows & cols = 2',id:"demo8"},
      //    },
      //    // {'label':'item9',
      //    //   view:{cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
      //    // },
      //    // {'label':'item10',
      //    //   view:{cols: 1, rows: 1, y: 2, x: 4, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Disabled'},
      //    // },
      //    // {'label':'item11',
      //    //   view:{cols: 1, rows: 1, y: 0, x: 6},
      //    // },
      //  ];
   }
   ngAfterViewInit(){
       let fullscreen = document.getElementById('fullscreen');
       if (fullscreen) {
        fullscreen.style.display="none";
        fullscreen.style.width = (document.body.clientWidth-250)+'px';
        //fullscreen.style.height = (document.body.clientHeight-150)+'px';
        fullscreen.style.height = 650+'px';
       }

   }
   changedOptions() {
       if (this.options.api && this.options.api.optionsChanged) {
           this.options.api.optionsChanged();
       }
   }
   /*初始化*/
   onChartInit(e: any,i:number) {
       //console.log(i);
       if( i===1 ){
           this.echartsInstance1 = e;
       }else if( i===2 ){
           this.echartsInstance2 = e;
       }
       //console.log('on chart init:', e);
   }
   removeItem(event?: any,item?: GridsterItem | undefined) {
    if (item) {
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }
   }

   // addItem() {
   //     this.dashboard.push({});
   // }
   zoomItem(event?: any,item?: any){
       if(item){
           /*ngSwitchCase 赋值 用来判断*/
           this.fullscreenIndex=item.view.id;
           let fullscreenEcharts = document.getElementById('fullscreenEcharts');
           /*根据屏幕宽度设置 放大后的echarts 宽高*/
           if(fullscreenEcharts){
           fullscreenEcharts.style.width = (document.body.clientWidth-275)+'px';
           fullscreenEcharts.style.height = (document.body.clientHeight-150)+'px';
           let a = {"demo1":this.echartsInstance1,"demo2":this.echartsInstance2} as any;
           a[item.view.id].resize();
            // (this.dashboard.find(item => item['view'].id === "demo1") as any).resize();

           }

       }
       let fullscreen = document.getElementById('fullscreen');
       let gridster = document.getElementById('gridster');
       if (fullscreen && gridster) {
        if(this.fullscreen === "fullscreen"){
          fullscreen.style.display="block";
          gridster.style.display="none";
          this.fullscreen = "fullscreen_exit" ;
          }else{
          fullscreen.style.display="none";
          gridster.style.display="block";
          this.fullscreen = "fullscreen";
          }
       }

   }
   /*向上*/
   upWard() {
       //this.fullscreenIndex;
       console.log(this.fullscreenIndex);
       let num= parseInt(this.fullscreenIndex.substr(this.fullscreenIndex.length-1,1));
       // console.log(typeof(num));
       if (num > 1){
               num =num - 1;
       }else{
           num = 8;
       }

       this.fullscreenIndex = 'demo' +num;
       //console.log(this.fullscreenIndex.substr(this.fullscreenIndex.length-1,1));
       console.log("upWard");
   }
   /*向下*/
   down() {
       console.log(this.fullscreenIndex);
       let num= parseInt(this.fullscreenIndex.substr(this.fullscreenIndex.length-1,1));
       // console.log(typeof(num));
       if (num < 8){
               num =num + 1;
       }else{
           num = 1;
       }

       this.fullscreenIndex = 'demo' +num;
       //console.log(this.fullscreenIndex.substr(this.fullscreenIndex.length-1,1));

       console.log("down");
   }

   emptyCellClick(event: MouseEvent, item: GridsterItem): void {
    console.info('empty cell click', event, item);
    item['label'] = "test";
    item['view'] = { cols: 2, rows: 2, y: 2, x: 0, label: 'Max rows & cols = 2', id: 'demo8' };
    this.dashboard.push(item);
  }
}
