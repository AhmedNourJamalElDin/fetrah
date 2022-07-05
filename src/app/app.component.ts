import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ImageDownloaderService} from "./services/image-downloader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fetrah | فِطرة';

  form = new FormGroup({
    file: new FormControl(null, [Validators.required]),
    opacity: new FormControl(1, [Validators.required, Validators.max(1), Validators.min(0)]),
  });
  @ViewChild('canvas') canvas!: ElementRef;
  isMerged: boolean = false;

  constructor(private imageDownloader: ImageDownloaderService) {
  }

  get opacityControl() {
    return this.form.controls['opacity'] as FormControl;
  }

  get isNotMerged(): boolean {
    return !this.isMerged;
  }

  get fileControl() {
    return this.form.controls['file'] as FormControl;
  }

  save() {
    let url, fileName = null;

    if (!this.form.invalid && this.isMerged) {
      url = this.canvas.nativeElement.toDataURL()
        .replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      fileName ??= 'Fetrah-' + this.fileControl.value.name;
    } else {
      url = 'assets/fetra.jpg';
      fileName ??= "Fetrah.jpg";
    }

    this.imageDownloader.download(fileName, url);
  }

  generate() {
    let file = this.fileControl.value;

    let reader = new FileReader();

    let canvas: HTMLCanvasElement = this.canvas.nativeElement;
    let context = canvas.getContext('2d')!;

    let myImage = new Image();
    let fetraImage = new Image();

    myImage.onload = () => {
      canvas.width = myImage.width;
      canvas.height = myImage.height;
      fetraImage.src = 'assets/fetra.jpg';
    };

    fetraImage.onload = () => {
      context.globalAlpha = this.opacityControl.value;
      context.drawImage(myImage, 0, 0);
      context.globalAlpha = 0.5; //Remove if pngs have alpha
      context.drawImage(fetraImage, 0, 0, myImage.width, myImage.height);

      this.isMerged = true;
    };

    reader.onload = (event) => {
      myImage.src = event.target!.result! as string;
    };

    reader.readAsDataURL(file);
  }

  getFile($event: Event) {
    let target = $event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.fileControl.patchValue(target.files[0]);
    }
  }
}
