import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.mode';

@Injectable({
  providedIn: 'root'
})
export class TasksRepo {

    constructor(private http: HttpClient) {}

    uri = 'http://localhost:5001/tasks';

    getTasks(): Observable<any> {
        return this.http.get(`${this.uri}`);
    }

    createTask(task: TaskModel): Observable<any> {
        return this.http.post(`${this.uri}`, task);
    }

    editTask(task: TaskModel): Observable<any> {
        return this.http.put(`${this.uri}`, task);
    }

    deleteTask(task: TaskModel): Observable<any> {
        return this.http.post(`${this.uri}/${task._id}/delete`, task);
    }

    
  
}