import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor(private token: TokenService, private route: Router) { }

  ngOnInit(): void {
  }

  OnLogout(){
    const answer = window.confirm("Do you want to get logged out?");
    if(answer){
      this.token.deleteTokenValue();
      this.route.navigate(['/','login']);
    }
  }
}
