import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SecurityService } from '../../security/security.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit, OnDestroy {
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
    this.securityService.logoutUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
