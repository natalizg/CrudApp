import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PostService } from '../services/post.service';
import { DialogRef } from '@angular/cdk/dialog';
import { ReloadService } from '../services/reload.service';
import { Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, 
            ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})


export class AddPostComponent implements OnInit{
  
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder, private _postService: PostService,
    private _dialogRef: DialogRef <AddPostComponent>,
    private reloadService: ReloadService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.postForm = this.fb.group({
      titulo: '',
      texto: ''
    })
  }

  ngOnInit(): void {
    this.postForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.postForm.valid) {
      if(this.data){
        this._postService.updatePost(this.data.id, this.postForm.value).subscribe({
          next: (val: any) => {
            alert('Post actualizado.')
            this._dialogRef.close();
            this.reloadService.reloadPage();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }else{
        this._postService.addPost(this.postForm.value).subscribe({
          next: (val: any) => {
            alert('Post añadido.')
            this._dialogRef.close();
            this.reloadService.reloadPage();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
      
    }
  }
}
