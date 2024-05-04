import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos'; // Assuming Node.js server is running on the same domain

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    // Implement caching strategy for employee performance
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(todos => localStorage.setItem('todos', JSON.stringify(todos)))
    );
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodo(todo: any): Observable<any> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<any>(url, todo);
  }

  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
