import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges {
  listFilter: string;

  hitMessage: string;
  @Input() displayDetails: boolean = false
  @Input() hitCount: number;
  @ViewChild('filterElement') filterElementRef: ElementRef


  // private _hitCount:number;

  // get hitCount():number{
  //   return this._hitCount;
  // }


  // @Input()
  // set hitCount(value: number){
  //   this._hitCount= value
  //   if(this.hitCount <= 0){
  //     this.hitMessage = 'No matches found !'
  //   }else{
  //     this.hitMessage = 'Hits' + this.hitCount;
  //   }
  // }

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found !'
    } else {
      this.hitMessage = 'Hits' + this.hitCount;
    }
  }

  ngOnInit() {
  }

}
