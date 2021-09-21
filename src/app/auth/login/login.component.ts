import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateService } from 'src/app/services/auth/auth-state.service';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  name:any;
  password:any;
  message:any;
  constructor(
    protected fB: FormBuilder,
    protected authService: AuthService,
    protected authState: AuthStateService,
    protected tokenService: TokenService,
  ) {
    this.loginForm = this.fB.group({
      name: [''],
      password: [''],
    });
   }

  ngOnInit(): void {
  }
  login(f): void {
    if(f.form.status == "VALID"){
      this.authService.signin(f.value['name'],f.value['password']).subscribe(
        result => {
          this.message = result.message;
          if (result != '' || !('error' in result)) {
            if(result.token){
              this.tokenService.handleData(result.token);
            }
            if(result.message === 'Usuario logueado correctamente'){
              this.message = result.message;
              localStorage.setItem('user', f.value['name']);
              this.authState.setAuthState(true);
              localStorage.setItem("tabActive","list")
              window.location.href = '/dashboard';
            }          
          }
        },
        error => {
          if (error.status == 401) {
            console.log('Por favor verifica tus credenciales');
          } else if (error.status == 423) {
            console.log('error');
          }
        }
      );
    }
  }
}
