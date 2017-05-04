import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Company, Response} from './model';


@Injectable()
export class ProxyService {

  url = 'http://0.0.0.0:5000/companies';

  static buildRejectMessage(response: Response) {
    console.error(response);
    return '[ERROR] errCode: ' + response.errCode + ', message: ' + response.data;
  }
  constructor (private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCompanies(): Promise<Company[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => {
        let res: Response = response.json();
        if (res.success) {
          return res.data as Company[];
        } else {
          return ProxyService.buildRejectMessage(res);
        }
      }).catch(this.handleError);
  }

}