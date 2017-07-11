/*
  Compomente corresponding to the fundamental analysis, contains a graph with all the daily data of the company.
 */

import {AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Company, StateBonus} from '../model/index';
import {ActivatedRoute} from '@angular/router';

declare var Highcharts: any;
declare var jQuery: any;

@Component({
  selector: 'app-chart-fundamental',
  templateUrl: './chart-fundamental.component.html',
  styleUrls: ['./chart-fundamental.component.css']
})
export class ChartFundamentalComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() companyId: number;
  private optionSelected: number = 1;
  private from: Date;
  private to: Date;
  private rangeSelected: boolean = false;
  private title: string;
  private chart: any;
  private series: any[];
  private data: any[];
  private seriesName: string[] = [
    'price',
    'difference',
    'percentageDifference',
    // 'capitalization',
    'BPA',
    'PER',
    'PVC',
    'PCF',
    'dividendYield',
    'interestPerShare',
    'max',
    'min',
    'volume'
  ];

  company: Company;
  stateBonus: StateBonus[];
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
      this.proxyService.getStateBonus(this.from.getTime(), this.to.getTime()).then(stateBonus => {
        this.stateBonus = stateBonus.map(StateBonus.fromRaw);
        this.stateBonus.sort(function(a, b){return a.date.getTime() - b.date.getTime(); });
        this.loadData();
        this.initGraph();
      });
    });
  }

  loadData() {
    this.data = [];
    let stateBonusData = [];
    for (let name of this.seriesName){
      this.data.push([]);
      for (let dailyData of this.company.dailyData){
        this.data[this.data.length - 1].push([dailyData.date.getTime(), dailyData[name]]);
      }
    }
    for (let stateB of this.stateBonus){
      stateBonusData.push([stateB.date.getTime(), stateB.stateBonus]);
    }
    this.series = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.seriesName[i] !== 'price') {
        this.series.push({
          name: this.seriesName[i],
          data: this.data[i],
          visible: false
        });
      } else {
        this.series.push({
          name: this.seriesName[i],
          data: this.data[i],
          visible: true
        });
      }
    }
    this.series.push({
      name: 'Sate Bonus',
      data: stateBonusData,
      visible: true
    });
  }

  initGraph() {
    let el = this.el.nativeElement;
    let $chartEl = jQuery(el).find('.chart');

    this.chart = $chartEl.highcharts({
      chart: {
        type: 'line',
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
