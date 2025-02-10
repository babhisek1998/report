import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { hideLoader, showDynamicModal, showLoader } from '../../common-utility';

@Component({
  selector: 'app-language-modal',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,HttpClientModule,CommonModule],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.scss',
})
export class LanguageModalComponent {
  inputdata: any;
  languageForm: FormGroup;
  showSuccessModal:boolean = false;
  successImage = '../assets/images/merchant/successImage.gif';

  constructor(private http:HttpClient,public dialogRef: MatDialogRef<LanguageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.languageForm = new FormGroup({
      serialNumber: new FormControl(''),
      vpiId: new FormControl(''),
      currentLanguage: new FormControl(''),
      newLanguage: new FormControl('',Validators.required),
    });
  }

  async ngOnInit() {
    this.inputdata = this.data.deviceData;
    console.log(this.inputdata, 'inpudata');
    this.patchValue();
  }

  patchValue() {
    this.languageForm.patchValue({
      serialNumber: this.inputdata['serial number'],
      vpiId: this.inputdata['VPA ID'],
      currentLanguage: this.inputdata['Language'],
    });
  }

  submit(){
    showLoader();
    let url = environment.updatelanguage;
    let reqBody = {
      "deviceSerialNo":this.languageForm.get('serialNumber').value,
      "update_language":this.languageForm.get('newLanguage').value
    }
    this.http.post(url,reqBody).subscribe({
      next: data => {
        console.log(data);
        
        hideLoader();
        this.showSuccessModal = true;
        // showDynamicModal( data.message ? data.message : '','SUCCESS','success');

      },
      error: error => {
        hideLoader();

        console.log(error);

        this.showSuccessModal = false;
        showDynamicModal( error.error.message? error.error.message : 'Server Error','FAILED','failure');

      },
      complete: () => {
        hideLoader();

        console.log("completed");
      }
    })

  }
  resetForm(){
    console.log("reset called");    
    this.languageForm.reset();
    this.dialogRef.close();
  }
  submit_success(){
    this.languageForm.reset();
    this.dialogRef.close();
  }
}
