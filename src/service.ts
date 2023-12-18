import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  readonly apiUrl = 'https://localhost:7288/api/Values';
  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  GetStudentDetails() {
    return this.http.get(`${this.apiUrl}/GetStudentDetails`);
  }

  GetStudentDetailsByID(id: number) {
    return this.http.get(`${this.apiUrl}/GetStudentDatailByID?id=` + id)
  }

  AddStudentDetails(formData: any) {
    return this.http.post(`${this.apiUrl}/AddStudentDetails`, formData);
  }

  EditStudentData(formData: any) {
    return this.http.put(`${this.apiUrl}/UpdateStudentDetails`, formData)
  }

  DeleteeStudentDetails(id: any) {
    return this.http.delete(`${this.apiUrl}/DeleteeStudentDetails?id=` + id);
  }

  // 
  showSuccess() {
    this.toastrService.success('Students Details Add Successfully!', 'Title Success!');
  }
  
  showError() {
    this.toastrService.error('Students Details Delete Successfully!', 'Title Error!');
  }
}