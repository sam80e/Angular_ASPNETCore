import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ISIMCard, IOrder, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'simcards', 
  templateUrl: './simcards.component.html'
})
export class SIMCardsComponent implements OnInit {

  title: string;
  simcards: ISIMCard[] = [];
  filteredSIMCards: ISIMCard[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'SIMCards';
    this.getSIMCardsPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.simcards) {
        let props = ['ccid', 'number', 'activated', 'serviceProvider'];
        this.filteredSIMCards = this.dataFilter.filter(this.simcards, props, filterText);
    }
    else {
      this.filteredSIMCards = this.simcards;
    }
  }

  pageChanged(page: number) {
    this.getSIMCardsPage(page);
  }

  getSIMCardsPage(page: number) {
    this.dataService.getSIMCardsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<ISIMCard[]>) => {
          this.simcards = this.filteredSIMCards = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getSIMCardsPage() retrieved simcards'));
  }

}