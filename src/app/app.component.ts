import { NamesService } from './../services/names.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Name } from './models/name.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('addNameButton') addNameButton: any;
  title = 'names';

  nameForm: FormGroup;
  name: Name[];
  nameToDisplay: Name[];

  constructor(private fb: FormBuilder, private namesService: NamesService){
    this.nameForm=fb.group({});
    this.name=[];
    this.nameToDisplay=this.name;
  }
  ngOnInit(): void {
    this.nameForm=this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control('')
    });

    this.namesService.getName().subscribe(res =>{
      for(let nmp of res){
        this.name.unshift(nmp);
      }
      this.nameToDisplay= this.name;
    })
  }

  addName(){
    let name: Name={
      firstname: this.FirstName.value,
      lastname: this.LastName.value
    }
    this.namesService.postName(name).subscribe((res)=>{
      this.name.unshift(res);
      this.clearForm();
    })
  }

  removeName(event: any){
    this.name.forEach((val, index)=>{
      if(val.id== parseInt(event)){
        this.namesService.deleteName(event).subscribe((res)=>{
          this.name.splice(index, 1);
        });
      }
    });
  }

  editName(event: any){
    this.name.forEach((val, index)=>{
      if(val.id==event){
        this.setForm(val);
      }
    });
    this.removeName(event);
    this.addNameButton.nativeElement.click();
  }

  setForm(emp: Name){
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.firstname);
  }

  searchName(event: any){
    let filteredName: Name[]=[];
    if(event==''){
      this.nameToDisplay = this.name;
    }else{
      filteredName= this.name.filter((val,index)=>{
        let targetKey = val.firstname.toLowerCase() + '' + val.lastname.toLowerCase();
        let searchKey= event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.nameToDisplay= filteredName;
    }
  }

  clearForm(){
    this.FirstName.setValue('');
    this.LastName.setValue('');
  }

  public get FirstName(): FormControl{
    return this.nameForm.get('firstname') as FormControl;
  }

  public get LastName(): FormControl{
    return this.nameForm.get('lastname') as FormControl;
  }
}
