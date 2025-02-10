import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-verification-complete',
  standalone: true,
  imports: [],
  templateUrl: './verification-complete.component.html',
  styleUrl: './verification-complete.component.scss',
})
export class VerificationCompleteComponent {
  @Input() changePage!: (page: string) => void;

  goToLogin() {
    if (this.changePage) {
      this.changePage('loginPage');
    } else {
      console.error('Error binding changePage to verification complete page');
    }
  }
}
