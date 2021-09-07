import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-consulta-contatos',
  templateUrl: './consulta-contatos.component.html',
  styleUrls: ['./consulta-contatos.component.css']
})
export class ConsultaContatosComponent implements OnInit {
 
  contatos: any[] = []; //lista de contatos
 
  //contato selecionado para exclusão ou edição
  contato: any = {
    idContato: 0,
    nome: '',
    email: '',
    telefone: ''
  };
 
  mensagem: string = "";
 
  constructor(private httpClient: HttpClient) { }
 
  ngOnInit(): void {
 
    this.httpClient.get(environment.apiUrl + "/Contatos")
      .subscribe(
        (success) => {
          this.contatos = success as any[];
        },
        (e) => {
          console.log(e);
        }
      );
 
  }
 
  obterContato(item: any): void {
    this.contato = item;
  }
 
  excluirContato(): void {
 
    this.httpClient.delete(environment.apiUrl + "/Contatos/" + this.contato.idContato,
      { responseType: 'text' })
      .subscribe(
        (success) => {
          this.mensagem = success;
          this.ngOnInit(); //recarregar a consulta
        },
        (e) => {
          console.log(e);
        }
      );
  }
 
}
