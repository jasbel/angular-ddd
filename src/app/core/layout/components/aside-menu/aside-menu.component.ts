import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  link: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Dashboard',
    link: '',
    children: [
      {
        name: 'Create',
        link: '/users',
      },
      {
        name: 'List',
        link: '/dashboard',
      },
    ],
  },
  {
    name: 'Users',
    link: '',
    children: [
      {
        name: 'Create',
        link: '/users',
      },
      {
        name: 'List',
        link: '/dashboard',
      },
      {
        name: 'Setting',
        link: '',
        children: [{ name: 'Config', link: '/users' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface IFlatNode {
  expandable: boolean;
  name: string;
  link: string;
  level: number;
}

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
})
export class AsideMenuComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
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
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: IFlatNode) => node.expandable;

  openView() {
    console.log('working');
  }
}
