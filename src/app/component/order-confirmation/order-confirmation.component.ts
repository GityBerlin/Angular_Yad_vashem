import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from 'src/app/Service/time.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  constructor(private route: ActivatedRoute , private servTime:TimeService) { }
  accountTicket:number=this.servTime.accountTicket;
  timeOfDay:string=this.servTime.time;

}



