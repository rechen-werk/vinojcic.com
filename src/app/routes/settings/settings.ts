import {Component, ElementRef, ViewChild} from '@angular/core';
import {SubmitButton} from "../../components/submit-button/submit-button";
import {FormsModule} from "@angular/forms";
import {User} from "../../../model/User";
import {UserService} from "../../../services/auth-service/user.service";
import {NotificationService} from "../../components/notifications/NotificationService";
import {translate, TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'settings',
  imports: [
    SubmitButton,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  user!: User;
  password = {
    currentPassword: '',
    confirmPassword: '',
    newPassword: ''
  };

  @ViewChild('profileImageInput')
  private profileImageInput?: ElementRef<HTMLInputElement>;
  profileImageFile?: File;
  profileImagePreview?: string;
  private profileImageUpdated = false;

  constructor(
    private userService: UserService,
    private notification: NotificationService,
    private translate: TranslateService
  ) {
    userService.user$.subscribe(user => user && (this.user = { ...user}))
    userService.image$.subscribe(image => image && (this.profileImagePreview = image))
  }

  triggerProfileImagePicker(): void {
    this.profileImageInput?.nativeElement.click();
  }

  onProfileImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file)
      return;

    this.profileImageFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImagePreview =
        reader.result as string;
    };
    reader.readAsDataURL(file);
    this.profileImageUpdated = true;
  }

  saveProfileAction = async () => {
    await this.userService.updateUserSettings(this.user, this.profileImageUpdated, this.profileImageFile);
  };

  changePasswordAction = async () => {
    if (this.password.newPassword !== this.password.confirmPassword) {
      this.notification.info(this.translate.instant('settings.passwords-no-match'));
      return;
    }
    await this.userService.updatePassword(this.password.currentPassword, this.password.newPassword)
  };
}
