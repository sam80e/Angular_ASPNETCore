import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { IDevice, IOrder, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'devices', 
  templateUrl: './devices.component.html'
})
export class DevicesComponent implements OnInit {

  title: string;
  devices: IDevice[] = [];
  filteredDevices: IDevice[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Devices';
    this.getDevicesPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.devices) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name', 'orderTotal'];
        this.filteredDevices = this.dataFilter.filter(this.devices, props, filterText);
    }
    else {
      this.filteredDevices = this.devices;
    }
  }

  pageChanged(page: number) {
    this.getDevicesPage(page);
  }

  getDevicesPage(page: number) {
    this.dataService.getDevicesPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IDevice[]>) => {
          this.devices = this.filteredDevices = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getDevicesPage() retrieved devices'));
  }

}