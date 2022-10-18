import { BaseComponent } from './../../base/base.component';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  constructor() { }

  async loadComponent(component: ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;
    switch (component) {

      case ComponentType.BasketsComponent:
        _component =  (await (import("../../ui/components/baskets/baskets.component"))).BasketsComponent
        break;

      default:
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);

  }
}
export enum ComponentType {
  BasketsComponent,
}