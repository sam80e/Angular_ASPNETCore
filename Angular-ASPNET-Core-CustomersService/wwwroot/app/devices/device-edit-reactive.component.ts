import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IDevice, IState } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'device-edit-reactive',
  templateUrl: './device-edit-reactive.component.html'
})
export class DeviceEditReactiveComponent implements OnInit {

  deviceForm: FormGroup;
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
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getDevice(id);
    }

    this.getStates();
    this.buildForm();
  }

  getDevice(id: string) {
      this.dataService.getDevice(id)
        .subscribe((device: IDevice) => {
          this.device = device;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.deviceForm = this.formBuilder.group({
          deviceName: [this.device.deviceName, Validators.required],
          tenant: [this.device.tenant, Validators.required],
          dateAdded: [this.device.dateAdded, Validators.required],
          simCardId: [this.device.simCardId, [Validators.required, ValidationService.emailValidator]],
      });
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }
  
  submit({ value, valid }: { value: IDevice, valid: boolean }) {
      
      value.id = this.device.id;
      value.zip = this.device.zip || 0; 
      // var device: IDevice = {
      //   id: this.device.id,
      // };

      if (value.id) {

        this.dataService.updateDevice(value)
          .subscribe((device: IDevice) => {
            if (device) {
              this.router.navigate(['/devices']);
            }
            else {
              this.errorMessage = 'Unable to save device';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertDevice(value)
          .subscribe((device: IDevice) => {
            if (device) {
              this.router.navigate(['/devices']);
            }
            else {
              this.errorMessage = 'Unable to add device';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/devices']);
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