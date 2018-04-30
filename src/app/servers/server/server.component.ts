import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    // use the resolver to get the data:
    this.route.data
      .subscribe(
        (data: Data) => {
          // the name used here to retrieve from 'data' MUST match the name used
          // to map the resolver in the route definition
          this.server = data['server'];
        }
      );
    // console.log(this.route.snapshot.params);
    // // id is a number, so add '+' to convert the string parameter
    // const currentId = +this.route.snapshot.params['id'];
    // console.log('currentId: ' + currentId);
    // this.server = this.serversService.getServer(currentId);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
  }

  onEdit() {
    // append edit to the current route
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
