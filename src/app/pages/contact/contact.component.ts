import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  map = {
    lat: 51.678418,
    lng: 7.809007,
  };
  constructor() { }

  ngOnInit() {
  }

}
