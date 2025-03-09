import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dtable',
  standalone:true,
  imports:[CommonModule],
  providers: [DatePipe], // ✅ Provide DatePipe here
  templateUrl: './dtable.component.html',
  styleUrl: './dtable.component.scss',
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class DtableComponent implements OnInit {
  @Input() reports: any;
  @Input() page: any;
  @Input() index_value: any;
  @Input() index : number;
  @Input() totalRecords: boolean;
  @Input() visibleCols: number;
  @Input() columns: any;
  @Input() action: any;
  @Input() remark: any = [];
  @Input() receipt: any = [];
  tcol: string[];
  titles = [];
  expandBtn: boolean;
  tbl: any;
  filteredTbl: any;
  expand: number;
  showExpanded = -1;
  colorObj: any;
  chooseComment: FormGroup;
  showBtnN: boolean = false;
  pageLimitOptions = [10, 25, 50];
  paging = {
    limit: 10,
    active: 1,
    cnt: 1,
    data: [],
  };
  fc = { start: 1, cnt: 3 };
  mc = { cnt: 0, start: 1 };
  lc = { cnt: 2, start: 1 };
  dots = '....';

  footColspan: number;
  dateIndex = [];
  totalRecLen: number;
  totalAmount: any;
  searchInput = new FormControl('', null);
  require: any;
  @Output() update = new EventEmitter();
  @Output() actionData = new EventEmitter();
  @Output() carddelete = new EventEmitter();
  @Output() Download = new EventEmitter();
  @Output() Print = new EventEmitter();
  @Output() map = new EventEmitter();
  @Output() unmap = new EventEmitter();
  @Output() edit = new EventEmitter();
  val: any;
  buttonEnabled: boolean[] = [];
  tableBody: any[];
  remarkdata: any;
  remarkDataa: any;
  modalData: any;
  receiptLink: any;
  user_name: string;
  commentType: any;
  submit: any;
  transactionId: any;
  showDesc: boolean = false;
  cancelcheque: any;
  pancard: any;
  getagenData: FormGroup;
  agentData: any;
  userNamet: any;
  status: any;
  docDefinition: any;
  refId: any;
  otpToken: any;
  noDataFound: boolean = false;
  statusUpdate:FormGroup
  userstatus: any;
  user_status: any;
  statusUpdateForm: FormGroup;
  userstatusUpdateForm: FormGroup;
  bankData: any;
  username: any;
  option:any = [];
  isdis: boolean = false;
  bankupdateData: any;
  updateStatus_name: string;
  searchForm : FormGroup
  timestamp: string;
  selectedValue: string;
  @ViewChild('confirmMessage', { static: true })
  public confirmMessage: TemplateRef<any>;
  @ViewChild('comfirmationpopup', { static: true })
  public comfirmationpopup: TemplateRef<any>;
  // deliveryStatusOptions = [
  //   { value: '5', label: 'Confirmed By Vendor' },
  //   { value: '6', label: 'Rejected By Vendor' },
  //   { value: '7', label: 'Dispatched By Vendor' },
  //   { value: '8', label: 'Delivered And Installed' },
  //   { value: '9', label: 'Replacement Issued' },
  //   { value: '10', label: 'Activated' },
  //   { value: '13', label: 'Installed And Activated' }
  // ];
  deliveryStatusOptions = [
    { value: '5', label: 'In Transit' },
    { value: '6', label: 'In Transit' },
    { value: '7', label: 'In Transit' },
    { value: '8', label: 'Delivered' },
    { value: '9', label: 'Delivered' },
    { value: '10', label: 'Delivered' },
    { value: '13', label: 'Delivered' }
  ];
  updateStatusForm: FormGroup;
  btmOption = [
    {
      type: 'button',
      cls: 'warn',
      btmName: 'Reset'
    },
    {
      type: 'submit',
      cls: 'primary',
      btmName: 'Create'
    }
  ];
  formControls = [
    {
      name: 'merchantName',
      type: 'input',
      label: 'Merchant Name',
      inputType: 'text',
      placeholder: 'Enter Merchant Name',
      validators: [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.minLength(1),
        Validators.maxLength(90)
      ],
      errorMessages: {
        required: 'Merchant Name is required.',
        pattern: 'Merchant Name must contain only alphabets.',
        minlength: 'Merchant Name must be at least 1 character long.',
        maxlength: 'Merchant Name cannot exceed 90 characters.'
      }
    },
    {
      name: 'merchantMobileNo',
      type: 'input',
      label: 'Merchant Mobile Number',
      inputType: 'text',
      placeholder: 'Enter Merchant Mobile Number',
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ],
      errorMessages: {
        required: 'Mobile Merchant Number is required.',
        pattern: 'Mobile Merchant Number must be a 10-digits number.'
      }
    },
    {
      name: 'email',
      type: 'input',
      label: 'Email ID',
      inputType: 'email',
      placeholder: 'Enter Email ID',
      validators: [Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ],
      errorMessages: {
        pattern: 'Invalid Email ID.'
      }
    },
    {
      name: 'uniqueRef',
      type: 'input',
      label: 'Unique Ref ID',
      inputType: 'text',
      placeholder: 'Enter Unique Ref ID',
      validators: [Validators.required],
      errorMessages: {
        required: 'Unique Ref ID is required.',
      }
    },
    {
      name: 'merchantId',
      type: 'input',
      label: 'Merchant ID',
      inputType: 'text',
      placeholder: 'Enter Merchant ID',
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'Merchant ID is required.'
      }
    },
    {
      name: 'merchantUpiId',
      type: 'input',
      label: 'Merchant UPI ID',
      inputType: 'text',
      placeholder: 'Enter Merchant UPI ID',
      validators: [
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9.-]+@[a-zA-Z]{2,}$')
      ],
      errorMessages: {
        required: 'Merchant UPI ID is required.',
        pattern: 'Invalid Merchant UPI ID',
      }
    },
    {
      name: 'merchantKey',
      type: 'input',
      label: 'Merchant Key',
      inputType: 'text',
      placeholder: 'Enter Merchant Key',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'ifsc',
      type: 'input',
      label: 'IFSC',
      inputType: 'text',
      placeholder: 'Enter IFSC',
      validators: [
        // Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')
        Validators.required
      ],
      errorMessages: {
        // pattern: 'Invalid IFSC.'
      }
    },
    {
      name: 'merchantAddress',
      type: 'input',
      label: 'Merchant Address',
      inputType: 'text',
      placeholder: 'Enter Merchant Address',
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'Merchant Address is required.'
      }
    },
    {
      name: 'merchantState',
      type: 'input',
      label: 'Merchant State',
      inputType: 'text',
      placeholder: 'Enter Merchant State',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'merchantCity',
      type: 'input',
      label: 'Merchant City',
      inputType: 'text',
      placeholder: 'Enter Merchant City',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'merchantPincode',
      type: 'input',
      label: 'Merchant Pincode',
      inputType: 'text',
      placeholder: 'Enter Merchant Pincode',
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ],
      errorMessages: {
        required: 'Merchant Pincode is required.',
        pattern: 'Merchant Pincode must be a 6-digits number.'
      }
    },
    {
      name: 'deviceRequest',
      type: 'input',
      label: 'Device Request',
      inputType: 'text',
      placeholder: 'Enter Device Request',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'language',
      type: 'input',
      label: 'Language',
      inputType: 'text',
      // options: this.laguage,
      placeholder: 'Enter Language',
      // placeholder: 'Select Language',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'devicetype',
      type: 'select',
      label: 'Device Type',
      inputType: 'text',
      placeholder: 'Select Device Type',
      validators: [
      ],
      errorMessages: {
      }
    },
    {
      name: 'rentToBeCollected',
      type: 'input',
      label: 'Rent to be collected',
      inputType: 'text',
      placeholder: 'Enter Rent to be collected',
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'Rent to be collected is required.'
      }
    },
    {
      name: 'qrString',
      type: 'input',
      label: 'QR String',
      inputType: 'text',
      placeholder: 'Enter QR String',
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'QR String is required.'
      }
    },
    {
      name: 'waiverCode',
      type: 'input',
      label: 'Waiver Code',
      inputType: 'text',
      placeholder: 'Enter Waiver Code',
      validators: [
        Validators.required
      ],
      errorMessages: {
        required: 'Waiver Code is required.'
      }
    }
  ];
  createBankForm:FormGroup;
  reqBody:any;
  row_data: any;
  updateStatus:FormGroup;
  updateStatusForm2: FormGroup;
  constructor(
    private datePipe: DatePipe,
    private fb:FormBuilder,
    public dialog: MatDialog,
    // private service:BankBarodaServiceService
  ) {
  }

  ngOnInit() {
    this.setUserName();
    this.setColorObject();
    this.setVisibleColumns();
    this.initializeTableData();
    this.setTableColumns();
    this.formatTableData();
    this.updateTitles();
    this.updatePagination();
    this.initializeForm();
  }
  
  setUserName() {
    this.user_name = localStorage.getItem('user_name');
  }

  setColorObject() {
    if (!this.colorObj) {
      this.colorObj = { darkvibrant: 'forestgreen', vibrant: '#0B4D88' };
    }
  }
  initializeForm() {
    this.updateStatus = new FormGroup({
      remark: new FormControl('', [Validators.required])
    });
    this.userstatusUpdateForm = new FormGroup({
      remark: new FormControl('', [Validators.required])
    });
    this.statusUpdateForm = new FormGroup({
      status : new FormControl('',Validators.required)
    });
    this.searchForm = new FormGroup({
      search: new FormControl('', Validators.required)
    });
    this.updateStatusForm = this.fb.group({
      statuses: this.fb.array(this.reports.map((report: any) => this.createReportFormGroup(report)))
    });
    this.updateStatusForm2 = this.fb.group({
      statuses: this.fb.array(this.reports.map((report: any) => this.createReportFormGroup2(report)))
    });
    this.createBankForm = this.fb.group({
      ...this.createFormControls(this.formControls)
    });
    this.createBankForm.get('empId')?.valueChanges.subscribe(() => {
      this.createBankForm.get('userName')?.updateValueAndValidity();
    });
    this.createBankForm = this.fb.group({
      ...this.createFormControls(this.formControls)
    });
  }
    createFormControls(controls: any[]) {
      const group: any = {};
      controls.forEach(control => {
        group[control.name] = ['', control.validators];
      });
      return group;
    }
    get resetButtonClass() {
      return this.createBankForm.dirty ? 'btnenb' : 'btnenb';
    }
  
    get submitButtonClass() {
      return this.createBankForm.valid ? 'btnenb' : 'btndis';
    }
  
  
  
    onlyNumber(event: KeyboardEvent): boolean {
      const charCode = event.which || event.keyCode;
      return charCode >= 48 && charCode <= 57;
    }
    checkbtm_dis(x: any): boolean {
      return x
    }
    getControlError(controlName: string): string | null {
      const control = this.createBankForm.get(controlName);
      const controlConfig = this.formControls.find(fc => fc.name === controlName);
      const errorMessages = controlConfig?.errorMessages || {};
      if (control && control.invalid && (control.dirty || control.touched)) {
        for (const error in control.errors) {
          if (errorMessages[error]) {
            return errorMessages[error];
          }
        }
      }
      return null;
    }
  createReportFormGroup(report: any): FormGroup {
    return this.fb.group({
      vpa_id: new FormControl(report.vpa_id),
      selectedStatus: new FormControl(report['Device delivery Status'] || null),
    });
  }
  createReportFormGroup2(report: any): FormGroup {
    return this.fb.group({
      vpa_id: new FormControl(report.vpa_id),
      selectedStatus: new FormControl(report['Installed'] || null),
    });
  }

  get statuses(): FormArray {
    return this.updateStatusForm.get('statuses') as FormArray;
  }
  getFormControl(index: number, controlName: string): FormControl {
    return this.statuses.at(index).get(controlName) as FormControl;
  }
  get statuses2(): FormArray {
    return this.updateStatusForm.get('statuses') as FormArray;
  }
  getFormControl2(index: number, controlName: string): FormControl {
    return this.statuses.at(index).get(controlName) as FormControl;
  }
  setVisibleColumns() {
    this.visibleCols = this.visibleCols || parseInt(localStorage.getItem('columnCount')) || 4;
    this.footColspan = this.visibleCols;
  
    const windowWidth = window.innerWidth;
    if (windowWidth > 1279) {
      this.visibleCols = parseInt(localStorage.getItem('columnCount')) || 4;
    } else if (windowWidth > 767) {
      this.visibleCols = 4;
    } else {
      this.visibleCols = 2;
    }
  }
  getDeliveryStatusLabel(value: string): string {
    const status = this.deliveryStatusOptions.find(option => option.value == value);
    return status ? `• ${status.label}` : '_';
  }
  getChipColor(value: string): string {
    switch (value?.toLowerCase()) {
      case '8':
        return 'success-chip';
      case '9':
        return 'success-chip';
      case '10':
        return 'success-chip';
      case '13':
        return 'success-chip';
      case '5':
        return 'warning-chip';
      case '6':
        return 'warning-chip';
      case '7':
        return 'warning-chip';
      default:
        return 'default-chip';
    }
  }
  getDeliveryStatusLabel2(value: string): string {
    const status = this.deliveryStatusOptions.find(option => option.value == value);
    return status ? status.value == '13' ? `• Installed` : '_' : '_';
  }
  getChipColor2(value: string): string {
    switch (value?.toLowerCase()) {
      case '13':
        return 'success-chip';
      default:
        return 'default-chip';
    }
  }
  
  initializeTableData() {
    const obj = this.page === 'users' || this.page === 'row_lead' || this.page === 'products' || this.page === 'show_user' || this.page === 'device_list' || this.page === 'device_delivery_status' ? this.reports : JSON.parse(this.reports);
    this.tbl = this.filteredTbl = obj;
    this.calcAmount();
  }
  
  setTableColumns() {
    this.tcol = this.columns || Object.keys(this.filteredTbl[0]);
    // this.titles = this.tcol.map(col => this.capitalizeWithSpaces(col));
    this.titles = this.tcol.map(col => col);
  }
  
  capitalizeWithSpaces(text: string): string {
    const result = text.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  formatTableData() {
    this.option = [];
  
    this.filteredTbl.forEach((item:any, index:any) => {      
      this.formatDateFields(item, ['createdDate','updatedDate' , 'lastLogin' , 'mpinCreatedDate','createdAt','updatedAt']);
      // this.formatUpdatedByField(item);
      this.formatTimeField(item);
      this.setDefaultValues(item, this.tcol);
    });
  }
  formatDateFields(item: any, dateFields: string[]) {
    for (let field of dateFields) {
      if (item.hasOwnProperty(field)) {
        item[field] = this.dateFormatter(item[field]);
      }
    }
  }
  
  // formatUpdatedByField(item: any) {
  //   if (Array.isArray(item['Updated By'])) {
  //     // Remove duplicates from the array
  //     item.updatedBy = [...new Set(item['Updated By'])];
  
  //     // If the array is empty after removing duplicates, set to 'N/A'
  //     if (item['Updated By'].length === 0) {
  //       item['Updated By'] = 'N/A';
  //     }
  //   } else if (typeof item['Updated By'] === 'string') {
  //     // If updatedBy is a string, ensure it's not empty
  //     item['Updated By'] = item['Updated By'].trim() !== '' ? item['Updated By'] : 'N/A';
  //   } else {
  //     // If updatedBy is neither an array nor a non-empty string, set to 'N/A'
  //     item['Updated By'] = 'N/A';
  //   }
  // }
  formatTimeField(item: any) {
    if (item.hasOwnProperty('Time')) {
      item.Time = item.Time.value || item.Time || '_';
    }
  }
  
  setDefaultValues(item: any, fields: string[]) {
    for (let field of fields) {
      if (!item[field]) {
        item[field] = '_';
      }
    }
  }
  
  updateTitles() {
    this.titles = Array.from(new Set(this.titles));
    this.expandBtn = this.visibleCols < this.titles.length;
    this.visibleCols = Math.min(this.visibleCols, this.titles.length);
  }
  openEditModal() {    
    this.dialog.open(this.confirmMessage, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "30rem",
      disableClose: true,
      panelClass: 'dialog-custom-style'
    });
  }
  opencomfirmationpopupModal(e:any,tr:any) {   
    this.status = e; 
    this.row_data = tr;
    this.dialog.open(this.comfirmationpopup, {
      enterAnimationDuration: "500ms",
      exitAnimationDuration: "500ms",
      width: "30rem",
      disableClose: true,
      panelClass: 'dialog-custom-style',
    });
  }

  closeModal(){
    this.dialog.closeAll();
  }
  updatePagination() {
    const start = (this.paging.active - 1) * this.paging.limit;
    this.paging.cnt = Math.ceil(this.filteredTbl.length / this.paging.limit);
    this.paging.data = this.filteredTbl.slice(start, start + this.paging.limit);
  
    if (this.paging.cnt > 7) {
      this.fc.cnt = 3;
      this.mc.cnt = 0;
      this.lc.cnt = 2;
      this.dots = '....';
      if (this.paging.active > 3) {
        this.mc.start = this.paging.active - 1;
      }
    } else {
      this.dots = '';
      this.fc.cnt = this.paging.cnt;
      this.mc.cnt = 0;
      this.lc.cnt = 0;
    }
  }
  

  dateFormatter(params: any) {
    if (params.value) {
      return params.value;
    }
    let unFormatteddate = params ?? '';
    if (unFormatteddate) {
      const formattedDate =
       this.page == 'bank_user_list' ? moment(unFormatteddate)
      .add(5, 'hours')
      .add(30, 'minutes')
      .format("DD MMM YYYY hh:mm a")
      : 
      this.datePipe.transform(
        unFormatteddate,
        'MM/dd/yyyy HH:mm:ss'
      );
      return formattedDate?.toString() ?? '';
    } else {
      return '';
    }
  }
  dateFormatterNoTime(params: any) {
    let unFormatteddate = params.value ?? params ?? '';
    if (unFormatteddate) {
      const formattedDate = this.datePipe.transform(
        unFormatteddate,
        'MM/dd/yyyy'
      );
      return formattedDate?.toString() ?? '';
    } else {
      return '';
    }
  }
  ngOnChanges() {
    this.ngOnInit();
  }

  changeFn(e: any) {
    if (e.target.value == 'ANY OTHER') {
      this.showDesc = true;
    } else {
      this.showDesc = false;
    }
  }

  onResize(event) {
    let iw = event.target.innerWidth;
    if (iw > 1000) {
      this.visibleCols = parseInt(localStorage.getItem('columnCount')) || 12;
    } else if (iw > 767) {
      this.visibleCols = 4;
    } else {
      this.visibleCols = 2;
    }
  }

  calcAmount() {
    this.totalRecLen = this.filteredTbl ? this.filteredTbl.length : 0;
    this.totalAmount = 0;
    for (let l = 0; l < this.totalRecLen; l++) {
      if (this.filteredTbl[l].amount) {
        this.totalAmount += parseFloat(this.filteredTbl[l].amount);
      }
    }
  }
  downloadExcel(excel: string) {    
    // alasql.setXLSX(XLSX);
    var opts = [{ sheeitd: "Sheet 1", header: true }]
    this.filteredTbl = this.filteredTbl.map((x: any) => {
      let filteredData = { ...x };
      return filteredData;
    });
    // alasql("SELECT INTO XLSX ('" + excel + ".xlsx',?) FROM ?", [opts, [this.filteredTbl]]);
   
  }
  changeLimit(e, type) {
    let n = type ? e.target.value : e;
    this.paging.limit = n;
    this.paging.active = 1;
    this.paging.cnt = Math.ceil(this.filteredTbl.length / this.paging.limit);
    let start = (this.paging.active - 1) * this.paging.limit;
    this.paging.data = [];
    for (let k = 0; k < this.paging.limit; k++) {
      if (this.filteredTbl[start + k]) {
        this.paging.data.push(this.filteredTbl[start + k]);
      }
    }
  }

  changeColLimit(n) {
    if (n > 0 && n <= this.titles.length) {
      this.visibleCols = n;
      localStorage.setItem('columnCount', n);
    } else if (n >= this.titles.length) {
      this.visibleCols = this.titles.length;
      localStorage.setItem('columnCount', JSON.stringify(this.visibleCols));
    }

    this.expandBtn = n < this.titles.length ? true : false;
  }
  applyFilter(event: any) {
    const searchItem = event.target.value.toLowerCase();
      this.paging.data = this.page == 'bank_user_list' ? (this.formatTableData(), this.reports.filter((row:any) => {
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            const value = row[key];
            if (value != null && value.toString().toLowerCase().includes(searchItem)) {
              this.formatTableData();
              this.noDataFound = false;
              return true;
            }
          }
        }
        return false;
      })):
      this.reports.filter((row:any) => {
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          const value = row[key];
          if (value != null && value.toString().toLowerCase().includes(searchItem)) {
            this.noDataFound = false;
            return true;
          }
        }
      }
      return false;
    });
    this.filteredTbl = this.paging.data;
    this.noDataFound = this.filteredTbl.length === 0;
    this.changeLimit(10, false);
  }
  

  counter(i: number) {
    return new Array(i);
  }

  pageActive(n: number) {
    if (this.paging.cnt >= n) {
      this.paging.active = n;
      let start = (this.paging.active - 1) * this.paging.limit;
      this.paging.data = [];
      for (let k = 0; k < this.paging.limit; k++) {
        if (this.filteredTbl[start + k]) {
          this.paging.data.push(this.filteredTbl[start + k]);
        }
      }
    }
  }

  updateFilter(event: any) {
    const val = event.target.value;
    if (this.tbl.length) {
      const temp = this.tbl.filter((d) => {
        const vals = Object.values(d);
        return new RegExp(val, 'gi').test(vals.toString());
      });
      this.filteredTbl = temp;
    }
    this.changeLimit(this.paging.limit, false);
    this.totalRecLen = this.filteredTbl.length;
  }
  }
  
