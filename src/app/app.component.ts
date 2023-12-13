import { Component } from '@angular/core';
import { ServiceService } from 'src/service';
import { StudentDATA } from './CrudAPI.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataStudentDetails: any;
  dataStudentDetailsByID: any;
  showModal: boolean = false;
  showEditModal: boolean = false;
  ngOnInit() {
    this.getdata();
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.showEditModal=false;
  }

  getdata() {
    this.ServiceService.GetStudentDetails().subscribe((data: any) => {
      this.dataStudentDetails = data;
    });
  }

  EditData(id: number) {
    this.ServiceService.GetStudentDetailsByID(id).subscribe(data => {
      this.dataStudentDetailsByID = data;
      this.showEditModal = true;
    })
  }

  deleteData(id: any) {
    this.ServiceService.DeleteeStudentDetails(id).subscribe(data => {
      this.dataStudentDetails = data;
      this.getdata();
    });
  }

  constructor(private ServiceService: ServiceService) { }
}
