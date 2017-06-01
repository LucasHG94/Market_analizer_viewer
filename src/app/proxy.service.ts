import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppConfig, CompanyRaw, Response, StateBonusRaw} from './model/index';

@Injectable()
export class ProxyService {

  static buildRejectMessage(response: Response) {
    console.error(response);
    return '[ERROR] errCode: ' + response.errCode + ', message: ' + response.data;
  }
  constructor (private http: Http, @Inject('AppConfig') private appConfig: AppConfig) {}

  private get URL(): string {
    return 'http://' + this.appConfig.host + ':' + this.appConfig.port + '/';
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

    getStateBonus(): Promise<StateBonusRaw[]> {
        return this.http.get(this.URL + 'getStateBonus')
            .toPromise()
            .then(response => {
                let res: Response = response.json();
                if (res.success) {
                    return res.data as StateBonusRaw[];
                } else {
                    return ProxyService.buildRejectMessage(res);
                }
            }).catch(this.handleError);
    }

    getCompanies(): Promise<CompanyRaw[]> {
        return this.http.get(this.URL + 'getCompanies')
            .toPromise()
            .then(response => {
                let res: Response = response.json();
                if (res.success) {
                    return res.data as CompanyRaw[];
                } else {
                    return ProxyService.buildRejectMessage(res);
                }
            }).catch(this.handleError);
    }

    getIBEX35Companies(): Promise<CompanyRaw[]> {
        return this.http.get(this.URL + 'getIBEX35Companies')
            .toPromise()
            .then(response => {
                let res: Response = response.json();
                if (res.success) {
                    return res.data as CompanyRaw[];
                } else {
                    return ProxyService.buildRejectMessage(res);
                }
            }).catch(this.handleError);
    }

  getCompanyData(companyId: number): Promise<CompanyRaw> {
    return this.http.get(this.URL + 'getCompanyData/' + companyId)
        .toPromise()
        .then(response => {
          let res: Response = response.json();
          if (res.success) {
            return res.data as CompanyRaw;
          } else {
            return ProxyService.buildRejectMessage(res);
          }
        }).catch(this.handleError);
  }

}
