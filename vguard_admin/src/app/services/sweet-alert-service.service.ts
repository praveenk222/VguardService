import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertServiceService {

  showConfirmation(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
    }).then((result:any) => {
      return result.value ? true : false;
    });
  }
  showSuccess(title:string,text:string){
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  }
  showFailure(text:string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  }
}
