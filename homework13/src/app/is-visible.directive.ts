import { Directive, Input, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective {
  @Input() visible:boolean;
  constructor(private e: ElementRef, private r: Renderer2) {}  
  
  onInit(){
    if (this.visible==false) this.e.nativeElement.style.display ='none';
  }

}
