import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 displayedColumns: string[] = [ 'Name', 'Mobileno','pincode','CreatedDate', 'UsersAvailable','actions'];
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 100;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: OrderService,private alerts:SweetAlertServiceService,
    private router:Router) {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.dataSource.data = res.data;
      if(res){

        this.totalItems=res.data.length;
      }
    });
  }
  editUsers(id: any) {
    alert(id)
    // this.router.navigateByUrl(`addUsers/${id}`);

  }


  deleteUsers(data:any){
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
