import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private UsersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Array<Person>> {
    return this.http.get<Array<Person>>(this.UsersUrl);
  }
  public updateUser(person: Person): Observable<any> {
    return this.http.put(`${this.UsersUrl}/${person._id}`, person);
  }
  public createUser(person: Person): Observable<Person> {
    return this.http.post<Person>(this.UsersUrl, person);
  }
  public deleteUser(person: Person): Observable<any> {
    return this.http.delete(`${this.UsersUrl}/${person._id}`);
  }
}
