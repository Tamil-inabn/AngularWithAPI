import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  readonly apiUrl = 'https://localhost:7288/api/Values';
  constructor(private http: HttpClient) { }

  GetStudentDetails() {
    return this.http.get(`${this.apiUrl}/GetStudentDetails`);
  }

  GetStudentDetailsByID(id: number) {
    return this.http.get(`${this.apiUrl}/GetStudentDatailByID?id=` + id)
  }

  AddStudentDetails(formData: any) {
    return this.http.post(`${this.apiUrl}/AddStudentDetails`, formData);
  }

  EditStudentData(id: any, formData: any) {
    return this.http.put(`${this.apiUrl}/EditStudentData?id=` + id, formData)
  }

  DeleteeStudentDetails(id: any) {
    return this.http.delete(`${this.apiUrl}/DeleteeStudentDetails?id=` + id);
  }
}