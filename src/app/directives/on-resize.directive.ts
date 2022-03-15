import { Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appOnResize]'
})
export class OnResizeDirective implements OnDestroy {

  constructor(private el: ElementRef) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
