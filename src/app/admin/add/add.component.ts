import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule,MatIcon],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

}
