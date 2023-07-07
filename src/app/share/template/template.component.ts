import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GridsterConfig,GridsterItem } from "angular-gridster2";
import { TemplateService } from './template.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit{
  [key: string]: any;
  @Input() disEdit: boolean;
  @Input() dashboard: Array<GridsterItem> = [];
  public name: string;

  public options!: GridsterConfig;
  public fullscreen:string="fullscreen";
  public fullscreenIndex:string="demo1";
  public echartsInstance1:any;
  public echartsInstance2:any;
  public echartsOption1: any;
  public echartsOption2: any;
  gridsterContainerHeight: string = '900px';
  static itemChange(item: any, itemComponent: any) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }
  // @ViewChild('lineChat') lineChat: AppLineChartComponent;

  @Input() stats: any;
  // public stats = [
  //   {
  //     id: "0",
  //     type: "echarts",
  //     color: 'primary',
  //     title: 'HTTP Chat',
  //     subtitle: '',
  //     img: 'assets/images/svgs/icon-paypal.svg',
  //     percent: '623 G',
  //     enable: true,
  //     option: {
  //       title: {
  //           text: '折线图堆叠'
  //       },
  //       tooltip: {
  //           trigger: 'axis'
  //       },

  //       grid: {
  //           left: '3%',
  //           right: '4%',
  //           bottom: '3%',
  //           containLabel: true
  //       },
  //      //  toolbox: {
  //      //      feature: {
  //      //          saveAsImage: {}
  //      //      },
  //      //      right:'10%'
  //      //  },
  //       xAxis: {
  //           type: 'category',
  //           boundaryGap: false,
  //           data: ['周一','周二','周三','周四','周五','周六','周日']
  //       },
  //       yAxis: {
  //           type: 'value'
  //       },
  //       series: [
  //           {
  //               name:'邮件营销',
  //               type:'line',
  //               stack: '总量',
  //               data:[120, 132, 101, 134, 90, 230, 210]
  //           },
  //           {
  //               name:'联盟广告',
  //               type:'line',
  //               stack: '总量',
  //               data:[220, 182, 191, 234, 290, 330, 310]
  //           },
  //           {
  //               name:'视频广告',
  //               type:'line',
  //               stack: '总量',
  //               data:[150, 232, 201, 154, 190, 330, 410]
  //           },
  //           {
  //               name:'直接访问',
  //               type:'line',
  //               stack: '总量',
  //               data:[320, 332, 301, 334, 390, 330, 320]
  //           },
  //           {
  //               name:'搜索引擎',
  //               type:'line',
  //               stack: '总量',
  //               data:[820, 932, 901, 934, 1290, 1330, 1320]
  //           }
  //       ]
  //     }
  //   },
  //   {
  //     id: "1",
  //     type: "echarts",
  //     color: 'success',
  //     title: 'DNS Chat',
  //     subtitle: '',
  //     img: 'assets/images/svgs/icon-office-bag.svg',
  //     percent: '345 G',
  //     enable: true,
  //     option: {
  //       title: {
  //           text: '折线图堆叠'
  //       },
  //       tooltip: {
  //           trigger: 'axis'
  //       },

  //       grid: {
  //           left: '3%',
  //           right: '4%',
  //           bottom: '3%',
  //           containLabel: true
  //       },
  //      //  toolbox: {
  //      //      feature: {
  //      //          saveAsImage: {}
  //      //      },
  //      //      right:'10%'
  //      //  },
  //       xAxis: {
  //           type: 'category',
  //           boundaryGap: false,
  //           data: ['周一','周二','周三','周四','周五','周六','周日']
  //       },
  //       yAxis: {
  //           type: 'value'
  //       },
  //       series: [
  //           {
  //               name:'邮件营销',
  //               type:'line',
  //               stack: '总量',
  //               data:[120, 132, 101, 134, 90, 230, 210]
  //           },
  //       ]
  //     }
  //   }
  // ];
  private selectedWeight: any;
   constructor(private router: Router,
    private templateService: TemplateService
   ) { }
   webSite: any[] = [ ];
   salesData: any[] =  [ ];
   offlineChartData: any[] = [];

   ngOnInit() {

       let self = this;
      //  this.http.get('/chart').subscribe((res: any) => {
      //      this.webSite = res.visitData.slice(0, 10);
      //      this.salesData = res.salesData;
      //      this.offlineChartData = res.offlineChartData;
      //  });
       this.options = {
           gridType: 'fit',
           compactType: 'none',/*对齐类型*/
           itemChangeCallback:function (item,itemComponent){
              self.echartsResize(item, itemComponent);
               console.info('itemChanged', item, itemComponent);
              //  let echarts = document.getElementById(`${item['type']} + ${item['id']}`);

               // const chart = new G2.Chart({
               //     container: document.getElementById(`${item.id}`),
               //     forceFit: true,
               //     height: itemComponent.height-30
               // });
               // chart.forceFit()

              //  if(echarts){/*在gridster2 Change的时候出发echarts的resize方法*/
              //     echarts.style.width = itemComponent.width - 50 +'px';
              //      echarts.style.height = itemComponent.height - 80+'px';
              //     console.log(item)
              //      // /*根据不同的模块 重置相应的图*/
              //      let a = {"echarts1":self.echartsInstance1,"echarts2":self.echartsInstance2} as any;
              //      a[item['id']].resize();
              //  }
              //  if (self.lineChat) {
              //   console.log(self)
              //   self.lineChat.resizeChart();
              //  }
               console.log('itemChangeCallback', item, itemComponent);
           },
           itemResizeCallback:function (item, itemComponent){
              self.echartsResize(item, itemComponent);
               // const chart = new G2.Chart({
               //     container: document.getElementById(`${item.id}`),
               //     forceFit: true,
               //     height: itemComponent.height-30
               // });
               //chart.forceFit()
              //  let echarts = document.getElementById(`${item['type']}${item['id']}`);
              //  if(echarts){/*在gridster2 resize的时候出发echarts的resize方法*/
              //      echarts.style.width = itemComponent.width - 50 +'px';
              //      echarts.style.height = itemComponent.height - 80+'px';
              //      self.dashboard.forEach( chart => {
              //       if (chart["type"] == "echarts") {
              //         self[`${chart['type']}${chart['id']}`].resize();
              //       }
              //   });
               //     /*根据不同的模块 重置相应的图*/
                // console.log(self)
                  //  console.log(self['echartsInstance1'])
                  //  setTimeout(()=>{

                  // //  let a = {"echarts0":self.echartsInstance1,"echarts1":self.echartsInstance2} as any;
                  // //   console.log("延迟打印")
                  // //   // console.log(self['echartsInstance1'])
                  // //   a[item[`${item['type']}${item['id']}`]].resize();
                  //  },1000);
              //  }
              //  if (self.lineChat) {
              //   console.log(self)
              //   self.lineChat.resizeChart();
              //  }
                   //console.log('itemResize', item, itemComponent);
               console.log('itemResizeCallback', item, itemComponent);
           },
           margin: 30, // 间隙
           outerMargin: false,
          //  outerMarginRight：0，
          //  minCols: 1,
          //  maxCols: 8,
          //  minRows: 1,
          //  maxRows: 10,
          //  maxItemCols: 5,
          //  minItemCols: 1,
          //  maxItemRows: 5,
          //  minItemRows: 1,
          //  defaultItemCols: 1,
          //  defaultItemRows: 1,
          //  fixedColWidth: 250,
          //  fixedRowHeight: 250,
           draggable: { /*是否可拖拽*/
               enabled: this.disEdit,
               /*stop: AppComponent.eventStop*/
           },
           resizable: { /*是否可以缩放*/
               enabled: this.disEdit,
               /*stop: AppComponent.eventStop*/
           },
           swap: false,
           displayGrid: 'onDrag&Resize' /*显示行和列的背景网格。选项：'永远' 缩放和拖拽时| 从不*/,
           pushItems: true,
           enableEmptyCellDrop: true, // 启动拖拽添加
           emptyCellDropCallback: this.emptyCellClick.bind(this),

        enableOccupiedCellDrop: true, // 从第一个开启拖拽添加会有问题，如果不开启
        emptyCellDragCallback: this.emptyCellClick.bind(this),


       };

      //  this.dashboard =[];
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

   echartsResize(item: any, itemComponent: any) {
    let echarts = document.getElementById(`${item['type']}${item['label']}`);
    if(echarts){/*在gridster2 resize的时候出发echarts的resize方法*/
        echarts.style.width = itemComponent.width - 50 +'px';
        echarts.style.height = itemComponent.height - 80+'px';
        console.log(this.dashboard)
        console.log(this)
        this.dashboard.forEach( chart => {
         if (chart["type"] == "echarts") {
           this[`${chart['type']}${chart['label']}`].resize();
         }
      });
    }
   }

   changedOptions() {
       if (this.options.api && this.options.api.optionsChanged) {
           this.options.api.optionsChanged();
       }
   }
   /*初始化*/
   onChartInit(e: any,chat:string) {
       this[chat] = e;
      //  if( chat=== 'echarts0' ){
      //      this.echartsInstance1 = e;
      //  }else if( chat=== 'echarts1' ){
      //      this.echartsInstance2 = e;
      //  }
   }
   removeItem(event?: any,item?: GridsterItem | undefined) {
    if (item) {
      console.log(item)
      this.dashboard.splice(this.dashboard.indexOf(item), 1);
      this.stats.forEach((e: any) => {
        if (e.id == item['view'].id) {
          e.enable = true;
        }
      })
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
    item['label'] = this.selectedWeight.title;

    this.stats.filter((e: any) => {
      if (e.title == this.selectedWeight.title) {
        e.enable = false;
        item['view'] = {...item, id: this.selectedWeight.id, option: e.option, type: e.type };
      }
    })
    console.log(item)
    this.dashboard.push(item);
  }

  dragStartHandler(ev: DragEvent, data: any): void {
    this.selectedWeight = data;
    // if (ev.dataTransfer) {
    //   ev.dataTransfer.setData('text/plain', 'Drag Me Button');
    //   ev.dataTransfer.dropEffect = 'copy';
    //   console.log(ev)
    // }
  }

  saveDashboard() {
    this.testSave();
    this.templateService.publishData("ok");
    this.router.navigate(['/settings/dashboard']);

  }

  testSave() {
    const data = {
      data: this.dashboard,
      title: this.name,
      status: "true",
      modified: new Date().toLocaleString()
    }
    const list = localStorage.getItem("dashboard");
    if (list) {
      const arr = JSON.parse(list);
      arr.push(data);
      localStorage.setItem("dashboard", JSON.stringify(arr));
    } else {
      const arr = [];
      arr.push(data);
      localStorage.setItem("dashboard", JSON.stringify(arr));
    }
  }
}
