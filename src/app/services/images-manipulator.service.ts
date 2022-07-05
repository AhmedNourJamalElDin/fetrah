import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagesManipulatorService {

  isMergedSubject = new Subject<boolean>();

  constructor() { }

  merge(canvas: HTMLCanvasElement, file: File, opacity: number) {
    let reader = new FileReader();

    let context = canvas.getContext('2d')!;

    let myImage = new Image();
    let fetrahImage = new Image();

    myImage.onload = () => {
      canvas.width = myImage.width;
      canvas.height = myImage.height;
      fetrahImage.src = 'assets/fetra.jpg';
    };

    fetrahImage.onload = () => {
      context.globalAlpha = opacity;
      context.drawImage(myImage, 0, 0);
      context.globalAlpha = 0.5; //Remove if pngs have alpha
      context.drawImage(fetrahImage, 0, 0, myImage.width, myImage.height);

      this.isMergedSubject.next(true);
    };

    reader.onload = (event) => {
      myImage.src = event.target!.result! as string;
    };

    reader.readAsDataURL(file);
  }
}
