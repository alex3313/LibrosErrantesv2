import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Obtener el usuario actual
    const currentUser = this.userService.getCurrentUser();

    if (currentUser && currentUser.nombre === 'admin') {
      // El usuario está autenticado y es admin
      return true;
    } else {
      // El usuario no está autorizado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
