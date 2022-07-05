import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Fitra';

  @ViewChild('canvas') canvas: ElementRef!;

  mergeImages() {
    let canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let context = canvas.getContext('2d');

    let img1 = new Image();
    let img2 = new Image();

    img1.onload = function() {
      canvas.width = img1.width;
      canvas.height = img1.height;
      img2.src = 'imgfile2.png';
    };

    img2.onload = function() {
      context.globalAlpha = 1.0;
      context.drawImage(img1, 0, 0);
      context.globalAlpha = 0.5; //Remove if pngs have alpha
      context.drawImage(img2, 0, 0);
    };

    img1.src = 'imgfile1.png';
  }
}
