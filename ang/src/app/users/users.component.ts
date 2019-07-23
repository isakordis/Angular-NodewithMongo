import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../shared/user-service.service';
import { UserClass } from '../shared/user-class.model';
declare var M: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserServiceService]
})
export class UsersComponent implements OnInit {
  users: UserClass[];
  user: UserClass;
  constructor(private userSrv: UserServiceService) {
    this.user = new UserClass();
  }
  // public show: boolean = false;
  // public buttonName: any = 'Show';
  ngOnInit() {

    this.genericRefreshMethods();
  }

  resetForm(form?: NgForm) {
    if (!this.userSrv.selectedUser) {

      this.userSrv.selectedUser = {
        _id: "",
        name: "",
        surname: "",
        age: null,
      }
    }
  }

  // onSubmit(form: NgForm) {
  //   this.userSrv.postUser(this.users).subscribe((res) => {
  //     this.resetForm(form);
  //     M.toast({html:'Kayıt Başarılı',classes:'rounded'});
  //     this.genericRefreshMethods();

  //   });
  // }

  resetFormInput(): void{
    this.user = {
      _id: "",
      name: "",
      surname: "",
      age: null
    }
  }

  formNullCheck(): boolean {
    if (this.user.name == "" || this.user.surname == "" || this.user.age == null) {
      return false
    }
    else {
      return true;
    }
  }

  SaveForm(user: UserClass) {

    if (!this.formNullCheck()) {
      alert("Tüm alanları doldur!");
    }
    else {
      this.userSrv.postNewUser(user).subscribe(res => {
        this.genericRefreshMethods();
        this.refreshUserList();
      });
       this.genericRefreshMethods();
    }
  }
  refreshUserList() {
    this.userSrv.getUserList().subscribe((res) => {
      console.log(res);
      this.users = res as UserClass[];
    });

  }
  // toggle() {
  //   this.show = !this.show;

  //   // CHANGE THE NAME OF THE BUTTON.
  //   if(this.show)  
  //     this.buttonName = "Hide";
  //   else
  //     this.buttonName = "Show";
  // }



  Edit(user: UserClass) {
    this.user = user;
    
  }

  Update(user:UserClass) {
    if (!this.formNullCheck()) {
      alert("Alan boş bırakılamaz!");
    } else {
      this.userSrv.updateUser(user).subscribe((res)=>{
        this.genericRefreshMethods();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
    
  }

  Delete(_id:string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userSrv.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }


  genericRefreshMethods(): void {
    //this.resetForm();
    this.refreshUserList();
    this.resetFormInput();
  }


}
