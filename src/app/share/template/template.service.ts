import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private dataSubject: Subject<any> = new Subject<any>();
  private data$: Observable<any> = this.dataSubject.asObservable();

  constructor() { }

   // 发布数据
   publishData(data: any) {
    this.dataSubject.next(data);
  }

   // 订阅数据
   subscribeData(callback: (data: any) => void): Subscription {
    return this.data$.subscribe(callback);
  }

    // 在组件销毁时取消订阅
    unsubscribe(subscription: Subscription) {
      subscription.unsubscribe();
    }
}
