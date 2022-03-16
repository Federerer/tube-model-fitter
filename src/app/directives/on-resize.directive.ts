import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
@Directive({
  selector: '[appOnResize]'
})
export class OnResizeDirective implements OnDestroy {

  private observer: ResizeObserver;

  @Output() onResize = new EventEmitter<DOMRectReadOnly>();

  constructor(private el: ElementRef) {
    this.observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        this.onResize.emit(cr);
      }
    });
    this.observer.observe(el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}
