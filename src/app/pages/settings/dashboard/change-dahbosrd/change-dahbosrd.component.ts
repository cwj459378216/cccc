import { Component } from '@angular/core';

@Component({
  selector: 'app-change-dahbosrd',
  templateUrl: './change-dahbosrd.component.html',
  styleUrls: ['./change-dahbosrd.component.scss']
})
export class ChangeDahbosrdComponent {
  public disEdit: boolean = true;
  public data: any;
  public stats: any;
  constructor() {}

  ngOnInit() {
    this.data = [];
    const list = localStorage.getItem("testChartsList");
    if (list) {
      this.stats = JSON.parse(list);
      console.log(JSON.parse(list))
    }
  }
}
