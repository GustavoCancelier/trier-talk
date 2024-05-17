import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';
import { ProdutoService } from '../services/produto.service';
import { ProdutoDetalheComponent } from '../produto-detalhe/produto-detalhe.component';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.scss',
})
export class ProdutoListaComponent implements OnInit {
  @ViewChild('detalhes') detalhesComponent!: ProdutoDetalheComponent;

  produtos!: Produto[];
  selectedProduto?: Produto;
  editingProduto?: Produto;
  editOpen = false;
  produtoToEdit?: Produto;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtos = this.produtoService.listarProdutosPadrao();
  }

  selectProduto(produto: Produto): void {
    this.selectedProduto = produto;
    this.editingProduto = undefined;
  }

  clearSelection(): void {
    this.selectedProduto = undefined;
  }

  excluirSelected(event: Produto): void {
    this.produtoService.excluirProduto(this.produtos, event.id!);
  }

  incrementarPreco(produto: Produto) {
    this.detalhesComponent.incrementarPreco(produto);
  }

  onProdutoChange(event: Produto): void {
    this.produtos.find((it) => it.id === event.id);
  }

  openEditar(produto: Produto): void {
    this.editOpen = true;
    this.produtoToEdit = produto;
  }

  onCloseEdit(): void {
    this.editOpen = false;
    this.produtoToEdit = undefined;
  }
}
