import { DialogService } from 'src/app/sevices/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from './../../../sevices/common/models/application.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Menu } from 'src/app/contracts/application-configurations/menu';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthorizeMenuDialogComponent, AuthorizeMenuDialogState } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private applicationService:ApplicationService,
    private dialogService:DialogService) {
    super(spinner);
  }
  async ngOnInit() {
    this.dataSource.data = await (await this.applicationService.getAuthorizeDefinitionEndpoints())
      .map(m => {
        const treeMenu: ITreeMenu = {
          name: m.name,
          actions: m.actions.map(a => {
            const _treeMenu: ITreeMenu = {
              name: a.definition,
              code: a.code,
              menuName:m.name
            }
            return _treeMenu;
          })
        };
        return treeMenu;
      });
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.actions?.length > 0,
        name: menu.name,
        level: level,
        code: menu.code,
        menuName:menu.menuName
      };
    },
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.actions
  );

  
  assignRole(code:string,name:string,menuName:string){
    this.dialogService.openDialog({
      componentType:AuthorizeMenuDialogComponent,
      data:{code:code,name:name,menuName:menuName},
      options:{
        witdh:"750px"
      },
      afterClosed:()=>{

      }
    });
  }
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface ITreeMenu {
  name?: string,
  actions?: ITreeMenu[],
  code?: string
  menuName?:string
}
