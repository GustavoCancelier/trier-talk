import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@triercloud/trier-ng';

const routes: Routes = [
  { path: '', redirectTo: 'produto', pathMatch: 'full' },
  {
    path: 'produto',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/produto/produto.module').then((m) => m.ProdutoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
