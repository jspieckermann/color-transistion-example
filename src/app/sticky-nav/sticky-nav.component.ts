import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sticky-nav',
  templateUrl: './sticky-nav.component.html',
  styleUrls: ['./sticky-nav.component.less']
})
export class StickyNavComponent implements OnInit {

  @Input() currentIndex: number = 1;
  @Output() selectionEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  select(index: number): void {
    this.selectionEmitter.emit(index);
  }

}
