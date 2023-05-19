import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthRoleService } from 'src/app/modules/auth';
import { IPermissionActions, sModuleName, TActionPermission, TRole } from 'src/app/utils';
// import { PermissionManagerService } from './permission-manager.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective implements OnInit {
  // private currenUserRolePermissions: AuthRoleService = new AuthRoleService();
  private actions: TActionPermission[] = [];
  private roles: TRole[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef, // private userService: UserService
    private authRole: AuthRoleService
  ) {}

  ngOnInit(): void {
    // this.userService.currentUser.subcribe((user: RoleUser) => {
    // this.currenUserRolePermissions.setPermissionLocalStorage();
    this.updateView();
    // });
  }

  @Input()
  set appRole(modPerm: [sModuleName, TActionPermission]) {
    const [_module, ..._actionPermissions] = modPerm;

    // this.viewContainer.createEmbeddedView(this.templateRef)
    this.actions = _actionPermissions;

    this.authRole.setActionPermissionsByModule(_module);
    this.updateView();
  }

  @Input()
  set appRoles(modRoles: TRole[]) {
    const roles = modRoles;
    this.roles = roles;

    this.updateView2();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private updateView2(): void {
    this.viewContainer.clear();
    if (this.checkWithRole()) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private checkPermission(): boolean {
    if (this.actions.includes('login-center')) return !!this.authRole.canCenterLogin();
    if (this.actions.includes('all')) return true;
    if (this.actions.includes('any') && !!this.authRole.actionPermissions?.length) return true;

    if (!this.authRole.actionPermissions) return false;

    // let hasPermission = false;
    for (const checkPermission of this.actions) {
      const permissionFound = this.authRole.actionPermissions.find((p) => p === checkPermission);

      if (permissionFound) return true;
      if (permissionFound) break;
    }

    return false;
  }
  private checkWithRole(): boolean {
    return !!this.authRole.containRole(this.roles);
  }
}
