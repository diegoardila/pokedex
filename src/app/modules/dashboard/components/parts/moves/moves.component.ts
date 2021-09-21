import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiConnectionService } from '../../../../../services/api/api-connection.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent implements OnInit {
  movimientos:any[]=[]
  name=""
  type_img=environment.type_img;
  displayedColumns:string[]=['id','name','desc','types','type','power','accuracy','pp'];
  dataSource = new MatTableDataSource<any>(this.movimientos);  
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;
  constructor(
    protected http: ApiConnectionService
  ) { }
  ngOnInit(): void {
    this.getMoves();
  }
  getMoves(){
    let data,desc,name="";
    this.http.getData('move/?limit=2000')
    .subscribe(
      response => {
        response.results.forEach(element => {
          this.http.getData('move/'+element.name)
          .subscribe(
            res => {
              res.flavor_text_entries.forEach(description => {
                if(description.language.name=='es'&&description.version_group.name=='x-y'){
                  desc=description.flavor_text;
                }
              });
              res.names.forEach(name => {
                if(name.language.name=="es"){
                  this.name=name.name;
                }
              });
              data = {
                id:res.id,
                accuracy:res.accuracy,
                type:res.damage_class.name,
                types:res.type.name,
                desc:desc,
                power:res.power,
                name:res.name,
                es:this.name,
                pp:res.pp
              }
              this.movimientos.push(data);
              this.dataSource = new MatTableDataSource<any>(this.movimientos); 
              this.dataSource.paginator = this.paginator; 
              this.dataSource.sort = this.sort;
            },
            err=>{
              console.log(err);
            }
          )
        });
      },
      error =>{
        console.log(error);
      }
    );  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
