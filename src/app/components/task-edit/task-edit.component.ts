import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatSlideToggleModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<any>, private fb: FormBuilder) {
      this.taskForm = this.fb.group({
        title: new FormControl(this.data.task.title, [Validators.required]),
        isDone: new FormControl(this.data.task.isDone),
        isEditing: new FormControl(this.data.task.isEditing),
      });
  }

  taskForm: FormGroup;

  saveTask() {
    if (this.taskForm.invalid) return;
    this.dialogRef.close({...this.taskForm.value, _id: this.data.task?._id});
  }
}
