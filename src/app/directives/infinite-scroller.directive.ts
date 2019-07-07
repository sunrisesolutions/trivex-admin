import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/startWith';
import { fromEvent, Observable } from 'rxjs';

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

  private element = this.elm.nativeElement;

  private bodyElement;

  private scrollEvent$;

  private userScrolledDown$;

  private requestStream$;

  private requestOnScroll$;

  @Input()
  scrollCallback;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 70;

  constructor(private elm: ElementRef) {
    this.bodyElement = this.element.closest('body');
  }

  ngAfterViewInit() {

    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();

  }

  private registerScrollEvent() {
    let parent = this.element.parentElement;
    let grandParent = parent.parentElement;
    let contentPanel = grandParent.parentElement.parentElement.parentElement;
    let scrollableContainer = contentPanel.parentElement.parentElement.parentElement;
    this.scrollEvent$ = fromEvent(scrollableContainer, 'scroll');

  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .map((e: any): ScrollPosition => ({
        sH: this.element.scrollHeight,
        sT: this.element.getBoundingClientRect().y,
        cH: this.element.clientHeight
      }))
      .pairwise()
      .filter(positions => {
        return this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])
      });
  }

  private requestCallbackOnScroll() {

    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$
        .startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]);
    }

    this.requestOnScroll$
      .exhaustMap(() => this.scrollCallback())
      .subscribe(() => {
      });

  }

  public isUserScrollingDown = (positions) => {
    return positions[0].sT > positions[1].sT;
  }

  public isUserScrollingUp = (positions) => {
    console.log('Client Height')
    return positions[0].cH == positions[1].cH;
  }

  private isScrollExpectedPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  }

}
