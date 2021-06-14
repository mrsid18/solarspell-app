import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: number): string {
    let size: string;
    if (value > 1000*1000) {
      size = (value/(1024*1024)).toFixed(2);
      return size.concat(' MB');
    }
    else {
      size = (value/1024).toFixed(2);
      return size.concat(' KB');
    }
  }

}
