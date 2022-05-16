import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {

  username:string;
  constructor(private httpClient: HttpClient, private token: TokenService, private route: Router){

  }
  OnSubmit(username: string,password: string){
    //console.log(user,pass);
    const body={username,password};
    this.httpClient.post<{token: string}>("http://localhost:4000/login",body).subscribe(data=>{
      //console.log(data);
      this.token.setTokenValue(data.token);
      this.route.navigate(['/','child'])
    })
  }

  OnVerify(){
    this.httpClient.get<{user:string}>("http://localhost:4000/verify").subscribe(data=>{
        this.username=data.user;
    })
  }
}
