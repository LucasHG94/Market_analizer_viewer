import {Component} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Company} from '../model/index';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class CompanyComponent {

  company: Company;
  constructor (private proxyService: ProxyService) {
  }
}
