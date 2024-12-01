import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDetailsService } from '../services/product-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';
interface InventoryItem {
  title: string;
  stock: number;
  price: number;
}

interface TabData {
  itemName: string;
  quantity: number;
  location: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  displayedColumns: string[] = ['ProductID', 'Name','Type', 'Measurement','UnitPrice', 'OldPrice', 'Discount', 'UnitInStock', 'ProductAvailable', 'ShortDescription','actions'];
  dataSourceS = new MatTableDataSource<any>([]);
  dataSourceP = new MatTableDataSource<any>([]);
  dataSourceE = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [5, 10, 20];
  totalItems: number = 100;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  plumb: any;
  santry: any;
  Elec: any;
  inventoryCount:any;
  constructor(private productService: ProductDetailsService,private alerts:SweetAlertServiceService,
    private router:Router) {
      this.getProduct();
  }
  inventoryItems: InventoryItem[] = [
    { title: 'Item 1', stock: 10, price: 100 },
   
  ];

  selectedTabValue(event:any){

  }
  getProduct() {
    this.productService.getProductDetails().subscribe((res: any) => {
    
      if(res){
this.plumb=res.filter((x:any)=>x.CategoryID == 1);
this.santry=res.filter((x:any)=>x.CategoryID == 2);
this.Elec=res.filter((x:any)=>x.CategoryID == 3);
        this.totalItems=res.length;
        this.getInventory()
      }
    });
  }
  getInventory() {
    this.productService.getInventryCount().subscribe((res: any) => {
    
      if(res){

        this.inventoryCount=res;
      }
    });
  }
}
