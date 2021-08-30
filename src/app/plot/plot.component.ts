import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {

  public graph = {
    data: [{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' }],
    layout: {autosize: true, title: 'A Fancy Plot'}
  }

  constructor() { }

  ngOnInit(): void {
  };
  

}
