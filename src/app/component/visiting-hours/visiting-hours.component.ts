import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from 'src/app/Service/time.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-visiting-hours',
  templateUrl: './visiting-hours.component.html',
  styleUrls: ['./visiting-hours.component.css'],

})
export class VisitingHoursComponent implements OnInit {
  listTime: any;
  receivedValue: string = '';
  accountTicket: number = 0
  constructor(private servTime: TimeService, private router: Router) {
  }

  ngOnInit() {
    this.getData();
     
    this.accountTicket = this.servTime.accountTicket;
  }
  getData() {
    this.servTime.getList().subscribe(
      (data) => {
        console.log("😀,",this.listTime);
        
        this.listTime = data
      },
      (error) => {
        console.error('Error fetching data:', error);
      });
  }
  handleValueChange(value: string) {
    this.receivedValue = value;
    debugger
    console.log(" this.receivedValue", this.receivedValue);
    // this.GetDataByTimeOfDay(this.receivedValue)
  }

  isTimeOfDay(time: string, timeOfDay: string): boolean {
    const hour = parseInt(time.split(':')[0]);
    switch (timeOfDay) {
      case 'morning':
        return hour < 12;
      case 'afternoon':
        return hour >= 12 && hour < 15;
      case 'evening':
        return hour >= 15;
      default:
        return false;
    }
  }
   j:any
  navigateOrderTicket(time: string) {
   this.servTime.updateaVailablePlaces(time).subscribe(
    (data) => {
      console.log("😀,",this.listTime);
      
      this.j = data
   console.log("############",this.j);
    })
   
    this.router.navigateByUrl(`/order-confirmation/${time}`);
  }

}
