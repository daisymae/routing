import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    console.log('reload page');
    /*
    can use '/servers' here, but also can use relative 'servers'
    if using relative, need to tell Angular what the path is relativeTo
    the default is '/' so relative or absolute are the same if they are
    relativeTo root, which is the case here, but want to show how the code
    works if it were not the case
    This breaks the code here because will try to go to 'servers/servers'
    */
    // this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
