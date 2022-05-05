import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUnit'
})
export class FileUnitPipe implements PipeTransform {

  transform(value: number): string {
    let size: string;
    if (value > 1000*1000) {
      return 'MB';
    }
    else {
      return 'KB';
    }
  }
}