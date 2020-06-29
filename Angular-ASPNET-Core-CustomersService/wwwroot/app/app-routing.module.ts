import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';

import { DevicesComponent } from './devices/devices.component';
import { DevicesGridComponent } from './devices/devices-grid.component';
import { DeviceEditComponent } from './devices/device-edit.component';
import { DeviceEditReactiveComponent } from './devices/device-edit-reactive.component';

import { SIMCardsComponent } from './simcards/simcards.component';
import { SIMCardsGridComponent } from './simcards/simcards-grid.component';
import { SIMCardEditComponent } from './simcards/simcard-edit.component';
import { SIMCardEditReactiveComponent } from './simcards/simcard-edit-reactive.component';

//NOTES: may need to watch https://app.pluralsight.com/course-player?clipId=72c5e46c-36c3-4f97-8d75-4cf2f347b155 again
const routes: Routes = [
    { path: 'customers', component: CustomersComponent},
    { path: 'customers/:id', component: CustomerEditComponent},
    //{ path: 'customers/:id', component: CustomerEditReactiveComponent },

    { path: 'devices', component: DevicesComponent },
    { path: 'devices/:id', component: DeviceEditComponent },

    { path: 'simcards', component: SIMCardsComponent },
    { path: 'simcards/:id', component: SIMCardEditComponent },

    { path: '**', pathMatch:'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [   CustomersComponent, CustomersGridComponent, CustomerEditComponent, CustomerEditReactiveComponent,
        DevicesComponent, DevicesGridComponent, DeviceEditComponent, DeviceEditReactiveComponent,
        SIMCardsComponent, SIMCardsGridComponent, SIMCardEditComponent, SIMCardEditReactiveComponent,
];
}