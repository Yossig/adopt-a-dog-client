import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatGridListModule, MatDividerModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatIconModule, MatSliderModule } from '@angular/material';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


@NgModule({
  declarations: [ExploreComponent, FilterBarComponent],
  imports: [
    CommonModule,
    ExploreRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatSliderModule
  ],
  providers:[],
  bootstrap: [ExploreComponent]
})
export class ExploreModule { }
