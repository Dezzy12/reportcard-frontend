import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../../../../../services/school.service";
import {School} from "../../../../../models/dto/school.model";

@Component({
  selector: 'app-admin-add-teacher',
  templateUrl: './admin-add-teacher.component.html',
  styleUrls: ['./admin-add-teacher.component.scss']
})
export class AdminAddTeacherComponent implements OnInit {
  schools: School[] = [];


  constructor(
    private _schoolService: SchoolService,
  ) {

  }

  ngOnInit(): void {
    this._schoolService.getAll().subscribe(schools => this.schools = schools);
  }
}
