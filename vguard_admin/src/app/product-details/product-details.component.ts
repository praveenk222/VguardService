import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDetailsService } from '../services/product-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  displayedColumns: string[] = ['ProductID', 'Name','Type', 'Measurement','UnitPrice', 'OldPrice', 'Discount', 'UnitInStock', 'ProductAvailable', 'ShortDescription','actions'];
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 100;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductDetailsService,private alerts:SweetAlertServiceService,
    private router:Router) {
    this.getProduct();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProduct() {
    this.productService.getProductDetails().subscribe((res: any) => {
      this.dataSource.data = res;
      if(res){

        this.totalItems=res.length;
      }
    });
  }
  editProduct(id: any) {
    this.router.navigateByUrl(`addproduct/${id}`);
  //  this.productService.updateProduct(product.ProductID,product).subscribe((res) => {
  //   console.log(res)
  //  });
  //   console.log('Edit Product:', product);
    // this.dialog.open(EditProductDialog, { data: product });
  }

  // Delete product
  // deleteProduct(product: any) {
  //   if (confirm('Are you sure you want to delete this product?')) {
  //     this.productService.deleteProduct(product).subscribe((res) => {
  //       console.log(res)
  //     });
  //   }
  newFunction(product: any) {
      this.productService.deleteProduct(product).subscribe((res) => {
        console.log(res)
        this.getProduct();
      });
  }

  deleteProduct(data:any){
    this.alerts.showConfirmation('Confirm Action', 'Are you sure you want to proceed?')
    .then((confirmed) => {
      if (confirmed) {
        data.IsActive=false;
        this.newFunction(data);
        console.log('User confirmed the action');
        // Perform the action
      } else {
        console.log('User canceled the action');
        // Handle cancellation
      }
    })
    .catch((error) => {
      console.error('Something went wrong:', error);
    });
  
  }


  applyfilter(e:Event){
    const filtervalue=(e.target as HTMLInputElement).value;
    this.dataSource.filter=filtervalue.trim().toLowerCase();
  }
}