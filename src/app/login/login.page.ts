import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    username: '',
    password: '',
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.dbState().subscribe(res => {
      if (res) {
        this.userService.fetchUsers().subscribe(users => {
        });
      }
    });
  }

  login() {
    if (this.validateUser()) {
      this.userService.fetchUsers().subscribe(users => {
        const user = users.find(u => u.nombre === this.user.username && u.password === this.user.password);
        if (user) {
          this.userService.setCurrentUser(user); // Establecer usuario actual
          let navigationExtras: NavigationExtras = {
            state: {
              user: this.user
            }
          };
          this.router.navigate(['/inicio'], navigationExtras);
        } else {
          this.userService.presentToast('Usuario o contraseña no válidos');
        }
      });
    } else {
      console.error('Usuario no válido');
    }
  }
  

  validateUser() {
    const usernamePattern = /^[a-zA-Z0-9]{3,8}$/;
    const passwordPattern = /^\d{4}$/;
    return (
      usernamePattern.test(this.user.username) && passwordPattern.test(this.user.password)
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
