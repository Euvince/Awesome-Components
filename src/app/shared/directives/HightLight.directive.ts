import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";


@Directive({
  selector : '[hightlight]'
})
export class HightLightDirective implements AfterViewInit {

  @Input() public color = 'yellow'

  public constructor (
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    this.setBackgroundColor(this.color)
  }

  private setBackgroundColor (color : string) : void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', color)
  }

  @HostListener('mouseenter') public onMouseEnter () : void  {
    this.setBackgroundColor('green')
  }

  @HostListener('mouseleave') public onMouseLeave () : void  {
    this.setBackgroundColor(this.color)
  }

  @HostListener('click') public onClick () : void  {
    this.color = 'green'
  }

}
