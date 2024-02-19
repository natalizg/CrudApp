import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from './add-post/add-post.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openAddPostDialog() {
    this.dialog.open(AddPostComponent);
  }

  openEditForm(data: any) {
    this.dialog.open(AddPostComponent, {
      data
    });
  }
}