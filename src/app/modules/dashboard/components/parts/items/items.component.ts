import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ApiConnectionService } from '../../../../../services/api/api-connection.service';
import $ from 'jquery';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  tipos=environment.type_img;
  atacante="";
  receptor="";
  resultado="";
  constructor(
    protected http: ApiConnectionService
  ) { }

  ngOnInit(): void {
  }
  selectAttackType(tipo,es){
    this.atacante=tipo;    
    $("#dropdownMenuAttacker").html(es);
  }
  selectReceptorType(tipo,es){
    this.receptor=tipo;    
    $("#dropdownMenuReceptor").html(es);
  }
  calcular(){
    this.resultado="..."
    this.http.getData('type/'+this.atacante+'/')
    .subscribe(
      response=>{
        response.damage_relations.double_damage_to.forEach(relacion => {
          if(this.receptor==relacion.name){
            this.resultado="Movimiento super efectivo"
          }
        });
        response.damage_relations.half_damage_to.forEach(relacion => {
          if(this.receptor==relacion.name){
            this.resultado="Movimiento poco efectivo"
          }
        });
        response.damage_relations.no_damage_to.forEach(relacion => {
          if(this.receptor==relacion.name){
            this.resultado="Movimiento de efectividad nula";
          }
        });
        if(this.resultado=="..."){
          this.resultado="Movimiento efectivo"
        }
      }
    );
  }
}
