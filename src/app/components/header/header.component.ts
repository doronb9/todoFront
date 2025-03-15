import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TasksService } from '../../services/tasks.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSlideToggleModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private tasksService: TasksService) {}

  isShow = false;

  openTask() {
    this.tasksService.openTaskDialog({title: '', isDone: false, isEditing: false});
  }
}
