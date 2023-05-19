import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthRoleService } from 'src/app/modules/auth';
import { IPermissionActions, sModuleName, TActionPermission, TRole } from 'src/app/utils';
// import { PermissionManagerService } from './permission-manager.service';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective implements OnInit {
  private roles: TRole[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef, // private userService: UserService
    private authRole: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.updateView2();
  }

  @Input()
  set appRoles(roles: TRole[]) {
    this.roles = roles;

    this.updateView2();
  }

  private updateView2(): void {
    this.viewContainer.clear();
    if (this.checkWithRole()) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private checkWithRole(): boolean {
    return !!this.authRole.containRole(this.roles);
  }
}
