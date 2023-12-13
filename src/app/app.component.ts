import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/service';
import { StudentDATA } from './CrudAPI.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataStudentDetails: any;
  showModal: boolean = false;
  showEditModal: boolean = false;

  AddData = new FormGroup({
    StudentId: new FormControl(0),
    StudentName: new FormControl("", [Validators.required]),
    StudentClass: new FormControl("", [Validators.required]),
    StudentGender: new FormControl("", [Validators.required]),
    StudentNo: new FormControl("", [Validators.required]),
    StudentMark: new FormControl("", [Validators.required])
  })

  ngOnInit() {
    this.getdata();
  }

  getdata() {
    this.ServiceService.GetStudentDetails().subscribe((data: any) => {
      this.dataStudentDetails = data;
    });
  }

  SaveData() {
    debugger
    this.ServiceService.AddStudentDetails(this.AddData.value).subscribe((data: any) => {
      this.dataStudentDetails = data;
      this.getdata();
    });
  }

  EditData(id: number) {
    this.ServiceService.GetStudentDetailsByID(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.showEditModal = true;
    })
  }

  deleteData(id: any) {
    this.ServiceService.DeleteeStudentDetails(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.getdata();
    });
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.showEditModal = false;
  }

  constructor(private ServiceService: ServiceService) { }
}
