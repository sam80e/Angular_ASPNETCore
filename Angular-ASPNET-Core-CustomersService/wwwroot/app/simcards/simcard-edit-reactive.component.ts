import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { ISIMCard, IState } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'simcard-edit-reactive',
  templateUrl: './simcard-edit-reactive.component.html'
})
export class SIMCardEditReactiveComponent implements OnInit {

  simcardForm: FormGroup;
  simcard: ISIMCard = {
    id: '',
      ccid: '',
      number: 0,
      activated: false,
      serviceProvider: 0
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getSIMCard(id);
    }

    this.getStates();
    this.buildForm();
  }

  getSIMCard(id: string) {
      this.dataService.getSIMCard(id)
        .subscribe((simcard: ISIMCard) => {
          this.simcard = simcard;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.simcardForm = this.formBuilder.group({
          ccid: [this.simcard.ccid, Validators.required],
          tenant: [this.simcard.number, Validators.required],
          dateAdded: [this.simcard.activated, Validators.required],
          simcardId: [this.simcard.serviceProvider, [Validators.required]],
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit({ value, valid }: { value: ISIMCard, valid: boolean }) {
      
      value.id = this.simcard.id;
      //value.zip = this.simcard.zip || 0; 
      // var simcard: ISIMCard = {
      //   id: this.simcard.id,
      // };

      if (value.id) {

        this.dataService.updateSIMCard(value)
          .subscribe((simcard: ISIMCard) => {
            if (simcard) {
              this.router.navigate(['/simcards']);
            }
            else {
              this.errorMessage = 'Unable to save simcard';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertSIMCard(value)
          .subscribe((simcard: ISIMCard) => {
            if (simcard) {
              this.router.navigate(['/simcards']);
            }
            else {
              this.errorMessage = 'Unable to add simcard';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/simcards']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteSIMCard(this.simcard.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/simcards']);
          }
          else {
            this.errorMessage = 'Unable to delete simcard';
          }
        },
        (err) => console.log(err));
  }

}