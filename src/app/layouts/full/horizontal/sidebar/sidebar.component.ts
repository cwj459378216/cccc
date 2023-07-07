import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { navItems } from './sidebar-data';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppHorizontalNavItemComponent } from './nav-item/nav-item.component';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { TemplateService } from 'src/app/share/template/template.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horizontal-sidebar',
  standalone: true,
  imports: [AppHorizontalNavItemComponent, NgIf, NgForOf, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class AppHorizontalSidebarComponent implements OnInit {
  navItems = navItems;
  parentActive = '';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  data: any;
  subscription: Subscription;

  constructor(
    public navService: NavService,
    public router: Router,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private templateService: TemplateService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1100px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.events.subscribe(
      () => (this.parentActive = this.router.url.split('/')[1])
    );


  }

  ngOnInit(): void {
    this.testData();
    this.testData();
    this.subscription = this.templateService.subscribeData((data: any) => {
      this.testData();

    });
  }

  testData() {
    const dashboard = localStorage.getItem("dashboard");
    if (dashboard) {
      const arr = JSON.parse(dashboard);
      this.navItems.forEach(e => {
        if (e.displayName == "Dashboards") {
          e.children = e.children?.filter(c => c.route !== 'dashboards/dashboard3');
          arr.forEach((b: any) => {
            const obj = {
              displayName: b.title,
              iconName: 'point',
              route: 'dashboards/dashboard3',
              id: b.title
            };
            e.children?.push(obj);
          })
        }
      })
    }
  }

  ngOnDestroy() {
    this.templateService.unsubscribe(this.subscription);
  }
}
