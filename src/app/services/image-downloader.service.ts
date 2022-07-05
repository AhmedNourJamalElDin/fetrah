import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageDownloaderService {

  constructor() {
  }

  public download(fileName: string, url: string) {
    const link = document.createElement('a'); // create an anchor tag

    // set parameters for downloading
    link.href = url;
    link.target = '_blank';
    link.type = 'hidden';
    link.download = fileName;

    // compat mode for dispatching click on your anchor
    if (document.createEvent) {
      const evtObj = document.createEvent('MouseEvents');
      evtObj.initEvent('click', true, true);
      link.dispatchEvent(evtObj);
      link.remove();
    } else if (link.click) {
      link.click();
      link.remove();
    }
  }
}
