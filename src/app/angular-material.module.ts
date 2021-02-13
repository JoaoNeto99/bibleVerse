import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  imports: [
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
   ],
  exports: [
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: []
})

export class AngularMaterialModule { }
