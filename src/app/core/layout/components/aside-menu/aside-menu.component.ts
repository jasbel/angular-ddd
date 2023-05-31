import { TRoutePattern } from '../../../../utils/interfaces/route-navigation.interface';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

enum EMenuType {
  create = 'Crear',
  list = 'Listar',
}

enum EMenuIcon {
  create = 'fa-solid fa-circle-plus',
  list = 'fa-solid fa-rectangle-list',
}

enum EMenuTitle {
  user = 'Usuarios',
  totalizer = 'Totalizadores',
  collection = 'Coleccion',
  dashboard = 'Dashboard',
  dated = 'Datos',
  readed = 'Lecturas',
  oil = 'Aceites',
  dispatched = 'Despachos',
  sale = 'Ventas',
  bankOperation = 'Op. Bancarias',
  pettyCash = 'Caja Chica',
}

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */

interface IMenuSingle {
  name: string;
  link: TRoutePattern | '';
  icon: string | '';
}
interface IFlatNode extends IMenuSingle {
  expandable: boolean;
  level: number;
}
interface IMenu extends IMenuSingle {
  children?: IMenu[];
}

const dataMenu: IMenu[] = [
  {
    name: EMenuTitle.totalizer,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/totalizers' }],
  },
  {
    name: EMenuTitle.collection,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/collections' }],
  },
  {
    name: EMenuTitle.user,
    link: '',
    icon: '',
    children: [
      { name: EMenuType.create, icon: EMenuIcon.create, link: '/users/create' },
      { name: EMenuType.list, icon: EMenuIcon.list, link: '/users' },
    ],
  },

  {
    name: EMenuTitle.dated,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },
  {
    name: EMenuTitle.readed,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },
  {
    name: EMenuTitle.oil,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },

  {
    name: EMenuTitle.dispatched,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },
  {
    name: EMenuTitle.sale,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },
  {
    name: EMenuTitle.bankOperation,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },
  {
    name: EMenuTitle.pettyCash,
    link: '',
    icon: '',
    children: [{ name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' }],
  },

  {
    name: EMenuTitle.dashboard,
    link: '',
    icon: '',
    children: [
      { name: EMenuType.list, icon: EMenuIcon.list, link: '/dashboard' },
      {
        name: 'Setting',
        link: '',
        icon: '',
        children: [{ name: 'Config', icon: EMenuIcon.list, link: '/dashboard' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent {
  menuIcon: { [key: string]: string } = EMenuIcon;

  private _transformer = (node: IMenu, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      icon: node.icon,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<IFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = dataMenu;
  }

  hasChild = (_: number, node: IFlatNode) => node.expandable;

  openView() {
    console.log('working');
  }
}
