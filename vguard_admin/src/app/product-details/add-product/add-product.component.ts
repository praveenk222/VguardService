import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDetailsService } from '../../services/product-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertServiceService } from '../../services/sweet-alert-service.service';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit{
  productForm:FormGroup;
  measurements:any;
  pid:any=0;
  productTypes:[];
  vehicleTypes:[];
  constructor(private productService:OrderService,    private route: ActivatedRoute, 
    private spinners:NgxSpinnerService,private fb:FormBuilder,
    private router:Router,private alertsr:SweetAlertServiceService){
    
   this.pid= this.route.snapshot.paramMap.get('id')!;
  
  }
  ngOnInit(){
  if(this.pid > 0){

    this.getPoruductByID();
  }
  this.getMeasurement()
  this.productForm = this.fb.group({
    productID: [null, [Validators.required]], // Required field
    productName: ['', [Validators.maxLength(150)]], // Optional with max length
    vehicleRegistrationNo: ['', [Validators.required, Validators.maxLength(50)]], // Required with max length
    batterySerialNo: ['', [Validators.required, Validators.maxLength(50)]], // Required with max length
    purchaseDate: [null, [Validators.required]], // Required field
    model: ['', [Validators.maxLength(200)]], // Optional with max length
    category: [null], // Optional
    quantity: [null], // Optional
    brand: ['', [Validators.maxLength(50)]], // Optional with max length
    size: ['', [Validators.maxLength(100)]], // Optional with max length
    isActive: [true, [Validators.required]], // Required field with default value
    createdOn: [new Date(), []], // Default to current date
    modifiedOn: [null], // Optional
    lastServiceDate: [null], // Optional
    vehicleType: [null], // Optional
    productType: [null] ,
      // Newly added fields
      emailID: ['', [Validators.required, Validators.email]], // Required and valid email
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Required, 10-digit number
      firstName: ['', [Validators.required, Validators.maxLength(50)]], // Required with max length
      lastName: ['', [Validators.required, Validators.maxLength(50)]], // Required with max length
      memberType: ['', [Validators.required]], // Required field
      pinCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // Required, 6-digit pin code
    // Optional
  });
}
getPoruductByID(){
  this.productService.getProductdetails(this.pid).subscribe(res=>{
    console.log(res);
    this.productForm.patchValue(res[0]);
  })
}
  submitForm() {
    this.spinners.show();
    const data=this.productForm.value;
   
    if (this.productForm.valid) {
      this.productService.createProduct(data).subscribe((res: any) => {
      if(res.isSuccess){
        this.alertsr.showSuccess('Product',res.Message);
        this.spinners.hide();

        this.productForm.reset();
        this.router.navigateByUrl('getProduct')
      }
      else{
        this.alertsr.showFailure('Please fill all details')
        this.spinners.hide();
      }
    })
    }

}
getMeasurement(){
  this.productService.getLookupList().subscribe((res: any) => {
    this.measurements=res
    console.log(res)
  
 })
}
goBack(){
  this.router.navigateByUrl('/getProduct')
}
}
