import { ModuleWithProviders } from '@angular/core';

export interface ICustomer {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state?: IState;
    stateId?: number;
    zip: number;
    gender: string;
    orderCount?: number;
    orders?: IOrder[];
    orderTotal?: number;
}

export interface IState {
    abbreviation: string;
    name: string;
}

export interface IOrder {
    product: string;
    price: number;
    quantity: number;
    orderTotal?: number;
}

export interface IDevice {
    id?: string;
    deviceName: string;
    tenant?: number;
    dateAdded: Date;
    simCardId: number;
}

export interface ISIMCard {
    id?: string;
    ccid: string;
    number?: number;
    activated: boolean;
    serviceProvider: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    status: boolean;
    customer: ICustomer;
}

export interface IDeviceResponse {
    status: boolean;
    device: IDevice;
}
export interface ISIMCardResponse {
    status: boolean;
    simcard: ISIMCard;
}