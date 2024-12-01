import { Component } from '@angular/core';
import { OrderService } from '../../order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
  orderForm!: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      CustomerID: ['', Validators.required],
      PaymentID: ['', Validators.required],
      ShippingID: ['', Validators.required],
      Discount: [0],
      Taxes: [0],
      TotalAmount: ['', Validators.required],
      IsCompleted: [false],
      OrderDate: [new Date().toISOString(), Validators.required],
      Dispatched: [false],
      DispatchedDate: [''],
      Shipped: [false],
      ShippingDate: [''],
      Deliver: [false],
      DeliveryDate: [''],
      Notes: [''],
      CancelOrder: [false]
    });
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      this.orderService.createOrder(this.orderForm.value).subscribe(
        (response) => {
          console.log('Order created successfully:', response);
          this.orderForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error creating order:', error);
        }
      );
    }
  }
}
