import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ApiConnectionService } from '../../../../../services/api/api-connection.service'
import * as SafeJsonStringify from 'json-stringify-safe';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  id:any;
  pokeToSave={
    sprite:"",
    types:[]
  };
  type_img=environment.type_img;
  movesToSave={name:"",es:"",desc:"",type:"",power:0};
  abilityToSave={
    // name:"",
    es:"",
    desc:""
  };
  team:any[]=[]; 
  equipoPoke:any[]=[];
  equipoMoves:any[]=[];
  equipoAbilities:any[]=[];
  selected:any;
  moves:any[]=[];
  abilities:any[]=[];
  pokemon:any[]=[];
  constructor(
    protected http: ApiConnectionService
  ) { }

  ngOnInit(): void {
    this.armarEquipo();
    this.team=JSON.parse(localStorage.getItem("team")||"[]");
  }
  getPokemon(){
    this.http.getData('pokemon/?limit=2000')
    .subscribe(
      response => {
        this.pokemon=response.results;
      });
  }
  showAdd(){
    $("#btnAdd").prop("disabled",true);
    $("#addPoke").toggleClass("d-none");
  }
  selectPoke(id){
    $("input#name").val(id);
    $("input#name_new").val(id);
    this.selected=id;
    let data;
    this.moves=[];
    this.abilities=[];
    $('.pokemon-finded').addClass('d-none');
    $('.pokemon-finded-edit').addClass('d-none');
    this.http.getData('pokemon/'+id)
    .subscribe(
      response => {
        response.moves.forEach(move => {          
          this.http.getData('move/'+move.move.name+'/')
          .subscribe(res => {
            res.names.forEach(namelang => {
              if(namelang.language.name=="es"){
                data={
                  name:res.name,
                  es:namelang.name,
                  power:res.power
                }
                this.moves.push(data);
              }
            });
          });
          });
        response.abilities.forEach(ability => {          
          this.http.getData('ability/'+ability.ability.name+'/')
          .subscribe(res => {
            res.names.forEach(namelang => {
              if(namelang.language.name=="es"){
                data={
                  name:res.name,
                  es:namelang.name
                }
                this.abilities.push(data);
              }
            });
          });
          });
      });
  }
  findPoke(f){
    this.pokemon=[];
    let data;
    this.http.getData('pokemon/?limit=2000')
    .subscribe(
      response => {
        response.results.forEach(poke => {
          if(poke.name.includes(f.value['name_new'])){
            data={
              name:poke.name
            }
            this.pokemon.push(data);
          }
        });
      });
  }
  findPokeEdit(f){
    this.pokemon=[];
    let data;
    this.http.getData('pokemon/?limit=2000')
    .subscribe(
      response => {
        response.results.forEach(poke => {
          if(poke.name.includes(f.value['name'])){
            data={
              name:poke.name
            }
            this.pokemon.push(data);
          }
        });
      });
  }
  savePoke(f){
    if(f.form.status == "VALID"){
      this.team=JSON.parse(localStorage.getItem("team")||"[]")
      let data={        
        ability:f.value['ability_new'],        
        moves:[f.value['mov1_new'],f.value['mov2_new'],f.value['mov3_new'],f.value['mov4_new']],
        name:this.selected,
        id:this.team.length
      }
      if(this.team.length<=6){
        this.team.push(data);
      }   
      localStorage.setItem('team',JSON.stringify(this.team));     
    }
    this.armarEquipo();
    location.reload();
  }
  edit(id){
    $("#edit").toggleClass("d-none");
    this.id=id;
  }
  delete(id){
    $("#delete").toggleClass("d-none");
    this.id=id;
  }
  deletePoke(){
    this.team=JSON.parse(localStorage.getItem("team")||"[]");
    let del=this.team.find(k=>k.id===this.id);
    let i=this.team.indexOf(del);
    this.team.splice(i,1);    
    localStorage.setItem('team',JSON.stringify(this.team));
    location.reload();
  }
  editPoke(f){
    if(f.form.status == "VALID"){
      this.team=JSON.parse(localStorage.getItem("team")||"[]")
      let edit=this.team.find(k=>k.id===this.id);
      let data={        
        ability:f.value['ability'],        
        moves:[f.value['mov1'],f.value['mov2'],f.value['mov3'],f.value['mov4']],
        name:this.selected,
        id:this.id
      }
      this.team.splice(this.id,1,data);
      localStorage.setItem('team',JSON.stringify(this.team));
    }
    this.armarEquipo();
    location.reload();
  }
  armarEquipo(){
    let data
    let team = JSON.parse(localStorage.getItem("team")||"[]");
    team.forEach((pokemon,index) => {
      this.http.getData('pokemon/'+pokemon.name+'/')
      .subscribe(response=>{
        data={
          sprite :response.sprites.front_default,
          types:response.types,
          name:pokemon.name,
          id:index
        }
        this.equipoPoke.push(data)
      });      
      for (let i = 0; i < pokemon.moves.length; i++) {
        this.http.getData('move/'+pokemon.moves[i]+'/')
          .subscribe(response=>{
            let move={
              es:"",
              desc:"",
              type:"",
              power:0,
              name:"",
              pokemon:index,
            };
            response.names.forEach(namelang => {
              if(namelang.language.name=="es"){
                move.es=namelang.name;
              }
            });
            response.flavor_text_entries.forEach(desc => {
              if(desc.language.name=="es"){
                move.desc=desc.flavor_text;
              }
            });           
            move.type=response.damage_class.name;
            if(response.power==null){            
              move.power=0;
            }else{            
              move.power=response.power;
            }
            move.name=response.name;
            this.equipoMoves.push(move);
          });
      }
      console.log()
      this.http.getData('ability/'+pokemon.ability+'/').
        subscribe(response=>{
          let ability={
            name:'',
            es:'',
            desc:'',
            pokemon:index
          }
          ability.name=pokemon.ability;
          response.names.forEach(namelang => {
            if(namelang.language.name=="es"){
              ability.es=namelang.name;
            }
          });
          response.flavor_text_entries.forEach(desc => {
            if(desc.language.name=="es"){
              ability.desc=desc.flavor_text;
            }
          }); 
          this.equipoAbilities.push(ability);
        });   
    });
  }
}
