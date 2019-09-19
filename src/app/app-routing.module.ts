import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path:'', component: LoginComponent},
  { path:'login', component: LoginComponent},
  { path:'profile', component: ProfileComponent, canActivate: [RouteGuardService]},
  { path:'user/:id', component: UserComponent, canActivate: [RouteGuardService]},
  { path:'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  { path:'users', component: UsersComponent, canActivate: [RouteGuardService]},
  { path:'**', component: ErrorComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
