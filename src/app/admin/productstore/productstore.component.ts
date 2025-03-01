import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Notiflix from 'notiflix';

import { FormsModule } from '@angular/forms';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-productstore',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule , EditProductDialogComponent],
  templateUrl: './productstore.component.html',
  styleUrls: ['./productstore.component.scss']
})
export class ProductstoreComponent {
  products: any[] = [];
  userId: string = '';
  apiUrl = 'https://backend.ennomart.com/product/get-all-product-added-byseller';
  hasSearched: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  searchProductById() {
    if (!this.userId) {
      alert('Please enter a User ID');
      return;
    }

    this.hasSearched = true;
    Notiflix.Loading.dots('Fetching products...');

    const headers = new HttpHeaders().set('user-id', this.userId);
    
    this.http.post(this.apiUrl, {}, { headers }).subscribe(
      (response: any) => {
        Notiflix.Loading.remove();
        this.products = response.status === 'SUCCESS' ? response.searchProductList : [];
      },
      () => {
        Notiflix.Loading.remove();
        this.products = [];
      }
    );
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
        this.products = this.products.map(p =>
          p.productID === updatedProduct.productID ? updatedProduct : p
        );
      }
    });
  }
}
