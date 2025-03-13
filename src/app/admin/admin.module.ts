import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoriesComponent } from './categories/categories.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    BookListComponent,// 声明组件
    BookFormComponent, CategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
   ReactiveFormsModule,
   MatPaginatorModule,
   MatTableModule,
   FormsModule,
   MatSortModule,
  ]
})
export class AdminModule { }
