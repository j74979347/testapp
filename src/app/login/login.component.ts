import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    username: '',
    password: ''
 };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  signin() {
    Auth.signIn(this.user).then(user => {
      console.log(user);
      this.router.navigateByUrl('/dashboard');
    })
      .catch(err => alert(err));
  }


}
