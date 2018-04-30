import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from './servers/server/server-resolver.service';

/* set up routes; This does nothing until registered
   ** route is a catch-all for any route that may be wrong
   make sure this is the LAST route
*/
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
  ] },
  /* : indicates dynamic parameter */
  {
    path: 'servers',
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      // the data from the resolver will be available in the property mapped to the resolver; in this case 'server'
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent},
  // can send the data for the message
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true}) // support older browsers/server
    RouterModule.forRoot(appRoutes) // now routes registered
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
