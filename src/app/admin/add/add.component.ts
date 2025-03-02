import { NgIf, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpServiceService } from '../../http-service.service';
import Notiflix from 'notiflix';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatTabsModule,MatCardModule,MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatIcon,NgIf,ReactiveFormsModule,NgStyle],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
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

  constructor(private fb: FormBuilder, private productService: HttpServiceService) {
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

  onSubmit() {
    if (!this.frontFile || !this.backFile || !this.pdfFile) {
      Notiflix.Notify.failure("Please select all required files.");
      return;
    }
  
    const formData = new FormData();
  
    // Append files only if they exist
    this.backFile ? formData.set('secondaryImage', this.backFile):'';
    this.frontFile ? formData.set('primaryImage', this.frontFile):'';
    this.pdfFile ? formData.set('pdfDocument', this.pdfFile):'';
  
    // Append text fields
    formData.set('productName', this.productForm.value.productName);
    formData.set('brand', this.productForm.value.brand);
    formData.set('price', this.productForm.value.price);
    formData.set('videoLink',this.productForm.get('videoUrl')?.value);
    formData.set('unit', this.productForm.value.unit);
    formData.set('description', this.productForm.value.description);
    formData.set('subCategory', this.productForm.value.subCategory);
    formData.set('category', this.productForm.value.category);
    formData.set('sellerId', this.productForm.value.sellerId);
    // Send API request
    this.productService.uploadProduct(formData).subscribe({
      next: (response:any) => {
        console.log('Product uploaded successfully', response);
        Notiflix.Notify.success(response.statusDesc);
      },
      error: (error:any) => {
        console.error('Upload failed:', error);
        Notiflix.Notify.failure(error.error.statusDescption || 'Upload failed');
      }
    });
  }
  
  
  
  
  
  
}
