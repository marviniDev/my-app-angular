import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Estabelecimento } from './estabelecimento.model';

@Injectable()
export class EstabelecimentoService {
  apiData: any;

  constructor(private http: HttpClient) { }

  fetchData() {
    return this.http.get('/api/data').subscribe((data) => {
      this.apiData = <EstabelecimentoService>data;
      console.log(this.apiData);
    })
  }

  pesquisarEstabelecimento(value: string | number) {
    if (!value) {
      this.getProducts();
    }
    return this.http.get<any>('http://192.168.10.101:8080/api/estabelecimentonome/' + value)
      .toPromise()
      .then(res => <Estabelecimento[]>res)
      .then(data => { return data; });
  }

  getProducts() {
    return this.http.get<any>('http://192.168.10.101:8080/api/estabelecimentos')
      .toPromise()
      .then(res => <Estabelecimento[]>res)
      .then(data => { return data; });
  }

  postCadastrar() {
    return this.http.get<any>('assets/products-orders-small.json')
      .toPromise()
      .then(res => { return <Estabelecimento[]>res; });
  }

  generateId() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
