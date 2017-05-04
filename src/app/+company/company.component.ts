import {Component} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Company} from '../model/index';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  private routeSub: Subscription;

  company: Company;
  constructor (private proxyService: ProxyService, private route: ActivatedRoute) {

    this.routeSub = this.route.params.subscribe(params => {
      let companyId = +params['companyId'];
      console.log(companyId);
    });
  }
}
