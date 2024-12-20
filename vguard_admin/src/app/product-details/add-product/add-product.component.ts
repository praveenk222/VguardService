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
  vehicleTypes:[{id:1,name:'two wheeler'}];
  productTypes:[];
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
    productData: this.fb.group({
      ProductID: [, null], // Required field
      ProductName: ['', [Validators.maxLength(150)]], // Optional with max length
      VehicleRegistrationNo: ['', [Validators.maxLength(50)]], // Required with max length
      BatterySerialNo: ['', [Validators.maxLength(50)]], // Required with max length
      PurchaseDate: ['', []], // Required field
      ExpiryDate: ['', ], // Required field
      IsActive: [true], // Required field with default value
      CreatedOn: [new Date(), []], // Default to current date
      ModifiedOn: [null], // Optional
      LastServiceDate: [null], // Optional
      VehicleType: [null], // Optional
    }),
    userData: this.fb.group({
      UserType: ['Customer'], // Default value
      EmailID: ['', [Validators.email]], // Required and valid email
      MobileNo: ['', [Validators.pattern(/^\d{10}$/)]], // Required, 10-digit number
      FirstName: ['', [Validators.maxLength(50)]], // Required with max length
      LastName: ['', [Validators.maxLength(50)]], // Required with max length
      PinCode: ['', [Validators.pattern(/^\d{6}$/)]], // Optional, 6-digit number
    })
  });
  
}
getPoruductByID(){
  this.productService.getProductdetails(this.pid).subscribe(res=>{
    console.log(res);
    this.productForm.patchValue(res[0]);
  })
}
  submitForm() {
    this.updateExpiryDate();
    if (this.productForm.valid) {
      this.spinners.show();
      this.productService.createProduct(this.productForm.value).subscribe(
        (res: any) => {
          if(res.isSuccess){
            this.alertsr.showSuccess('Product',res.Message);
            this.spinners.hide();

            this.productForm.reset();
            this.router.navigateByUrl('getProduct')
          }
          else{
            this.spinners.hide();
            this.alertsr.showFailure('Please fill all details')
          }
    },(error:any)=>{
      this.spinners.hide();
      this.alertsr.showFailure('failed to save')

    }
  
  )
    }

}
  updateForm() {
    if (this.productForm.valid) {
      this.spinners.show();
      this.productService.updateProduct(this.productForm.value,this.pid).subscribe(
        (res: any) => {
          if(res.isSuccess){
            this.alertsr.showSuccess('Product',res.Message);
            this.spinners.hide();

            this.productForm.reset();
            this.router.navigateByUrl('getProduct')
          }
          else{
            this.spinners.hide();
            this.alertsr.showFailure('Please fill all details')
          }
    },(error:any)=>{
      this.spinners.hide();
      this.alertsr.showFailure('failed to save')

    }
  
  )
    }

}
 // Method to calculate ExpiryDate based on PurchaseDate
 updateExpiryDate() {
  const purchaseDate = this.productForm.get('productData.PurchaseDate')?.value;
  if (purchaseDate) {
    const expiryDate = new Date(purchaseDate);
    expiryDate.setDate(expiryDate.getDate() + 30); // Add 30 days
    this.productForm.get('productData.ExpiryDate')?.setValue(expiryDate.toISOString().split('T')[0]);
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
