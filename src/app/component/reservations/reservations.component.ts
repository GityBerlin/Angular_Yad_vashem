import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimeService } from 'src/app/Service/time.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  numberOfPlaces: any
  currentDate: Date;
  currentDay: string;
  listTime: any
  accountOfTicket: number = 0
  time: any
  active: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  constructor(private servTime: TimeService) {
    this.currentDate = new Date();
    this.currentDay = this.getDayOfWeek(this.currentDate);
  }
  ngOnInit() {
    this.getSumTicket();
  }
  getSumTicket() {
    this.servTime.sumTicket().subscribe(
      (data) => {
        this.accountOfTicket = data
        console.log('Data received:', data);
      })
  }
  confirmQuantity() {
    this.active = this.numberOfPlaces > 0;
    if (this.active) {
      console.log("Quantity confirmed:", this.numberOfPlaces);
      this.servTime.editCountTicket(this.numberOfPlaces);
      this.listTime = this.servTime.getList();
      this.time = this.valueChange.emit('isMorning');
    } else {
      console.log("Invalid quantity");
    }
  }
  getDayOfWeek(date: Date): string {
    const daysOfWeek = ["ראשון", "שני", "שלישי", "רבעי", "חמישי", "שישי", "שבת"];
    return daysOfWeek[date.getUTCDay()];
  }
  handleNumericInput(event: any): void {
    const inputValue = event.target.value;
    const numericInput = parseFloat(inputValue);

    if (!isNaN(numericInput)) {
      this.numberOfPlaces = numericInput;
      
    } else {
      event.target.value = '';
      this.active = false;
    }
  }
  addPlaces() {
    this.numberOfPlaces = this.numberOfPlaces + 1;
  }
  decreasePlaces() {
    if (this.numberOfPlaces > 0) {
      this.numberOfPlaces -= 1;
      console.log("numberOfPlaces" + this.numberOfPlaces);
    }
  }
  sendValue(selectedValue: string) {
    console.log("selectedValue", selectedValue);
debugger
    this.valueChange.emit(selectedValue);
  }
  handleTabChange(selectedIndex: number) {
    debugger
    let selectedValue: string;
    switch (selectedIndex) {
      case 0:
        selectedValue = 'isMorning';
        break;
      case 1:
        selectedValue = 'isAfternoon';
        break;
      case 2:
        selectedValue = 'isEvening';
        break;
      default:
        selectedValue = 'isMorning';

        this.sendValue(selectedValue);
    }
  }
}
