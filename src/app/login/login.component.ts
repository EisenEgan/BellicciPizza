import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: String
  password: String

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLoginSubmit() {
    if (this.username && this.password) {
      const user = {
        username: this.username,
        password: this.password
      }

      this.authService.loginUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user)
          this.router.navigate(['admin/dashboard'])
        } else {
          this.router.navigate(['admin/login'])
        }
      })
    }
  }
}
