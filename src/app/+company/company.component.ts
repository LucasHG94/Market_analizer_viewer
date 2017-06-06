import {Component, ElementRef, OnInit} from '@angular/core';
import {ProxyService} from '../proxy.service';
import {Company, StateBonus} from '../model/index';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';


declare var Highcharts: any;
declare var jQuery: any;


export interface ChartConfig {
  title: string;
  yAxes?: ChartYAxis[];
  series?: ChartSeries[];
}

export interface ChartYAxis {
  labels: {
    format: string;
  };
  title: {
    text: string
  };
  opposite: boolean;
  showEmpty: boolean;
}

export interface ChartSeries {
  name: string;
  type: string;
  yAxis: number;
  data: any[];
  tooltip?: {
    valueSuffix: string;
  };
  realm?: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  private routeSub: Subscription;

  private title: string;
  private chart: any;
  private series: any[];
  private data: any[];
  private seriesName: string[] = [
    'price',
    'difference',
    'percentageDifference',
    'capitalization',
    'BPA',
    'PER',
    'PVC',
    'PCF',
    'dividendYield',
    'interestPerShare',
    'lastValue',
    'max',
    'min',
    'volume'
  ];

  company: Company;
  stateBonus: StateBonus[];
  constructor (private el: ElementRef, private proxyService: ProxyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let companyId = +params['companyId'];
      console.log(companyId);
      this.proxyService.getCompanyData(companyId).then(company => {
        this.company = Company.fromRaw(company);
        this.title = this.company.name;
        console.log(this.company);
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
        this.proxyService.getStateBonus().then(stateBonus => {
          this.stateBonus = stateBonus.map(StateBonus.fromRaw);
          this.stateBonus.sort(function(a, b){return a.date.getTime() - b.date.getTime()});
          console.log(stateBonus);
          this.loadData();
          this.initGraph();
        });
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
      if (this.seriesName[i] !== 'BPA' && this.seriesName[i] !== 'PER') {
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
    console.log(this.series);
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
}
