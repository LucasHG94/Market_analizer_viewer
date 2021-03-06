/*
  Component corresponding to the graphic of candles.
 */

import {AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Company} from '../model/index';
import {ActivatedRoute} from '@angular/router';

declare var Highcharts: any;
declare var jQuery: any;

@Component({
  selector: 'app-chart-candlestick',
  templateUrl: './chart-candlestick.component.html',
  styleUrls: ['./chart-candlestick.component.css']
})
export class ChartCandlestickComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() companyId: number;
  private optionSelected: number = 1;
  private from: Date;
  private to: Date;
  private rangeSelected: boolean = false;
  private title: string;
  private chart: any;
  private series: any[];
  private data: any[];
  private errorData: any[];

  company: Company;
  constructor (private el: ElementRef, private proxyService: ProxyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.to = new Date();
    this.from = new Date();
    this.from.setMonth(this.to.getMonth() - 1);
    this.updateView();
  }

  ngAfterContentInit() {
    let that = this;
    let el = this.el.nativeElement;
    jQuery(() => {
      jQuery(el).find('#reservation').daterangepicker(
        {
          locale: {
            format: 'DD-MM-YYYY'
          },
          startDate: this.from.getDate() + '-' + (this.from.getMonth() + 1) + '-' + this.from.getFullYear(),
          endDate: this.to.getDate() + '-' + (this.to.getMonth() + 1) + '-' + this.to.getFullYear()
        },
        function (start: Date, end: Date, label: any) {
          that.from = new Date(start);
          that.to = new Date(end);
          that.updateView();
        });
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (changes['companyId'] && changes['companyId'].currentValue) {
      this.ngOnInit();
    }
  }

  private updateView() {
    this.proxyService.getCompanyData(this.companyId, this.from.getTime(), this.to.getTime()).then(company => {
      this.company = Company.fromRaw(company);
      this.title = this.company.name;
      let date = new Date();
      Highcharts.setOptions({
        global: {
          getTimezoneOffset: date.getTimezoneOffset.bind(date)
        },
        credits: {
          enabled: false
        },
        chart: {
          resetZoomButton: {
            position: {
              // y: -40
            }
          }
        }
      });
      this.loadData();
      this.initGraph();
    });
  }

  loadData() {
    this.data = [];
    this.data.push([]);
    for (let dailyData of this.company.dailyData){
      this.data[this.data.length - 1].push([dailyData.date.getTime(), dailyData['price']]);
    }
    this.errorData = [];
    this.errorData.push([]);
    for (let dailyData of this.company.dailyData){
      this.errorData[this.data.length - 1].push([dailyData.date.getTime(), dailyData['min'], dailyData['max']]);
    }
    this.series = [];
    for (let i = 0; i < this.data.length; i++) {
      this.series.push({
        name: 'Precio',
        type: 'column',
        data: this.data[i]
      });
    }
    for (let i = 0; i < this.errorData.length; i++) {
      this.series.push({
        name: 'Mínimo y máximo',
        type: 'errorbar',
        data: this.errorData[i]
      });
    }
    // data: [[48, 51], [68, 73], [92, 110], [128, 136], [204, 220], [189, 199], [95, 110], [52, 56]]
  }

  initGraph() {
    let el = this.el.nativeElement;
    let $chartEl = jQuery(el).find('.chart');

    this.chart = $chartEl.highcharts({
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Datos generales',
        // x: -20
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e %b',
        },
        title: {
          text: 'Fecha'
        }
      },
      yAxis: {
        title: {
          text: 'Datos de la empresa'
        }
      },
      tooltip: {
        shared: true,
        crosshairs: true,
        dateTimeLabelFormats: {
          day: '%e %b',
        }
      },
      legend: {
        enable: false,
      },
      series: this.series
    });

    this.chart = $chartEl.highcharts();
  }

  formatRange(from: Date, to: Date) {
    let range: string;
    range = from.getDate() + '-' + (from.getMonth() + 1) + '-' + from.getFullYear();
    range += ', ';
    range += to.getDate() + '-' + (to.getMonth() + 1) + '-' + to.getFullYear();
    return range;
  }

  private radioChange(option: number) {
    switch (option) {
      case 1:
        this.optionSelected = 1;
        this.to = new Date();
        this.from = new Date();
        this.from.setMonth(this.to.getMonth() - 1);
        this.rangeSelected = false;
        this.updateView();
        break;
      case 2:
        this.optionSelected = 2;
        this.to = new Date();
        this.from = new Date();
        this.from.setMonth(this.to.getMonth() - 3);
        this.rangeSelected = false;
        this.updateView();
        break;
      case 3:
        this.optionSelected = 3;
        this.rangeSelected = true;
        this.updateView();
        break;
      default:
        this.updateView();
    }
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
