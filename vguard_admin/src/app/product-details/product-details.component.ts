import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDetailsService } from '../services/product-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  displayedColumns: string[] = ['Name', 'PurchaseDate', 'ExpiryDate', 'SerialNo', 'ProductAvailable', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 100;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: OrderService, private alertsr: SweetAlertServiceService,
    private router: Router, private productService: OrderService) {
    this.getProduct();
  }
  isExpiringSoon(expiryDate: string | Date): boolean {
    const currentDate = new Date();
    const expirationDate = new Date(expiryDate);
    const differenceInDays = (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
    return differenceInDays <= 30;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProduct() {
    this.apiService.getAllProducts().subscribe((res: any) => {
      this.dataSource.data = res;
      if (res) {

        this.totalItems = res.length;
      }
    });
  }
  editProduct(id: any) {
    this.router.navigateByUrl(`addproduct/${id}`);

  }
  sendnotification(data: any) {
    console.log(data)

  }

  updateForm(id:string,data:any) {
    this.productService.updateProduct(data,id).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.alertsr.showSuccess('Product', res.Message);
          this.getProduct();
          // this.spinners.hide();

        }
        else {
          this.alertsr.showFailure('Failed')
        }
      }

    )


  }
  deleteProduct(data: any) {
    console.log(data)
    this.alertsr.showConfirmation('Confirm Action', 'Are you sure you want to proceed?')
      .then((confirmed) => {
        if (confirmed) {
          data.IsActive = false;
          this.updateForm(data._id,data);
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


  applyfilter(e: Event) {
    const filtervalue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }
}