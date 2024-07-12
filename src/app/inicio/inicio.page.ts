import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  user: any;
  isAdmin: boolean = false; // Variable para controlar si el usuario es admin

  constructor(private router: Router, private userService: UserService) {
    // Obtener el usuario actual al inicializar la página
    this.user = this.userService.getCurrentUser();
    this.isAdmin = this.userService.isAdmin(); // Verificar si el usuario es admin
  }

  ngOnInit() {}

  // Métodos para navegar a diferentes secciones
  irAlCatalogo() {
    this.navigateTo('/catalogo');
  }

  irAlCarrito() {
    this.navigateTo('/cart');
  }


  irAdministrar() {
    this.navigateTo('/administrar');
  }

  irAmodificar() {
    this.navigateTo('/modificar');
  }

  irAlistar() {
    this.navigateTo('/listar');
  }

  irApirest() {
    this.navigateTo('/apirest');
  }

  irAgeolocation() {
    this.navigateTo('/geolocation');
  }

  irApedidos() {
    this.navigateTo('/pedidos');
  }

  irAdemanda() {
    this.navigateTo('/demanda');
  }

  logout() {
    this.userService.logout(); // Llama al método de logout del UserService
    this.router.navigate(['/login'], { replaceUrl: true }); // Redirige al usuario a la página de inicio de sesión y reemplaza la URL
  }

  private navigateTo(path: string) {
    const navigationExtras: NavigationExtras = { state: { user: this.user } };
    this.router.navigate([path], navigationExtras);
  }
}
