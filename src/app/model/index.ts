
export interface Response {
  success: boolean;
  errCode?: number;
  data: any;
}

export interface Error {
  code: number;
  message: string;
}

export interface CompanyRaw {
  id: number;
  name: string;
  dailyData: string;
}

export class Company implements CompanyRaw{
  id: number;
  name: string;
  dailyData: string;

  static fromRaw(raw: CompanyRaw) {
    let instance = new Company();
    instance.id = raw.id;
    instance.name = raw.name;
    instance.dailyData = raw.dailyData;
    return instance;
  }
}