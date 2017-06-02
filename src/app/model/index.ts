
import 'rxjs/add/operator/map';

export interface IAppConfig {
  host: string;
  port: number;
}

export var DefaultAppConfig: IAppConfig = {
    host: '0.0.0.0',
    port: 5000
};

export class AppConfig implements IAppConfig {
  host: string;
  port: number;

  static fromRaw(raw: IAppConfig) {
    let config = new AppConfig();
    config = {
      host: raw.host,
      port: raw.port
    };
    return config;
  }
}

export interface Response {
  success: boolean;
  errCode?: number;
  data: any;
}

export interface Error {
  code: number;
  message: string;
}

export interface StateBonusRaw {
  date: number;
  stateBonus: number;
  variation: number;
}

export class StateBonus {
  date: number;
  stateBonus: number;
  variation: number;

  static fromRaw(raw: StateBonusRaw) {
    let instance = new StateBonus();
    instance.date = raw.date;
    instance.stateBonus = raw.stateBonus;
    instance.variation = raw.variation;
  }
}

export interface CompanyRaw {
  id: number;
  name: string;
  marketType: string;
  dailyData: DailyDataRaw[];
}

export class Company {
  id: number;
  name: string;
  marketType: string;
  dailyData: DailyData[];

  static fromRaw(raw: CompanyRaw) {
    let instance = new Company();
    instance.id = raw.id;
    instance.name = raw.name;
    instance.marketType = raw.marketType;
    if (raw.dailyData) {
      instance.dailyData = raw.dailyData.map(DailyData.fromRaw);
    }
    return instance;
  }
}

export interface DailyDataRaw {
  date: string;
  companyId: number;
  company: number;
  price: number;
  difference: number;
  percentageDifference: number;
  capitalization: number;
  BPA: number;
  PER: number;
  PVC: number;
  PCF: number;
  dividendYield: number;
  interestPerShare: number;
  lastValue: number;
  min: number;
  max: number;
  volume: number;
}

export class DailyData {
  date: Date;
  companyId: number;
  company: number;
  price: number;
  difference: number;
  percentageDifference: number;
  capitalization: number;
  BPA: number;
  PER: number;
  PVC: number;
  PCF: number;
  dividendYield: number;
  interestPerShare: number;
  lastValue: number;
  min: number;
  max: number;
  volume: number;

  static fromRaw(raw: DailyDataRaw) {
    let instance = new DailyData();
    instance.date = new Date(raw.date);
    instance.companyId = raw.companyId;
    instance.company = raw.company;
    instance.price = raw.price;
    instance.difference = raw.difference;
    instance.percentageDifference = raw.percentageDifference;
    instance.capitalization = raw.capitalization;
    instance.BPA = raw.BPA;
    instance.PER = raw.PER;
    instance.PVC = raw.PVC;
    instance.PCF = raw.PCF;
    instance.dividendYield = raw.dividendYield;
    instance.interestPerShare = raw.interestPerShare;
    instance.lastValue = raw.lastValue;
    instance.min = raw.min;
    instance.max = raw.max;
    instance.volume = raw.volume;
    return instance;
  }
}
