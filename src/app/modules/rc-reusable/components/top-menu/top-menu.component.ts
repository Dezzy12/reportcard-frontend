import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {ReportCardService} from "../../../../services/report-card.service";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-top-menu',
  styleUrls: ['./top-menu.component.scss'],
  template: `
    <div class="top-menu">
      <p-menubar [styleClass]="'p-3 text-color border-noround'" [model]="menuItems" [class]="'menu-item'">
        <ng-template pTemplate="start">
          <span class="text-4xl">iRC</span>
        </ng-template>
        <ng-template pTemplate="end">
          <div class="flex justify-content-center align-items-center">
            <a [hidden]="hideAdminLink" [routerLink]="'/admin'" pButton label="Admin" class="m-1"></a>
            <span
              class="{{online ? 'text-green-400 hover:text-green-600': 'text-red-400 hover:text-red-600' }}"
              pTooltip="{{online ? 'Online' : 'Offline'}}" tooltipPosition="top">
              {{online ? 'Online' : 'Offline'}}
            </span>
            <button (click)="logoutAction()" pButton pTooltip="Logout" tooltipPosition="top" icon="pi pi-power-off"
                    data-in-line="true" class="p-button-sm p-button-danger border-noround m-1"></button>
            <p-dropdown
              [options]="schoolsByAdmin" [optionValue]="'id'" [optionLabel]="'name'"
              [(ngModel)]="selectedSchoolId" (onChange)="changeSchoolAction()"></p-dropdown>
          </div>
        </ng-template>
      </p-menubar>
    </div>
  `
})
export class TopMenuComponent implements OnInit {

  online: boolean = false;
  hideAdminLink: boolean = true;
  @Input() menuItems: MenuItem[] = [];
  schoolsByAdmin: School[] = [];
  selectedSchoolId: number = LocalStorageUtil.readSchoolId() ?? -1;


  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _defaultService: ReportCardService,
    private _msgService: MessageService,
    private _userService: UserService,
    private _schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
    this.loadSchoolsByAdmin();
  }

  loadSchoolsByAdmin = () => this._userService.getCompleteFromSession().subscribe(u => {
    if (!u.account) this.hideAdminLink = false;
    this._schoolService.getAllByOwner(u.user.id).subscribe(schools => this.schoolsByAdmin = schools);
  })

  checkOnlineStatus(): void {
    this._defaultService.test().subscribe({
      next: () => this.online = true,
      error: () => this.online = false
    });
  }

  logoutAction() {
    const confirmDelete = confirm("Are you sure you want to log out?");
    const sessionId: string | null = LocalStorageUtil.readUserToken();
    if (sessionId && confirmDelete) {
      this._authService.logout({sessionId: sessionId}).subscribe({
        next: (res) => {
          this._router.navigate(['/auth/login']).then(() => {
            addToMessageService(this._msgService, 'success', 'Log out', res.message);
          });
          LocalStorageUtil.deleteUserToken();
          LocalStorageUtil.deleteSchoolId();
        }, error: (e: HttpErrorResponse) => {
          addToMessageService(this._msgService, 'warn', 'Log out', e.error.message)
        }
      });
    }

  }

  changeSchoolAction() {
    if (this.selectedSchoolId > 0) {
      LocalStorageUtil.writeSchoolId(this.selectedSchoolId);
      location.reload();
    }
  }
}
