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
    ProductID: [1213,null], // Required field
    ProductName: ['', [Validators.maxLength(150)]], // Optional with max length
    VehicleRegistrationNo: ['', [ Validators.maxLength(50)]], // Required with max length
    BatterySerialNo: ['', [ Validators.maxLength(50)]], // Required with max length
    PurchaseDate: ['', ], // Required field
    IsActive: [true, ], // Required field with default value
    CreatedOn: [new Date(), []], // Default to current date
    ModifiedOn: [null], // Optional
    LastServiceDate: [null], // Optional
    VehicleType: [null], // Optional
    ProductType: [null] ,
    UserType: ['Customer'] ,
    EmailID: ['', [ Validators.email]], // Required and valid email
    MobileNo: ['', [ Validators.pattern(/^\d{10}$/)]], // Required, 10-digit number
    FirstName: ['', [ Validators.maxLength(50)]], // Required with max length
    LastName: ['', [ Validators.maxLength(50)]], // Required with max length
    PinCode: ['', [ Validators.pattern(/^\d{6}$/)]], // Required, 6-digit pin code
    // MemberType: ['2', ], // Required field
    // model: ['', [Validators.maxLength(200)]], // Optional with max length
    // category: [null], // Optional
    // quantity: [null], // Optional
    // brand: ['', [Validators.maxLength(50)]], // Optional with max length
    // size: ['', [Validators.maxLength(100)]], // Optional with max length
      // Newly added fields
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
   
    const productData={}
    const  userData ={}
    // const data=this.productForm.value;
    const data=
      {
        "productData": {
          "ProductName": "Battery",
          "VehicleRegistrationNo": '',
          "BatterySerialNo": "BATT123456789",
          "PurchaseDate": "2024-12-01",
          "IsActive": true
        },
        "userData": {
          "EmailID": "john.doe@example.com",
          "MobileNo": "9876543210",
          "FirstName": "John",
          "LastName": "Doe",
          "MemberType": "Premium",
          "PinCode": "560001"
        }
    }
    // data.productData.ProductID++;
    if (this.productForm.valid) {
      this.spinners.show();
      this.productService.createProduct(data).subscribe(
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
