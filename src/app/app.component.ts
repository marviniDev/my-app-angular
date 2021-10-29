import { Component, OnInit, Input } from '@angular/core';
import { Estabelecimento } from './service/estabelecimento.model';
import { EstabelecimentoService } from './service/estabelecimento.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "";

  productDialog: boolean;

  products: Estabelecimento[];

  product: Estabelecimento;

  selectedProducts: Estabelecimento[];

  submitted: boolean;

  constructor(private estabelecimentoService: EstabelecimentoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.estabelecimentoService.getProducts().then(data => this.products = data);
  }

  pesquisar({ value }: any) {
    this.products = []
    this.estabelecimentoService.pesquisarEstabelecimento(value).then(data => this.products = data);
  }

  openNew() {
    this.product = {};
    this.submitted = true;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Estabelecimento) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Estabelecimento) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.nome + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.nome?.trim()) {
      if (this.product.id) {
        console.log(this.product.id);

        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      }
      else {
        this.product.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    console.log(id);

    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log(id);
    return id;
  }
}
