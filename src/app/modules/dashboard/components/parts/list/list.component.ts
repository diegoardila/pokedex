import { Component, OnInit, ViewChild} from '@angular/core';
import { ApiConnectionService } from '../../../../../services/api/api-connection.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {  
  pokemon:any[] = [];
  type_img=environment.type_img;
  displayedColumns:string[]=['id','image','name','types','ps','atk','def','s-atk','s-def','speed'];
  dataSource = new MatTableDataSource<any>(this.pokemon);  
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort!: MatSort;
  constructor(
    protected http: ApiConnectionService,
  ) { };    
  ngOnInit(): void {
    this.getPokemon();
  }  
  getPokemon(){   
    let data;  
    this.http.getData('pokemon/?limit=2000')
    .subscribe(
      response => {
        response.results.forEach(element => {
          this.http.getData('pokemon/'+element.name)
          .subscribe(
            res => {
              data = {
                id:res.id,
                name:res.name,
                types:res.types,
                sprite:res.sprites.front_default,
                stats:res.stats
              }
              this.pokemon.push(data);
              this.dataSource = new MatTableDataSource<any>(this.pokemon); 
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
