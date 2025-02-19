import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

//const routes: Routes = [];

//在各模块的 *-routing.module.ts 文件中，配置子模块路由。
const routes: Routes = [
  { path: '', component: AdminDashboardComponent },//http://localhost:4200/admin
  { path: 'book', component: BookListComponent },//展示所有书籍的列表;查看书籍详情，选择编辑或删除书籍。
  { path: 'book/:bookId', component: BookFormComponent },//管理员可以通过表单根据id查书籍信息。
  { path: 'books/new', component: BookFormComponent },//管理员可以通过表单提交书信息。用于添加书。
  { path: 'books/edit/:id', component: BookFormComponent },//管理员可以通过表单提交书籍信息。用于编辑书籍。
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  //子模块路由通常用于 功能模块（Feature Modules）内部的路由配置。子模块路由是针对特定模块的路由，通常在 懒加载模块中使用。在子模块内定义其自己的路由，而不需要影响应用的全局路由。
  exports: [RouterModule]
})
export class AdminRoutingModule { }

