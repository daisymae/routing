import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    console.log(this.route.snapshot.params);
    // id is a number, so add '+' to convert the string parameter
    const currentId = +this.route.snapshot.params['id'];
    console.log('currentId: ' + currentId);
    this.server = this.serversService.getServer(currentId);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

  onEdit() {
    // append edit to the current route
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
