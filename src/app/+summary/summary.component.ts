import {AfterViewChecked, Component, ElementRef, OnInit} from '@angular/core';
import {ProxyService} from '../proxy.service';


declare var jQuery: any;

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, AfterViewChecked {
  private companies: any[];
  constructor (private proxyService: ProxyService, private el: ElementRef) {
  }

  ngOnInit() {
    this.proxyService.getLastData().then(data => {
      this.companies = data;
      console.log(this.companies);
    });
  }

  ngAfterViewChecked() {
    jQuery(this.el.nativeElement).find('.data-table').DataTable();
  }
}
