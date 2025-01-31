import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; //
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { BookFormComponent } from './admin/book-form/book-form.component';
import { BookListComponent } from './admin/book-list/book-list.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, children: [
    { path: 'booklist', component: BookListComponent },
    { path: 'bookform', component: BookFormComponent },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminDashboardComponent,
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),//根模块
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
