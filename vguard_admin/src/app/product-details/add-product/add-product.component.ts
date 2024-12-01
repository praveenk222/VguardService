import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDetailsService } from '../../services/product-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertServiceService } from '../../services/sweet-alert-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent  implements OnInit{
  productForm:FormGroup;
  measurements:any;
  pid:any=0;

  constructor(private productService:ProductDetailsService,    private route: ActivatedRoute, 
    private spinners:NgxSpinnerService,private fb:FormBuilder,
    private router:Router,private alertsr:SweetAlertServiceService){
    
   this.pid= this.route.snapshot.paramMap.get('id')!;
  //  this.productForm =this.pf.group({
  
  //   name: ['', Validators.required],
  //   unitPrice: ['', [Validators.required, Validators.min(0)]],
  //   oldPrice: [''],
  //   discount: [''],
  //   unitInStock: ['', [Validators.required, Validators.min(0)]],
  //   productAvailable: [false],
  //   shortDescription: [''],
  //   supplierID: [4],  // Initialize with default values
  //   TypeID: [''],
  //   "MeasurementValue":'0',
  //   "categoryID":1,
  //   IsActive:[true],    
  //   MesurmentID: [''],
  //   picturePath: [''],
  //   note: [''],
  //   createdBy: ['Admin']


 

  //  })
  }
  ngOnInit(){
  if(this.pid > 0){

    this.getPoruductByID();
  }
  this.getMeasurement()
  this.productForm = this.fb.group({
    productID: [null], // Hidden or optional field
    name: ['', Validators.required],
    supplierID: [1],  // Initialize with default values
    categoryID: [null, ],
    subCategoryID: [null],
    unitPrice: ['', [Validators.required, Validators.min(0)]],
    oldPrice: [''],
    discount: [''],
    unitInStock: ['', [Validators.required, Validators.min(0)]],
    productAvailable: [false],
    shortDescription: [''],
    picturePath: [''],
    note: [''],
    createdBy: ['Admin'], // Default value
    createdOn: [new Date().toISOString()], // Default value with the current date
    modifiedBy: [null],
    modifiedOn: [null],
    isActive: [true],
    TypeID: [''],
    "MeasurementValue":'0',
    MesurmentID: [''],
  });
}
getPoruductByID(){
  this.productService.getProductDetailsById(this.pid).subscribe(res=>{
    console.log(res);
    this.productForm.patchValue(res[0]);
  })
}
  submitForm() {
    this.spinners.show();
    const data=this.productForm.value;
   
    if (this.productForm.valid) {
      this.productService.addProduct(data).subscribe((res: any) => {
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
  this.productService.getMeasurement().subscribe((res: any) => {
    this.measurements=res
    console.log(res)
  
 })
}
goBack(){
  this.router.navigateByUrl('/getProduct')
}
}
