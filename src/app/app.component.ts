import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('parent') parent!: ElementRef<HTMLInputElement>;
  @ViewChild('one') one!: ElementRef<HTMLInputElement>;
  @ViewChild('two') two!: ElementRef<HTMLInputElement>;
  @ViewChild('three') three!: ElementRef<HTMLInputElement>;
  @ViewChild('four') four!: ElementRef<HTMLInputElement>;
  @ViewChild('five') five!: ElementRef<HTMLInputElement>;

  sectionIndex: number = 0;
  divs: ElementRef<HTMLInputElement>[] = [];
  bgColors = ['#183f67', '#39830c', '#fff', '#944c97', '#980f38'];
  fgColors = ['white', 'white', 'black', 'white', 'white'];
  sectionTitle = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5'];

  constructor(private window: Window) { }

  /**
   * Only after this lifecycle hook @ViewChild variables are defined.
   */
  ngAfterViewInit() {
    this.divs = [this.one, this.two, this.three, this.four, this.five];
    this.onResizeOrScroll();
  }

  onResizeOrScroll() {
    this.updateBackgrund(this.window.scrollY, this.window.innerHeight);
  }

  /**
   * Determines the div with the heighest intersection with the actual visible
   * screen size and scroll position.
   * Set background color on parent div based on the result.
   * 
   * @param screenY Scroll Y-position of the screen
   * @param screenH Height of the inner screen (visible screen area)
   */
  updateBackgrund(screenY: number, screenH: number) {

    let currentMax: number = 0;
    let currentIndex: number = 0;

    for (let i = 0; i < this.divs.length; i++) {
      let intersectionHeight = 
        this.getIntersectionHeight(screenY, screenH, this.divs[i].nativeElement.offsetTop, this.divs[i].nativeElement.offsetHeight);
        if (intersectionHeight > currentMax) {
          currentMax = intersectionHeight;
          currentIndex = i;
        }
    }
    this.parent.nativeElement.style.backgroundColor = this.bgColors[currentIndex];
    this.parent.nativeElement.style.color = this.fgColors[currentIndex];
    this.sectionIndex = currentIndex;
  }

  /**
   * Calculates the height of the intersection of visible screenarea
   * rectangle and the div rectangle.
   * 
   * @param screenY Scroll Y-position of the screen
   * @param screenH Height of the inner screen (visible screen area)
   * @param divTop Top Y-position of the div
   * @param divHeight Height of the div
   * @returns Either the height of the intersection or 0 in case of no intersection.
   */
  getIntersectionHeight(screenY: number, screenH: number, divTop: number, divHeight: number): number {
    let result = 0;
    let minY = Math.max(screenY, divTop);
    let maxY = Math.min(screenY + screenH, divTop + divHeight);
    if (minY < maxY) {
      result = maxY - minY;
    }
    return result;
  }

  /**
   * Scrolls to Div at index. 
   * @param index Index of Div
   */
   onStickyNavSelection(index: number) {
    this.divs[index].nativeElement.scrollIntoView();
  }

}