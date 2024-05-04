import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}

  getTodoListPerformance():Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:5000/api/performance-todos');
  }

  getTodoListFreshness(): Observable<Todo[]>{
    return this.http.get<Todo[]>('http://localhost:5000/api/freshness-todos');
  } 
}