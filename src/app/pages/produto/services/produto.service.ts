import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  produtosPadrao!: Produto[];
  produtos!: Produto[];
  constructor(private http: HttpClient) {
    this.produtosPadrao = [
      { id: 1, nome: 'Produto 1', fabricante: 'Fabricante 1', preco: 100 },
      { id: 2, nome: 'Produto 2', fabricante: 'Fabricante 2', preco: 200 },
      { id: 2, nome: 'Produto 3', fabricante: 'Fabricante 3', preco: 300 },
      { id: 2, nome: 'Produto 4', fabricante: 'Fabricante 4', preco: 400 },
      { id: 2, nome: 'Produto 5', fabricante: 'Fabricante 5', preco: 500 },
      // outros produtos
    ];
    this.produtos = this.produtosPadrao;
  }

  listarProdutosPadrao(): Produto[] {
    return this.produtosPadrao;
  }

  excluirProduto(produtos: Produto[], id: number): void {
    produtos.splice(
      produtos.findIndex((it) => it.id === id),
      1
    );
  }
}
