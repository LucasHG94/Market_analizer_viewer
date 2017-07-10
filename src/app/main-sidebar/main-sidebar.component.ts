/*
 Compomente corresponding to the sidebar with a menu with all the companies.
 */

import {Component, ElementRef, Inject} from '@angular/core';
import 'rxjs/add/operator/map';
import {ProxyService} from '../proxy.service';
import 'rxjs/add/operator/toPromise';
import {AppConfig, Company} from '../model/index';

declare var jQuery: any;

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {

  IBEX35: Company[];
  BME: Company[];
  password: string;
  logged: boolean = false;
  sent: boolean = false;
  constructor (private el: ElementRef, private proxyService: ProxyService, @Inject('AppConfig') private appConfig: AppConfig) {
    this.getCompanies();
  }
  getCompanies() {
    this.IBEX35 = [];
    this.proxyService.getCompanies().then(companies => {
      this.mangeModal();
      this.BME = companies.map(Company.fromRaw);
      for (let company of this.BME){
        if (company.marketType === 'IBEX35') {
          this.IBEX35.push(company);
        }
      }
    });
  }

  mangeModal() {
    let that = this;
    jQuery(this.el.nativeElement).children('#managerModal').modal('show');
    jQuery(this.el.nativeElement).children('#managerModal').on('hidden.bs.modal', function () {
      if (!that.logged) {
        jQuery(that.el.nativeElement).children('#managerModal').modal('show');
      }
    });
  }

  access() {
    if (this.password === this.appConfig.password) {
      this.logged = true;
      jQuery(this.el.nativeElement).children('#managerModal').modal('hide');
    } else {
      this.sent = true;
    }
  }
}
