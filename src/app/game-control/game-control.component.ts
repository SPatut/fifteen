import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements  OnInit {

  constructor() { }
  counter: number;
  gameStatus = '';
  boneWin = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0] ;
  bone = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0] ;
  boneStatus = [false, false , false, false, false, false , false, false, false, false , false, false, false, false , false, false];
  indexZero: number;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onStart() {
    this.shuffleBone();
    this.counter = 0;
    this.gameStatus = 'Playing';
    this.setBoneStatus();
  }

  // tslint:disable-next-line:typedef
  onStop() {
    this.gameStatus = '';
    for (let i = 0; i < this.boneStatus.length; i++) {this.boneStatus[i] = false; }
  }

  // tslint:disable-next-line:typedef
  setBoneStatus() {
    for (let i = 0; i < this.boneStatus.length; i++) {this.boneStatus[i] = false; }
    for (let i = 0; i < this.boneStatus.length; i++) {
      if (this.bone[i] === 0)  {
        this.boneStatus[i] = false;
        this.indexZero = i;
        if ((i + 1 ) <= this.boneStatus.length) { this.boneStatus[ i + 1 ] = true; }
        if ((i - 1 ) >= 0 ) { this.boneStatus[ i - 1 ] = true; }
        if ((i + 4 ) <= this.boneStatus.length) { this.boneStatus[ i + 4 ] = true; }
        if ((i - 4 ) >= 0) { this.boneStatus[ i - 4 ] = true; }
        if (i === 4) { this.boneStatus[3] = false; }
        if (i === 8) { this.boneStatus[7] = false; }
        if (i === 12) { this.boneStatus[11] = false; }
        if (i === 3) { this.boneStatus[4] = false; }
        if (i === 7) { this.boneStatus[8] = false; }
        if (i === 11) { this.boneStatus[12] = false; }
      }
    }
  }

  // tslint:disable-next-line:typedef
  onBoneClick(indexBone: number ) {
    this.counter ++;
    this.bone[this.indexZero] = this.bone[indexBone];
    this.bone[indexBone] = 0;
    this.setBoneStatus();
    if (this.boneWinCompare()) {
      this.gameStatus = 'You win!';
      for (let i = 0; i < this.boneStatus.length; i++) {this.boneStatus[i] = false; }
    }
  }
  // tslint:disable-next-line:typedef
  shuffleBone() {
    this.setBoneStatus();
    for (let k = 1000 ; k > 0; k--) {
      this.makeStep();
    }
  }
  boneWinCompare(): boolean  {
        if (JSON.stringify(this.boneWin) !== JSON.stringify(this.bone)) {
          return false; }
        else { return  true; }
  }
  // tslint:disable-next-line:typedef
   makeStep() {
    for (let i = 0; i < this.bone.length; i++) {
       if (this.boneStatus[i] === true) {
         for (let j = 0; j < this.bone.length; j++) {
           if (this.bone[j] === 0) {
             const k = Math.floor(Math.random() * 2);
             if (k === 0) {
               [this.bone[i], this.bone[j]] = [this.bone[j], this.bone[i]];
               i = this.bone.length;
               this.setBoneStatus();
             }
             break;
           }
         }
       }
    }
  }
}
