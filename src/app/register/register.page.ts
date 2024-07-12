// register.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  register() {
    this.userService.addUser(this.nombre, this.email, this.password).then(() => {
      this.userService.presentToast("Usuario registrado");
      
      // Llamar al método login para iniciar sesión automáticamente
      this.userService.login(this.nombre, this.password).then(() => {
        this.router.navigate(['/inicio'], { replaceUrl: true });
      }).catch((err: any) => {
        console.error("Error iniciando sesión automáticamente:", err);
        this.router.navigate(['/login'], { replaceUrl: true }); // Navega a login en caso de error
      });
      
    }).catch(err => {
      this.userService.presentToast("Error registrando usuario: " + err);
      this.router.navigate(['/login'], { replaceUrl: true }); // Navega a login incluso en caso de error
    });
  }
}


