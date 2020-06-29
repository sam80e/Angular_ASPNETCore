import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { ISIMCard, IState } from '../shared/interfaces';

@Component({
  selector: 'simcard-edit',
  templateUrl: './simcard-edit.component.html'
})
export class SIMCardEditComponent implements OnInit {

simcard: ISIMCard = {
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
              private dataService: DataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getSIMCard(id);
    }

    this.getStates();
  }

  getSIMCard(id: string) {
      this.dataService.getSIMCard(id)
        .subscribe((simcard: ISIMCard) => {
          this.simcard = simcard;
        },
        (err: any) => console.log(err));
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit() {

      if (this.simcard.id) {

        this.dataService.updateSIMCard(this.simcard)
          .subscribe((simcard: ISIMCard) => {
              if (simcard) {
              this.router.navigate(['/simcards']);
            } else {
              this.errorMessage = 'Unable to save simcard';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertSIMCard(this.simcard)
          .subscribe((simcard: ISIMCard) => {
            if (simcard) {
              this.router.navigate(['/simcards']);
            }
            else {
              this.errorMessage = 'Unable to add simcard';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  delete(event: Event) {
      event.preventDefault();
      this.dataService.deleteSIMCard(this.simcard.id.toString())
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
