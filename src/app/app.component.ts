import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //mensagens
  loginMessage: string = "";
  registerMessage: string = "";
  passwordRecoverMessage: string = "";

  erroEmail: string = "";
  erroSenha: string = "";
  erroSenhaConfirmacao: string = "";
  erroRecuperarSenha: string = "";

  //método construtor
  constructor(private httpClient: HttpClient) { }

  //formulário para autenticação do usuario
  formAccountLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required])
  });

  //formulário para criação de conta de usuário
  formAccountRegister = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });

  //formulário para recuperação de senha do usuário
  formAccountPasswordRecover = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //criando funções para que possamos acessar na página HTML as mensagens
  //de erro de validação dos campos de cada um dos formulários
  get formLogin(): any {
    return this.formAccountLogin.controls;
  }

  get formRegister(): any {
    return this.formAccountRegister.controls;
  }

  get formPasswordRecover(): any {
    return this.formAccountPasswordRecover.controls;
  }

  //funções para receber o SUBMIT de cada formulário
  onSubmitLogin(): void {

    //executando o serviço de autenticação da API
    this.httpClient.post(
      environment.apiUrl + '/Account/Login',
      this.formAccountLogin.value
    )
      .subscribe(
        (success:any) => {
          console.log(success);

          //salvar as informações obtidas da API em uma 'local storage'
          localStorage.setItem("AUTHENTICATION", JSON.stringify(success));

        },
        (e) => {
          //capturar o erro obtido
          this.loginMessage = e.error;
        }
      );

  }

  onSubmitRegister(): void {

    this.erroEmail = "";
    this.erroSenha = "";
    this.erroSenhaConfirmacao = "";

    this.httpClient.post(
      environment.apiUrl + "/Account/Register",
      this.formAccountRegister.value
    )
      .subscribe(
        (success: any) => {
          this.registerMessage = success.message;
          this.formAccountRegister.reset();
        },
        (e) => {

          switch (e.status) {

            case 400: //BAD REQUEST
              if (e.error.errors.Senha) {
                this.erroSenha = e.error.errors.Senha[0];
              }
              else if (e.error.errors.SenhaConfirmacao) {
                this.erroSenhaConfirmacao = e.error.errors.SenhaConfirmacao[0];
              }
              break;

            case 422: //UNPROCESSABLE ENTITY
              this.erroEmail = e.error;
              break;
          }
        }
      );
  }

  onSubmitPasswordRecover(): void {

    this.erroRecuperarSenha = "";

    this.httpClient.post(
      environment.apiUrl + "/Account/PasswordRecover",
      this.formAccountPasswordRecover.value
    )
      .subscribe(
        (success:any) => {
          this.passwordRecoverMessage = success.message;
          this.formAccountPasswordRecover.reset();
        },
        (e) => {
          this.erroRecuperarSenha = e.error;
        }
      )
  }
}


