import { Employee } from './../../../employee/src/app/models/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Name } from 'src/app/models/name.model';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  baseUrl = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  getName(){
    return this.http.get<Name[]>(this.baseUrl);
  }

  postName(name: Name){
    return this.http.post<Employee>(this.baseUrl, name);
  }

  deleteName(id: string){
    return this.http.delete(this.baseUrl + '/' + id);
  }

  editName(){

  }
}
