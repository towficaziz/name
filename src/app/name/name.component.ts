import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Name } from '../models/name.model';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  @Input() name:Name;
  @Output() onRemoveName = new EventEmitter<number>();
  @Output() onEditEmployee = new EventEmitter<number>();
  

  constructor() {
    this.name={
      firstname:'',
      lastname:''
    }
   }

  ngOnInit(): void {
    console.log(this.name);
  }

  deleteNameClicked(){
    this.onRemoveName.emit(this.name.id);
  }

  editNameClicked(){
   this.onEditEmployee.emit(this.name.id); 
  }
}
