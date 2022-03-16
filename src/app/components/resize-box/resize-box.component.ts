import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-resize-box',
  templateUrl: './resize-box.component.html',
  styleUrls: ['./resize-box.component.scss']
})
export class ResizeBoxComponent implements OnInit {

  public style: object = { };

  constructor() { }

  ngOnInit(): void {
  }

  onResize(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };

  }
}
