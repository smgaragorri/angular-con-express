import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Person } from './../../interfaces/person';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  genderList = [
    { id: 1, value: 'Hombre' },
    { id: 2, value: 'Mujer' },
    { id: 3, value: 'No especificado' },
    { id: 4, value: 'Otro' },
  ];

  do: String = 'insert';
  position: any = 0;

  contacts: Array<Person> = [];

  contact: Person = {
    _id: '',
    name: '',
    surname: '',
    age: '',
    dni: '',
    birthday: '',
    favouriteColour: '',
    gender: '',
    notes: '',
  };

  constructor(private datePipe: DatePipe, private apiService: ApiService) {}

  ngOnInit(): void {
    this.refreshGetUsers();
  }
  add(form: NgForm) {
    if (this.do === 'insert') {
      this.contact.birthday = this.datePipe.transform(
        this.contact.birthday,
        'yyyy-MM-dd'
      );
      this.apiService
        .createUser(this.contact)
        .subscribe((user) => this.contacts.push(user));
    } else {
      this.contact.birthday = this.datePipe.transform(
        this.contact.birthday,
        'yyyy-MM-dd'
      );
      this.apiService
        .updateUser(this.contact)
        .subscribe();
        this.refreshGetUsers();    
        this.do = 'insert';
    }
    this.contact = {
      _id: '',
      name: '',
      surname: '',
      age: '',
      dni: '',
      birthday: '',
      favouriteColour: '',
      gender: '',
      notes: '',
    };
    form.resetForm();
  }

  delete(delPosition: number): void {
    this.apiService
        .deleteUser(this.contacts[delPosition])
        .subscribe();
        this.refreshGetUsers(); 
  }

  update(upPosition: number): void {
    this.contact = this.contacts[upPosition];
    var birthDate = this.contact.birthday.split('-');
    this.contact.birthday = new Date(
      parseInt(birthDate[0], 10),
      parseInt(birthDate[1], 10) - 1,
      parseInt(birthDate[2], 10)
    );
    this.do = 'update';
    this.position = upPosition;
  }

  refreshGetUsers(): void {
    this.apiService.getUsers().subscribe((users) => (this.contacts = users));
  }
}
