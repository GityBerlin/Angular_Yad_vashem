import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, TimeoutInfo } from 'rxjs';
import { Time } from '../class/time';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  URL = "https://localhost:44349/api/Time/";
  accountTicket: number = 0;
  time: string = '';
  listTimes: any
  constructor(private http: HttpClient) { }

  getList(): Observable<Array<Time>> {
    this.listTimes = this.http.get<Array<Time>>(this.URL+'GetAllJson');
    return this.listTimes;
  }
  getDataByTimeOfDay(index: number) {
    return this.http.get<Array<any>>(this.URL+'GetDataByTimeOfDay?timeOfDay='+index)
  }
  sumTicket() {
    return this.http.get<number>(this.URL+'SumTicket')
  }
  editCountTicket(ticket: number) {
    this.accountTicket = ticket;
    return this.accountTicket;
  }
  updateaVailablePlaces(t: string) {
    this.time = t;
    var TimeClass=new Time(t,this.accountTicket,true)    
    var Update=this.http.post<Time>(`${this.URL}UpdateaVailablePlaces`, TimeClass).subscribe(updatedTime => {
       const index = this.listTimes.findIndex((x:Time) => x.startTime === updatedTime.startTime);
    console.log("Update",updatedTime);

    if (index !== -1) {
      this.listTimes[index].availablePlaces =updatedTime.availablePlaces
    }});
    
   
    
    return  Update;

  }

}



