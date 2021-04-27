import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sn-textarea',
  templateUrl: './sn-textarea.component.html',
  styleUrls: ['./sn-textarea.component.scss']
})
export class SnTextareaComponent{
  @Input('max-height') maxHeight = 1500;
  @Output('valChange') valChange = new EventEmitter();
  @ViewChild('text') text: ElementRef;
  @ViewChild('text1') text1: ElementRef;
  @Input('value') val = '';

  public clean(){
    this.val = '';
  }

  constructor(
    private rd2: Renderer2) { }

  onChange() {
    this.reset();
    setTimeout(() => {
      this.valChange.emit(this.val);
      this.reset();
    }, 0)

  }
  reset() {
    this.text1.nativeElement.style.width = (this.text.nativeElement.scrollWidth + 3) + 'px';
    if (this.text1.nativeElement.scrollHeight < this.maxHeight) {
      this.text.nativeElement.style.height = (this.text1.nativeElement.scrollHeight + 3) + 'px'
    }
  }

}
