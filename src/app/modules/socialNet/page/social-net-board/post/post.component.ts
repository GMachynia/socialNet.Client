import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(private _ngZone: NgZone) {}
  @Input('postData') postContent: any;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}

