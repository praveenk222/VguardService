import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number): string {
    const days: number = Math.floor(value / 86400);
    const hours: number = Math.floor((value % 86400) / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ('00' + days).slice(-2) +
      'd ' +
      ('00' + hours).slice(-2) +
      'h ' +
      ('00' + minutes).slice(-2) +
      'm ' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2) +
      's'
    );
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}