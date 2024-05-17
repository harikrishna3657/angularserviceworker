import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IndexedDbService } from './indexdbservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onlineformstest';
  formData = {
    name: '',
    email: ''
  };

  constructor(private indexedDbService: IndexedDbService) {}

  ngOnInit() {

  }

  submitForm() {
    const { name, email } = this.formData;
    this.indexedDbService.addFormData(name, email)
      .then(() => console.log('Form data added to IndexedDB'))
      .catch(error => console.error('Error adding form data to IndexedDB:', error));
  }
}

