import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
  standalone: true,
})
export class SummaryPipe implements PipeTransform {
  transform(value: string, endIndex: number = 50) {
    return value.substring(0, endIndex);
  }
}
