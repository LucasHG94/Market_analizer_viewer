
import 'rxjs/add/operator/map';

export interface IAppConfig {
  host: string;
  port: number;
  password: string;
}

export var DefaultAppConfig: IAppConfig = {
    host: '0.0.0.0',
    port: 5000,
    password: '123'
};

export class AppConfig implements IAppConfig {
  host: string;
  port: number;
  password: string;

  static fromRaw(raw: IAppConfig) {
    let config = new AppConfig();
    config = {
      host: raw.host,
      port: raw.port,
      password: raw.password
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
  date: string;
  stateBonus: number;
  variation: number;
}

export class StateBonus {
  date: Date;
  stateBonus: number;
  variation: number;

  static fromRaw(raw: StateBonusRaw) {
    let instance = new StateBonus();
    instance.date = new Date(raw.date);
    instance.stateBonus = raw.stateBonus;
    instance.variation = raw.variation;
    return instance;
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
  min: number;
  max: number;
  volume: number;
  movingAverageFive: number;
  movingAverageTen: number;
  action: string;
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
  min: number;
  max: number;
  volume: number;
  movingAverageFive: number;
  movingAverageTen: number;
  action: string;

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
    instance.min = raw.min;
    instance.max = raw.max;
    instance.volume = raw.volume;
    instance.movingAverageFive = raw.movingAverageFive;
    instance.movingAverageTen = raw.movingAverageTen;
    instance.action = raw.action;
    return instance;
  }
}
