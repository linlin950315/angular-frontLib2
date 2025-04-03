import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
@NgModule({
  declarations: [
    AuthorsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatSortModule,
    MatSort,
    MatFormFieldModule,
    MatInputModule,
    AuthorsRoutingModule


  ],
  exports: [] // ✅ 如果不需要在别的模块使用，不要再写 AuthorsComponent
})
export class AuthorsModule { }
