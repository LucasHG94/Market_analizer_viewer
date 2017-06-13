import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CompanyComponent} from './+company/company.component';
import {SummaryComponent} from './+summary/summary.component';


const routes: Routes = [
  {path: '', component: SummaryComponent},
  {path: 'company/:companyId/:companyName', component: CompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
