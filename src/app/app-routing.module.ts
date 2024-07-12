import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'administrar',
    loadChildren: () => import('./administrar/administrar.module').then(m => m.AdministrarPageModule),
    canActivate: [AuthGuard] // Proteger la ruta con AuthGuard
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then( m => m.ListarPageModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: 'apirest',
    loadChildren: () => import('./apirest/apirest.module').then( m => m.ApirestPageModule)
  },
  
  
  {
    path: 'geolocation',
    loadChildren: () => import('./geolocation/geolocation.module').then( m => m.GeolocationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'compra',
    loadChildren: () => import('./compra/compra.module').then( m => m.CompraPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'demanda',
    loadChildren: () => import('./demanda/demanda.module').then( m => m.DemandaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then( m => m.ModificarPageModule),
    canActivate: [AuthGuard]
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
