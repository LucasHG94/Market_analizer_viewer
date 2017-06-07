import {Component, ElementRef, OnInit} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';


declare var Highcharts: any;
declare var jQuery: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  private routeSub: Subscription;
  private companyId: number;
  private companyName: string;
  constructor (private el: ElementRef, private proxyService: ProxyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.companyId = +params['companyId'];
      this.companyName = params['companyName'];
      console.log(this.companyName);
    });
  }

  reflowCharts() {
    setTimeout(() => {
      jQuery('.chart').each((index: any, value: any) => {
        let chartHandler = jQuery(value).highcharts();
        if (chartHandler) {chartHandler.reflow(); }
      });
    }, 300);
  }
}
