import { Injectable } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from './dialog.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { OnInit } from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { ReloadService } from './services/reload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatToolbarModule, MatButtonModule,
            MatDialogModule, HttpClientModule, MatTableModule, MatSortModule,
            MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'texto', 'action'];
  dataSource = new MatTableDataSource();

  //Método para abrir un Dialog con el componente Añadir Post: (usa el servicio Dialog creado por nosotros)
  constructor(private dialogService: DialogService,
             private postService: PostService, 
             private _liveAnnouncer: LiveAnnouncer,
             private reloadService: ReloadService) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.loadOrRefresh();

    this.reloadService.reload$.subscribe(() => {
      this.loadOrRefresh();
    });
  }
  
  openAddPostDialog() {
    this.dialogService.openAddPostDialog();
    
  }

  loadOrRefresh() {
    this.postService.getPostList().subscribe({
      next: (res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: console.log,
  })
  }

  openEditForm(data: any) {
    this.dialogService.openEditForm(data);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  deletePost(id:number) {
    this.postService.deletePost(id).subscribe ({
      next: (res) => {
        alert('Post borrado.');
        this.loadOrRefresh();
      },
      error: console.log,
    })
  }

  reloadPage() {
    this.reloadService.reloadPage();
  }


}
