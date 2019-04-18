import { Directive, ElementRef, Renderer2,HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMakeBigger]'
})
export class MakeBiggerDirective {

  size:number = 22;
  constructor(private e: ElementRef, private r: Renderer2) {}
   
  @HostBinding('style.font-size.px') mySize;
  @HostListener('mouseleave') biggerSize(){    
    this.mySize = this.size+2;
    this.size = this.mySize;    
 } 
}