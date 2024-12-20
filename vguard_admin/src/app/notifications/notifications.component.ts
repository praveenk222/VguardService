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
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
displayedColumns: string[] = [ 'UserName','Message', 'CreateOn', 'ProductAvailable', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 100;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: OrderService,private alerts:SweetAlertServiceService,
    private router:Router) {
    this.getProduct();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProduct() {
    this.apiService.getAllnotification().subscribe((res: any) => {
      this.dataSource.data = res;
      if(res){

        this.totalItems=res.length;
      }
    });
  }
  editProduct(id: any) {
    this.router.navigateByUrl(`addproduct/${id}`);

  }


  deleteProduct(data:any){
    this.alerts.showConfirmation('Confirm Action', 'Are you sure you want to proceed?')
    .then((confirmed) => {
      if (confirmed) {
        data.IsActive=false;
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