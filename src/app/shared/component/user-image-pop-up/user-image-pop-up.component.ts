import { Component, Inject, Input, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@app/service/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NavService } from 'src/app/data/nav/service/nav.service';

@Component({
  selector: 'app-user-image-pop-up',
  templateUrl: './user-image-pop-up.component.html',
  styleUrls: ['./user-image-pop-up.component.scss']
})
export class UserImagePopUpComponent implements OnInit {

  imageExist: boolean;
  currentProfileImage: any;

  formModel: FormGroup;

  constructor(
    private _mdr: MatDialogRef<UserImagePopUpComponent>,
    private _navService: NavService,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.formModel = this._formBuilder.group({
      profileImage: null
    });
      this.currentProfileImage = this.data.profileImage;
  }

  public get formModelControls() { return this.formModel.controls; }

  public  closeDialog() {
    this._mdr.close(false)
  }

  public change(file: File){
    var reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.currentProfileImage = reader.result;
    }
  }

  public  setImage(file: File) {
   const formData = new FormData();
          const fileExt = file.name.split('.').pop();
          const myNewFile = new File([file], this._authService.currentUsernameValue + "." + fileExt , {type: file.type});
          formData.append('image', myNewFile, myNewFile.name);
          this._navService.addUserImage(formData).subscribe(()=>{
            this.formModelControls.profileImage.reset();
            this._mdr.close({profileImageChanged: this.currentProfileImage})
          })
      
  }

}


