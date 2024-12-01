import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(row: any, f1: Date, f2: Date): any {

    const resultadoFiltro = [];
    let date1 = new Date(f1);
    let date2 = new Date(f2);
    // si es menor a la fecha final
    if (f1 >= f2 || f1 == null) {
      return row;
    }
    // si el argumento de fecha final es invalido, se setea a la fecha actual
    if (f2 == null) {
      f2 = new Date();
    }
    // si ambos arreglos son correctos entonces se crea el nuevo arrego
    for (const filteredRow of row) {
      let a = new Date(filteredRow.fecha);
      console.log(a);
    
      if (a > date1 && a <= date2) {
        console.log("asd", filteredRow);
        resultadoFiltro.push(filteredRow);
      }
    }
    return resultadoFiltro;
      }

}
