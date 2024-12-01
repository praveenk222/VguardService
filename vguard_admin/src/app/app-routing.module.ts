import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './getallorders/create-order/create-order.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './product-details/add-product/add-product.component';
import { GetallordersComponent } from './getallorders/getallorders.component';
import { MeasuremetTypeComponent } from './LookUp/measuremet-type.component';
import { MesurmentLookupComponent } from './mesurment-lookup/mesurment-lookup.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RecieptComponent } from './reciept/reciept.component';



const routes: Routes = [
  {path:'getProduct',component:ProductDetailsComponent},
  {path:'addproduct/:id',component:AddProductComponent},
{path:"CreateOrder",component:CreateOrderComponent},
{path:'orderlist',component:GetallordersComponent},
{path:'/',component:LoginComponent},
// {path:'',component:DashbordComponent},
{path:'lookup',component:MeasuremetTypeComponent},
{path:'mlookup',component:MesurmentLookupComponent},
{path:'dashboard',component:DashbordComponent},
{path:'inventory',component:InventoryComponent},
{path:'reciept',component:RecieptComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
