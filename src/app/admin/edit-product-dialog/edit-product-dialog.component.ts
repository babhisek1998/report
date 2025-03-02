import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule,NgIf,ReactiveFormsModule,NgStyle,MatIcon,MatCardModule,MatTabsModule,MatDividerModule, MatDialogModule,MatInputModule, MatButtonModule,MatFormFieldModule,MatInputModule]
})
export class EditProductDialogComponent {
    productForm: FormGroup;
    photoFile: File | null = null;
    frontFile: File | null = null;
    backFile: File | null = null;
    videoFile: File | null = null;
    pdfFile: File | null = null;
  
    photoPreview: string | null = null;
    frontPreview: string | null = null;
    backPreview: string | null = null;
    videoPreview: string | null = null;
    pdfPreview: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public product: any
  ) {
     this.productForm = this.fb.group({
          productName: ['', Validators.required],
          brand: ['', Validators.required],
          price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
          unit: ['', Validators.required],
          description: ['', [Validators.required, Validators.minLength(10)]],
          subCategory: ['', Validators.required],
          sellerId: ['', Validators.required],
          videoUrl:['',Validators.required],
          category: ['', Validators.required]
        });
  }
  onFileSelected(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      switch (type) {
        case 'front':
          this.frontFile = file;
          this.frontPreview = reader.result as string;
          break;
        case 'back':
          this.backFile = file;
          this.backPreview = reader.result as string;
          break;
        case 'pdf':
          this.pdfFile = file;
          this.pdfPreview = URL.createObjectURL(file);
          break;
      }
    };
    reader.readAsDataURL(file);
  }
  saveChanges() {
    this.dialogRef.close(this.product);
  }

  cancel() {
    this.dialogRef.close();
  }
}
