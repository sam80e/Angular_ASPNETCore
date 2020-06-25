import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../core/data.service';
import { IDevice, IState } from '../shared/interfaces';

@Component({
  selector: 'device-edit',
  templateUrl: './device-edit.component.html'
})
export class DeviceEditComponent implements OnInit {

device: IDevice = {
    id: 0,
    deviceName: '',
    tenant: 0,
    dateAdded: new Date,
    simCardId: 0
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
      this.getDevice(id);
    }

    this.getStates();
  }

  getDevice(id: string) {
      this.dataService.getDevice(id)
        .subscribe((device: IDevice) => {
          this.device = device;
        },
        (err: any) => console.log(err));
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit() {

      if (this.device.id) {

        this.dataService.updateDevice(this.device)
          .subscribe((device: IDevice) => {
            if (device) {
              this.router.navigate(['/devices']);
            } else {
              this.errorMessage = 'Unable to save device';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertDevice(this.device)
          .subscribe((device: IDevice) => {
            if (device) {
              this.router.navigate(['/devices']);
            }
            else {
              this.errorMessage = 'Unable to add device';
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
    this.dataService.deleteDevice(this.device.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/devices']);
          }
          else {
            this.errorMessage = 'Unable to delete device';
          }
        },
        (err) => console.log(err));
  }

}