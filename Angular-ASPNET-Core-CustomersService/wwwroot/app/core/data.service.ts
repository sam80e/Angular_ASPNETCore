import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IState, IPagedResults, ICustomer, IOrder, ICustomerResponse, IDevice, IDeviceResponse, ISIMCard, ISIMCardResponse } from '../shared/interfaces';
/* 
    ##### PLEASE NOTE ######

    1. This code has been updated to use the HttpClient service that's part of Angular 4.3+
       Http and HttpModule have been deprecated
    2. RxJS has been updated to the latest version which uses pipe() rather than operator chaining
    3. The original file shown in the Pluralsight course is also available if you want it: data.service.ts.http
    
    #####
*/
@Injectable()
export class DataService {
  
    baseUrl: string = '/api/customers'
    baseStatesUrl: string = '/api/states'
    baseDevicesUrl: string = '/api/devices'
    baseSIMCardsUrl: string = '/api/simcards'

    constructor(private http: HttpClient) { 

    }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseUrl)
                   .pipe(
                        map((customers: ICustomer[]) => {
                            this.calculateCustomersOrderTotal(customers);
                            return customers;
                        }),
                        catchError(this.handleError)
                   );
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(`${this.baseUrl}/page/${page}/${pageSize}`, {observe: 'response'})
                    .pipe(
                        map((res) => {
                        //Need to observe response in order to get to this header (see {observe: 'response'} above)
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let customers = res.body as ICustomer[];
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                        }),
                        catchError(this.handleError)
                    );
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get<ICustomer>(this.baseUrl + '/' + id)
                   .pipe(catchError(this.handleError));
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post<ICustomerResponse>(this.baseUrl, customer)
                   .pipe(
                        map((data) => {
                            console.log('insertCustomer status: ' + data.status);
                            return data.customer;
                        }),
                        catchError(this.handleError)
                    );
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put<ICustomerResponse>(this.baseUrl + '/' + customer.id, customer) 
                   .pipe(
                        map((data) => {
                            console.log('updateCustomer status: ' + data.status);
                            return data.customer;
                        }),
                        catchError(this.handleError)
                    );
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + id)
                   .pipe(catchError(this.handleError));
    }
   
    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.baseStatesUrl)
                   .pipe(catchError(this.handleError));
    }

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
    }
    
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'ASP.NET Core server error');
    }

    getDevices(): Observable<IDevice[]> {
        return this.http.get<IDevice[]>(this.baseDevicesUrl)
            .pipe(
                map((devices: IDevice[]) => {
                    return devices;
                }),
                catchError(this.handleError)
            );
    }

    getDevicesPage(page: number, pageSize: number): Observable<IPagedResults<IDevice[]>> {
        return this.http.get<IDevice[]>(`${this.baseDevicesUrl}/page/${page}/${pageSize}`, { observe: 'response' })
            .pipe(
                map((res) => {
                    //Need to observe response in order to get to this header (see {observe: 'response'} above)
                    const totalRecords = +res.headers.get('x-inlinecount');
                    let devices = res.body as IDevice[];
                    return {
                        results: devices,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getDevice(id: string): Observable<IDevice> {
        return this.http.get<IDevice>(this.baseDevicesUrl + '/' + id)
            .pipe(catchError(this.handleError));
    }

    insertDevice(device: IDevice): Observable<IDevice> {
        console.log('insert', device);
        return this.http.post<IDeviceResponse>(this.baseDevicesUrl, device)
            .pipe(
                map((data) => {

                    console.log('insertDevice status: ' + data.status);
                    return data.device;
                }),
                catchError(this.handleError)
            );
    }

    updateDevice(device: IDevice): Observable<IDevice> {
        return this.http.put<IDeviceResponse>(this.baseDevicesUrl + '/' + device.id, device)
            .pipe(
                map((data) => {
                    console.log('updateDevice status: ' + data.status);
                    return data.device;
                }),
                catchError(this.handleError)
            );
    }

    deleteDevice(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseDevicesUrl + '/' + id)
            .pipe(catchError(this.handleError));
    }



    //#region SIMCards
    getSIMCards(): Observable<ISIMCard[]> {
        return this.http.get<ISIMCard[]>(this.baseSIMCardsUrl)
            .pipe(
                map((simcards: ISIMCard[]) => {
                    return simcards;
                }),
                catchError(this.handleError)
            );
    }

    getSIMCardsPage(page: number, pageSize: number): Observable<IPagedResults<ISIMCard[]>> {
        return this.http.get<ISIMCard[]>(`${this.baseSIMCardsUrl}/page/${page}/${pageSize}`, { observe: 'response' })
            .pipe(
                map((res) => {
                    //Need to observe response in order to get to this header (see {observe: 'response'} above)
                    const totalRecords = +res.headers.get('x-inlinecount');
                    let simcards = res.body as ISIMCard[];
                    return {
                        results: simcards,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getSIMCard(id: string): Observable<ISIMCard> {
        return this.http.get<ISIMCard>(this.baseSIMCardsUrl + '/' + id)
            .pipe(catchError(this.handleError));
    }

    insertSIMCard(simcard: ISIMCard): Observable<ISIMCard> {
        console.log('insert', simcard);
        return this.http.post<ISIMCardResponse>(this.baseSIMCardsUrl, simcard)
            .pipe(
                map((data) => {

                    console.log('insertSIMCard status: ' + data.status);
                    return data.simcard;
                }),
                catchError(this.handleError)
            );
    }

    updateSIMCard(simcard: ISIMCard): Observable<ISIMCard> {
        return this.http.put<ISIMCardResponse>(this.baseSIMCardsUrl + '/' + simcard.id, simcard)
            .pipe(
                map((data) => {
                    console.log('updateSIMCard status: ' + data.status);
                    return data.simcard;
                }),
                catchError(this.handleError)
            );
    }

    deleteSIMCard(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseSIMCardsUrl + '/' + id)
            .pipe(catchError(this.handleError));
    }
}
