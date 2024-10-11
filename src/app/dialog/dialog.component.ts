import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../core/services/notes.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Inotedata } from '../core/iterfaces/inotedata';
import { Inote } from '../core/interfaces/inote';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inotedata,
  ) {}


private readonly _FormBuilder=inject(FormBuilder)
private readonly _NotesService=inject(NotesService)

noteForm:FormGroup=this._FormBuilder.group({
  title:[this.data.title? this.data.title:''],

  content:[this.data.content?this.data.content:'']
})


noteSubmit(form:FormGroup):void{
  if(!this.data.title&&!this.data.content){
    this.addNote(form.value)
  }else{
this.upDateNote(form.value)
  }


}
addNote(noteDAte:Inotedata):void{
  this._NotesService.noteApi(noteDAte).subscribe({
    next: (res) => {
      console.log(res);
      this.dialogRef.close();
    },
    error: (err) => {
      console.error(err);
    }
   })
}

upDateNote(noteDate:Inote):void{
  this._NotesService.updateNotes(noteDate,this.data._id).subscribe({
    next: (res) => {this.dialogRef.close();}
    ,
    error: (err) => { }
  })

}

}
