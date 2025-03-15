import { Component } from '@angular/core';
import { TaskModel } from '../../models/task.mode';
import { TasksService } from '../../services/tasks.service';
import { HeaderComponent } from "../header/header.component";
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TodoItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks: TaskModel[] = [];

  constructor(private tasksService: TasksService) {
    this.tasksService.getTasks();
    this.tasksService.$tasks.subscribe((tasks) => {
      this.tasks = tasks;
    });

  }
}
