import { FormBuilder,FormGroup } from '@angular/forms';
import { DepartmentModel } from './ajout-department.modal';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-ajout-department',
  templateUrl: './ajout-department.component.html',
  styleUrls: ['./ajout-department.component.css']
})
export class AjoutDepartmentComponent implements OnInit {
  DepartmentModalObj: DepartmentModel=new DepartmentModel();
  currentMaxId: number = 0; // Initialisation du compteur pour l'ID
  departmentData !:any;
  form !:FormGroup;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      departmentName : ['']
    })
    this.getAllDepartments();
  }

  postDepartmentDetails(){
    this.DepartmentModalObj.departmentName=this.form.value.departmentName;
    // Générer un ID unique pour le nouvel employé en incrémentant un compteur
    this.DepartmentModalObj.id=++this.currentMaxId;
    // Incrémenter le compteur à chaque ajout
    this.api.postDepartments(this.DepartmentModalObj).subscribe(res=>{
      console.log(res);
      alert("department added successfully")
      this.form.reset();
      this.getAllDepartments();
    },err=>{
      alert("something went wrong");
    })
  }

  getAllDepartments(){
    this.api.getALLDepartments().subscribe(res=>{this.departmentData=res;

      // Find the maximum ID from the retrieved data
    if (this.departmentData && this.departmentData.length > 0) {
      const maxId = Math.max(...this.departmentData.map((emp: any) => emp.id));
      this.currentMaxId = maxId;
    }
    });
  }

}
