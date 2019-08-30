import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedManageComponent } from './breed-manage.component';


const routes: Routes = [
  {
    path:'breed-manage',
    component: BreedManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedManageRoutingModule { }
