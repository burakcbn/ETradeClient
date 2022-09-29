import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';


export class BaseComponent  {

constructor(private spinner:NgxSpinnerService){}

  show(spinnerType:SpinnerType){
    this.spinner.show(spinnerType);
  
  }

  hide(spinnerType:SpinnerType){
    this.spinner.hide(spinnerType);
  }

}

export enum SpinnerType{
  BallAtom="ballAtom",
  BallScaleMultiple="ballScaleMultiple",
  BallSpinClockwiseFadeRotating="ballSpinClockwiseFadeRotating",
}
