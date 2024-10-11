import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Inote } from '../interfaces/inote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
private readonly _HttpClient=inject(HttpClient)

noteApi(note:Inote):Observable<any>{
  return this._HttpClient.post(`${environment.noteUrl}notes`,note,
    {
      headers:{token: localStorage.getItem('token') || ''}
    }
  )

}
getAllNotes():Observable<any>{
  return this._HttpClient.get(`${environment.noteUrl}notes`,
    {
      headers:{token: localStorage.getItem('token') || ''}
    }

  )
}


deleteNote(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.noteUrl}notes/${id}`,
  {
    headers:{token: localStorage.getItem('token') || ''}
  }
  )}

  updateNotes( note:Inote,id:string):Observable<any>{

    return this._HttpClient.put(`${environment.noteUrl}notes/${id}`,
note
      ,
      {
        headers:{token: localStorage.getItem('token') || ''}
      }
  )}

}
