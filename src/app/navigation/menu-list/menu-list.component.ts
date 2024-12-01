import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();

  userLogged: boolean;
  userSubscription: Subscription;

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.securityService.securityChange.subscribe(
      status => { this.userLogged = status; }
    )
  }

  onMenuToggleDispatch() {
    this.menuToggle.emit();
  }

  logoutUser() {
    this.onMenuToggleDispatch();
    this.securityService.logoutUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
