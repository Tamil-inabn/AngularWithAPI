import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/service';
import { StudentDATA } from './CrudAPI.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataStudentDetails: any;
  dataStudentDetail: any[] = [];
  showModal: boolean = false;
  showEditModal: boolean = false;
  studenName:string="";
  filteredDataToSearch:any[]=[];

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
      this.dataStudentDetail = data;
    });
  }

  DetailsGetByID() { 
    this.filteredDataToSearch = this.dataStudentDetail.filter((m) => m.studentName.includes(this.studenName));
    console.log(this.filteredDataToSearch);
    this.dataStudentDetail=this.filteredDataToSearch;
  }

  SaveData() {
    if (this.AddData.invalid) {
      this.AddData.markAllAsTouched();
      return;
    }
    this.ServiceService.AddStudentDetails(this.AddData.value).subscribe((data: any) => {
      this.dataStudentDetails = data;
      this.getdata();
      this.ServiceService.showSuccess();
      this.showModal = false;
    });
  }

  EditData(id: number) {
    this.ServiceService.GetStudentDetailsByID(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.AddData.controls['StudentName'].setValue(this.dataStudentDetails.studentName)
      this.AddData.controls['StudentId'].setValue(this.dataStudentDetails.studentId)
      this.AddData.controls['StudentClass'].setValue(this.dataStudentDetails.studentClass)
      this.AddData.controls['StudentGender'].setValue(this.dataStudentDetails.studentGender)
      this.AddData.controls['StudentNo'].setValue(this.dataStudentDetails.studentNo)
      this.AddData.controls['StudentMark'].setValue(this.dataStudentDetails.studentMark)
      this.showEditModal = true;
    })
  }

  UpdateData() {
    debugger
    if (this.AddData.invalid) {
      this.AddData.markAllAsTouched();
      return;
    }
    this.ServiceService.EditStudentData(
      this.AddData.value).subscribe((data: any) => {
        this.dataStudentDetails = data;
        this.showEditModal = false;
        this.ServiceService.showUpdate();
        this.getdata();
      });
  }

  deleteData(id: any) {
    this.ServiceService.DeleteeStudentDetails(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.getdata();
    });
    this.ServiceService.showError();
  }

  show() {
    this.showModal = true;
    this.AddData = new FormGroup({
      StudentId: new FormControl(0),
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
  constructor(private ServiceService: ServiceService, private fb: FormBuilder) { }
}
