import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreedManageRoutingModule } from './breed-manage-routing.module';
import { BreedManageComponent } from './breed-manage.component';
import { MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatTooltipModule, MatToolbarModule, MatOptionModule, MatSelectModule, MatInputModule, MatDialogModule } from '@angular/material';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BreedManageComponent, FilterBarComponent, EditComponent],
  imports: [
    CommonModule,
    BreedManageRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents:[EditComponent]
})
export class BreedManageModule { }
