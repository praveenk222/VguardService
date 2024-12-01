import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {
  transform(startTime: string, endTime: string): any {
    let result='';
    const start = new Date(startTime);
    const end = new Date(endTime);
    // const end = new Date(`1970-01-01T${endTime}`);

    const timeDifference = end.getTime() - start.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    switch (true) {
      case days !== 0:
        return `${days} day(s)`;

        break;
      case hours !== 0:
        return`${hours} hour(s)`;
        break;
      case days !== 0 && hours !==0:
        return`${days} day(s) ${hours} hour(s)`;
        break;
      default:
        break
        return result;
    }

    // `${hours} hours ${minutes} minutes`;
}
}