import { Component } from '@angular/core';
import { MeasuremetTypeService } from '../measuremet-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mesurment-lookup',
  templateUrl: './mesurment-lookup.component.html',
  styleUrl: './mesurment-lookup.component.css'
})
export class MesurmentLookupComponent {
  displayedColumns: string[] = ['CustomerID', 'TotalAmount', 'OrderDate', 'IsCompleted','actions'];
  dataSource = new MatTableDataSource<any>();
  lookupForm!: FormGroup; // FormGroup for reactive form
  lookups: any[] = []; // Array to hold retrieved lookups
isShow:boolean=false;
  constructor(private fb: FormBuilder, private lookupService: MeasuremetTypeService) {
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
      this.lookupService.createLookup(this.lookupForm.value).subscribe(
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
  }

  // Method to retrieve existing lookups
  retrieveLookups(): void {
    this.lookupService.getmesurmentLookups().subscribe(
      data => {
        this.lookups = data;
        this.dataSource.data=data; // Store the retrieved lookups in the component's array
        console.log('Lookups retrieved successfully', this.lookups);
      },
      error => {
        console.error('Error retrieving lookups', error);
      }
    );
  }
  editProduct(id:number){
    this.isShow=!this.isShow;

  }
  add(){
    this.isShow=!this.isShow;

  }
  deleteProduct(id:number){

  }
}


