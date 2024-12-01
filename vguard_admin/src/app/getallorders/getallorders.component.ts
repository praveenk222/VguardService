import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-getallorders',
  
  templateUrl: './getallorders.component.html',
  styleUrl: './getallorders.component.css'
})
export class GetallordersComponent {
  displayedColumns: string[] = ['CustomerID', 'TotalAmount', 'OrderDate', 'IsCompleted'];
  dataSource = new MatTableDataSource<any>();
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getorderDetails().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
