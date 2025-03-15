import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TaskModel } from '../../models/task.mode';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Output() onTaskEdit = new EventEmitter<TaskModel>();

  constructor(private tasksService: TasksService) {}
  @Input() task: TaskModel = {title: '', isDone: false, isEditing: false};
  
  editTask() {
    this.tasksService.openTaskDialog(this.task);
  }

  completeTask() {
    this.task.isDone = true;
    this.tasksService.saveTask(this.task);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.task);
  }
}
