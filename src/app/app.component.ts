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
  dataStudentDetails:any;
  dataStudentDetail:any=[];
  showModal: boolean = false;
  showEditModal: boolean = false;

  AddData = new FormGroup({
    StudentId: new FormControl(),
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
      this.dataStudentDetail = data;
    });
  }

  SaveData() {
    this.ServiceService.AddStudentDetails(this.AddData.value).subscribe((data: any) => {
      this.dataStudentDetails = data;
      this.getdata();
      this.showModal = false;
    });
  }

  EditData(id: number) {
    this.ServiceService.GetStudentDetailsByID(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.AddData.controls['StudentName'].setValue(this.dataStudentDetails.studentName)
      this.AddData.controls['StudentId'].setValue(this.dataStudentDetails.studentId )
      this.AddData.controls['StudentClass'].setValue(this.dataStudentDetails.studentClass)
      this.AddData.controls['StudentGender'].setValue(this.dataStudentDetails.studentGender)
      this.AddData.controls['StudentNo'].setValue(this.dataStudentDetails.studentNo)
      this.AddData.controls['StudentMark'].setValue(this.dataStudentDetails.studentMark)
      this.showEditModal = true;
    })
  }

  UpdateData(){
    debugger
    this.ServiceService.EditStudentData(
      this.AddData.value).subscribe((data:any)=>{
      this.dataStudentDetails=data;
      this.showEditModal= false;
      this.getdata();
    });
  }

  deleteData(id: any) {
    this.ServiceService.DeleteeStudentDetails(id).subscribe(data => {
      this.dataStudentDetails = data;      
    });
    this.getdata();
  }

  show() {
    this.showModal = true;
    this.AddData = new FormGroup({
      StudentId: new FormControl(),
      StudentName: new FormControl("", [Validators.required]),
      StudentClass: new FormControl("", [Validators.required]),
      StudentGender: new FormControl("", [Validators.required]),
      StudentNo: new FormControl("", [Validators.required]),
      StudentMark: new FormControl("", [Validators.required])
    })
  }

  hide() {
    this.showModal = false;
    this.showEditModal = false;   
  }


  constructor(private ServiceService: ServiceService) { }
}
