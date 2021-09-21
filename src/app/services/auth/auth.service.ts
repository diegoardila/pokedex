import { Injectable } from '@angular/core';
import { environment } from '../../services/../../environments/environment'
import { TokenService } from './token.service';
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private tokenService: TokenService) { }
  // Login
  signin(user:string,password:string) : Observable<any>{
    let mensaje;
    for (let i = 0; i < environment.users.length; i++) {
      if(user==environment.users[i].name && mensaje!='Usuario logueado correctamente'){
        if(password===environment.users[i].password){
          mensaje = 'Usuario logueado correctamente';
          break;
        }else{
          mensaje = 'Contraseña incorrecta';
        }
      }
      else{
        mensaje = 'Usuario incorrecto';
      }    
    }
    let datos={
      message:mensaje,
      token:this.uuidv4()
    }
    return of(datos);
  }
  logOut() {
    const tokenDestroy = this.tokenService.getToken();
    let tokenSession = this.tokenService.isLoggedIn();
    if (tokenSession) {
      this.closeAll();
    } 
  }
  closeAll() {
    this.tokenService.removeToken();
    this.tokenService.isLoginSubject.next(false);
    window.location.href = '/login';
  }  
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}