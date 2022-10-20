import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../../../../models/dto/student.model";
import {StudentService} from "../../../../../services/student.service";
import {Gender} from "../../../../../models/enum/gender.enum";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  student!: Student;
  genders: Gender[] = [Gender.FEMALE, Gender.MALE, Gender.OTHER];
  studentForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {
    const studentId = this.activatedRoute.snapshot.params['id'];
    if (studentId) {
      this.studentService.getById(studentId).subscribe({
        next: (res) => {
          this.student = res;
          this.setUpStudentForm();
        },
        error: () => this.router.navigate(['/dashboard/student']).then()
      })
    }
  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      pob: ['', Validators.required],
    });
  }

  setUpStudentForm(): void {
    this.studentForm = this.fb.group({
      firstname: [this.student.user.firstName, Validators.required],
      lastname: [this.student.user.lastName, Validators.required],
      gender: [this.student.gender, Validators.required],
      dob: [new Date(this.student.dob), Validators.required],
      pob: [this.student.pob, Validators.required],
    });
  }

  saveStudentAction() {

  }
}
