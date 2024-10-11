import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { Inotedata } from './../../core/iterfaces/inotedata';

import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { NotesService } from '../../core/services/notes.service';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgStyle, SideNavComponent,SearchPipe,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {

  noteList:Inotedata  [] =[]
  searchInput:string=''

  constructor(public dialog: MatDialog) {}
private readonly _NotesService=inject(NotesService)
  openDialog(noteData?:Inotedata): void {
    const dialogRef = this.dialog.open(DialogComponent, {
       data: {title:noteData?.title,content:noteData?.content,_id:noteData?._id},

  width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()

    });
  }
  ngOnInit(): void {
    this._NotesService.getAllNotes().subscribe({
      next: (data) => {
        console.log(data)

        this.noteList=data.notes
      },
      error: (error) => {


      }
    })

  }
  delte(id:string ,noteIndex:number):void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this._NotesService.deleteNote(id).subscribe({
            next: (res) => {

              this.noteList.splice(noteIndex , 1)

              this.noteList=[...this.noteList]






            },
            error: (error) => {

            }
          })
        });
      }
    });

  }
  update(noteData:Inotedata,noteIndex:number){
    console.log(noteData,noteIndex)

 this.openDialog({
  title:noteData.title,content:noteData.content,_id:noteData._id
 })

  }
}
