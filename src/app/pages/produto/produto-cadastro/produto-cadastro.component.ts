import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss',
})
export class ProdutoCadastroComponent {
  @Input() produto!: Produto;
  @Output() onClose = new EventEmitter<void>();
}
