import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ExpenseCreateComponent } from './expense-create/expense-create.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login',pathMatch:'full'},
  {path: 'expense-list', component:ExpenseListComponent,canActivate:[AuthGuard]},
  {path: 'expense-Detail/:id', component:ExpenseDetailComponent,canActivate:[AuthGuard]},
  {path: 'expense-create', component:ExpenseCreateComponent,canActivate:[AuthGuard]},
  {path: 'expense-update/:id', component:ExpenseCreateComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
