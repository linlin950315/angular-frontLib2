import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path:'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  //根模块路由通常用于整个应用的路由配置，通常是在 应用的主模块（如 AppModule）中配置。整个 Angular 应用只有一个使用 forRoot() 的地方
  exports: [RouterModule]
})
export class AppRoutingModule { }
