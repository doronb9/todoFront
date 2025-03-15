import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { TaskModel } from '../models/task.mode';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditComponent } from '../components/task-edit/task-edit.component';
import { TasksRepo } from '../repositories/tasks.repo';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private dialog: MatDialog, private tasksRepo: TasksRepo) {
    this.socket = io('http://localhost:3300');
    this.subscribeToSocketEvents();
   }

  private socket: Socket;

  $tasks = new BehaviorSubject<TaskModel[]>([]);

  sendTaskEditing(task: TaskModel): void {
    this.socket.emit('taskBeenEdit', task);
  }

  onCreated(callback: (task: TaskModel) => void): void {
    this.socket.on('taskCreated', callback);
  }

  onUpdate(callback: (task: TaskModel) => void): void {
    this.socket.on('taskUpdated', callback);
  }

  onDeleted(callback: (task: TaskModel) => void): void {
    this.socket.on('taskDeleted', callback);
  }

  onTaskBeenEdit(callback: (task: TaskModel) => void): void {
    this.socket.on('taskBeenEdit', callback);
  }

  getTasks() {
    this.tasksRepo.getTasks().subscribe((tasks: TaskModel[]) => {
      this.$tasks.next(tasks);
    });
  }

  openTaskDialog(task: TaskModel) {
    if (task?._id) {
      task.isEditing = true;
      this.sendTaskEditing(task);
    }
    const dialogRef = this.dialog.open(TaskEditComponent, {
        height: '40vh',
        width: '60vh',
        data: { task }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (!data) {
          task.isEditing = false;
          this.sendTaskEditing(task);
          return;
        };
        this.saveTask(data);
      });
    }

    saveTask(task: TaskModel) {
      if (task._id) {    
        this.tasksRepo.editTask(task).subscribe();
      }
      else {
        this.tasksRepo.createTask(task).subscribe();
      }
    }

    deleteTask(task: TaskModel) {
      this.tasksRepo.deleteTask(task).subscribe();
    }

    subscribeToSocketEvents() {
      this.onCreated((task: TaskModel) => {
        const tasks = this.$tasks.value;
        tasks.push(task);
        this.$tasks.next(tasks);
      });

      this.onUpdate((task: TaskModel) => {
        this.$tasks.next(this.$tasks.value.map(t => t._id === task._id ? task : t));
      });

      this.onDeleted((task: TaskModel) => {
        this.$tasks.next(this.$tasks.value.filter(t => t._id !== task._id));
      });

      this.onTaskBeenEdit((task: TaskModel) => {
        this.$tasks.next(this.$tasks.value.map(t => t._id === task._id ? {...task, isEditing: task.isEditing} : t));
      });
    }

}
