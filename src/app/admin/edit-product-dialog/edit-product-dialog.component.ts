import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule] // ✅ Correct imports
})
export class EditProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {}

  saveChanges() {
    this.dialogRef.close(this.product);
  }

  cancel() {
    this.dialogRef.close();
  }
}
