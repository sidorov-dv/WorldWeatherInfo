import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmHg'
})
export class HpatommhgPipe implements PipeTransform {

  transform(value: number): number {
    return 0.75*value;
  }

}
