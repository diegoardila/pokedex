import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/auth/token.service';
import { ApiConnectionService } from '../../services/api/api-connection.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  totalPokemon:any;
  team=JSON.parse(localStorage.getItem("team")||"[]");
  totalTeam:any;
  session = false;
  user:any;
  constructor(
    public tokenService: TokenService,
    protected http: ApiConnectionService,) { 
  }
  ngOnInit(): void {
    this.totalTeam=this.team.length;
    this.session=this.tokenService.isLoggedIn();
    this.user=localStorage.getItem("user");
    this.getPokemonTotal();
  }
  logout(){
    this.tokenService.removeToken();
    location.reload();
  }
  getPokemonTotal(){
    this.http.getData('pokemon')
    .subscribe(
      response => {
        this.totalPokemon=response.count;
      });
    }
}