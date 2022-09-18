import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalkthroughPageComponent } from './pages/walkthrough-page/walkthrough-page.component';

const routes: Routes = [
  { path: '', component: WalkthroughPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkthroughRoutingModule { }
