import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  //子模块路由通常用于 功能模块（Feature Modules）内部的路由配置。子模块路由是针对特定模块的路由，通常在 懒加载模块中使用。在子模块内定义其自己的路由，而不需要影响应用的全局路由。
  exports: [RouterModule]
})
export class AdminRoutingModule { }
