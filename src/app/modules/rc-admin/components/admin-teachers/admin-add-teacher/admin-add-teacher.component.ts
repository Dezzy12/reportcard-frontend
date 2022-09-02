import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../services/auth.service";
import {User} from "../../../../../models/dto/user.model";
import {Role} from "../../../../../models/enum/role.enum";
import {Teacher} from "../../../../../models/dto/teacher.model";
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
