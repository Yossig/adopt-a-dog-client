import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedManageComponent } from './breed-manage.component';
import { BreedManageResolverService } from './breed-manage-resolver.service';


const routes: Routes = [
  {
    path: 'breed-manage',
    component: BreedManageComponent,
    resolve: {
      breeds: BreedManageResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreedManageRoutingModule { }
