/**********************************************************************************************
Code generated by TrierDSL Plug-in
WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TngButtonModule,
  TngFilterPerfilModule,
  TngHotkeyModule,
  TngStickyModule,
  TngTableModule,
  TngTagModule,
} from '@triercloud/trier-ng';
import { ProdutoDetalheModule } from '../produto-detalhe/produto-detalhe.module';
import { ProdutoListaComponent } from './produto-lista.component';
import { FilhoPrincipalModule } from '../components/filho-principal/filho-principal.module';
import { FilhoSecundarioModule } from '../components/filho-secundario/filho-secundario.module';
import { CardModule } from 'primeng/card';
import { ProdutoCadastroModule } from '../produto-cadastro/produto-cadastro.module';

@NgModule({
  declarations: [ProdutoListaComponent],
  imports: [
    CommonModule,
    //TngPerfilModule.forRoot({ menuId }),
    TngFilterPerfilModule,
    TngTableModule,
    TngTagModule,
    TngStickyModule,
    TngButtonModule,
    TngHotkeyModule,
    ProdutoDetalheModule,
    ProdutoCadastroModule,
    FilhoPrincipalModule,
    FilhoSecundarioModule,
    CardModule,
  ],
  exports: [ProdutoListaComponent],
})
export class ProdutoListaModule {}
