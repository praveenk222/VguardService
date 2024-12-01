import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrl: './reciept.component.css'
})
export class RecieptComponent {
  order = {
    id: '12345',
    customerName: 'John Doe',
    date: new Date().toLocaleDateString(),
    items: [
      { name: 'Product 1', price: 29.99 },
      { name: 'Product 2', price: 49.99 },
    ],
    total: 79.98
  };

  downloadPDF() {
    const data = document.getElementById('receipt');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Adjust based on your layout
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('order-receipt.pdf');
      });
    }
  }
}
