import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent implements OnInit {
  admins: User[] = [];

  constructor(
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins = () => this._userService.getAllAdmin().subscribe((admins) => this.admins = admins);

}
