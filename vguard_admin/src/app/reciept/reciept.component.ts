import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrl: './reciept.component.css'
})
export class RecieptComponent {
  invoiceNumber = 'INV-1001';
  invoiceDate = new Date();
  customerName = 'John Doe';
  customerAddress = '123 Elm Street, Springfield';
  items = [
    { name: 'Product 1', quantity: 2, price: 10.0,amount:10.0 },
    { name: 'Product 2', quantity: 1, price: 15.0 ,amount:10.0},
    { name: 'Product 3', quantity: 3, price: 7.5 ,amount:10.0}
  ];

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  tax = 148;
  // calculateTotal() {
  //   return this.items.reduce((total, item) => total + item.amount, 0);
  // }

  calculateGrandTotal() {
    return this.calculateTotal() + this.tax;
  }
  printInvoice() {
    const printContents = document.getElementById('invoice')!.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Print Invoice</title>');
      printWindow.document.write('<style>/* Add any custom styles for printing here */</style>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(printContents);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  }
}