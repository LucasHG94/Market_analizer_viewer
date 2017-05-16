import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CompanyRaw, DailyDataRaw, Response, StateBonusRaw} from './model';


@Injectable()
export class ProxyService {

  url = 'http://0.0.0.0:5000/';

  static buildRejectMessage(response: Response) {
    console.error(response);
    return '[ERROR] errCode: ' + response.errCode + ', message: ' + response.data;
  }
  constructor (private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

    getStateBonus(): Promise<StateBonusRaw[]> {
        return this.http.get(this.url + 'getStateBonus')
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
        return this.http.get(this.url + 'getCompanies')
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
        return this.http.get(this.url + 'getIBEX35Companies')
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
    return this.http.get(this.url + 'getCompanyData/' + companyId)
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
