import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.scss',
})
export class ProdutoDetalheComponent {
  @Input() produto!: Produto;
  @Output() onClose = new EventEmitter<void>();
  @Output() onExcluir = new EventEmitter<Produto>();
  mensagemDeInicializacao = 'Componente de detalhes iniciado';

  excluir(produto: Produto): void {
    this.onExcluir.emit(produto);
  }

  incrementarPreco(produto: Produto): void {
    produto.preco++;
  }
}
