import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import {ProxyService} from '../proxy.service';
import 'rxjs/add/operator/toPromise';
import {Company} from '../model/index';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {

  IBEX35: Company[];
  BME: Company[];
  constructor (private proxyService: ProxyService) {
    this.IBEX35 = [];
    this.proxyService.getCompanies().then(companies => {
      this.BME = companies.map(Company.fromRaw);
      for (let company of this.BME){
        if (company.marketType === 'IBEX35') {
          this.IBEX35.push(company);
        }
      }
    });
  }
}
