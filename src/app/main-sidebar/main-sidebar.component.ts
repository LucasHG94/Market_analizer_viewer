import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import {ProxyService} from '../proxy.service';
import 'rxjs/add/operator/toPromise';
import {Company} from "../model/index";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent {

  companies: Company[];
  constructor (private proxyService: ProxyService) {
    this.proxyService.getCompanies().then(companies => {
      this.companies = companies.map(Company.fromRaw);
      console.log(this.companies);
    });
  }
}
