import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServersService } from '../servers/servers.service';
import { Observable } from 'rxjs/Observable';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolverService implements Resolve<Server> {

  constructor(private serversService: ServersService) { }

  // this method will be called by angular when the route is loaded
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(+route.params['id']);
  }
}
