import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  user = {email:'',password:''};

  onSubmit(){
    alert(this.user.email);
    this.userService

  }

  constructor(private userService:UserService){}

}
