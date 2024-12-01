import { Component } from '@angular/core';
import { MeasuremetTypeService } from '../measuremet-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SweetAlertServiceService } from '../services/sweet-alert-service.service';

@Component({
  selector: 'app-measuremet-type',
  templateUrl: './measuremet-type.component.html',
  styleUrl: './measuremet-type.component.css'
})
export class MeasuremetTypeComponent {
  displayedColumns: string[] = ['CustomerID', 'TotalAmount', 'OrderDate', 'IsCompleted','actions'];
  lookupForm!: FormGroup; // FormGroup for reactive form
  lookups: any[] = []; // Array to hold retrieved lookups
  isShow:boolean=false;
  dataSource = new MatTableDataSource<any>();
  constructor(private fb: FormBuilder, private lookupService: MeasuremetTypeService,
    private alerts:SweetAlertServiceService
  ) {
    // Initialize the form
    this.lookupForm = this.fb.group({
      LookupID: [null],
      LookupCode: ['', Validators.required],
      LookupDescription: ['', Validators.required],
      LookupCategory: ['', Validators.required],
      Status: [1],
      IsActive:[true],
      CreatedBy: ['Admin']
    });
  }

  ngOnInit(): void {
    this.retrieveLookups(); // Fetch lookups on component initialization
  }

  // Method to create a new lookup
  createNewLookup(): void {
    if (this.lookupForm.valid) {
      this.newFunction(this.lookupForm.value);
    }
  }
     newFunction(data:any) {
      this.lookupService.createLookup(data).subscribe(
        response => {
          console.log('Lookup created successfully', response);
          this.retrieveLookups(); // Refresh the list after creating a new lookup
          this.lookupForm.reset(); // Reset the form
        },
        error => {
          console.error('Error creating lookup', error);
        }
      );
    }
  
  editProduct(id:number){
    this.isShow=!this.isShow;
  }
  add(){
    this.isShow=!this.isShow;
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
  // Method to retrieve existing lookups
  retrieveLookups(): void {
    this.lookupService.getLookups().subscribe(
      data => {
        // this.lookups = data;
         // Store the retrieved lookups in the component's array
         this.dataSource.data=data;
        console.log('Lookups retrieved successfully', this.lookups);
      },
      error => {
        console.error('Error retrieving lookups', error);
      }
    );
  }
}
