import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthRoleService } from 'src/app/core/auth/services/auth-role.service';
import { TRole } from 'src/app/utils';
// import { PermissionManagerService } from './permission-manager.service';

@Directive({
  selector: '[appRoles]',
})
export class RolesDirective implements OnInit {
  private roles: TRole[] = [];

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef, // private userService: UserService
    private authRole: AuthRoleService
  ) {}

  ngOnInit(): void {
    this.viewUpdate();
  }

  @Input()
  set appRoles(roles: TRole[]) {
    this.roles = roles;

    this.viewUpdate();
  }

  private viewUpdate(): void {
    this.viewContainer.clear();
    if (this.checkWithRole()) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  private checkWithRole(): boolean {
    return !!this.authRole.containRole(this.roles);
  }
}
