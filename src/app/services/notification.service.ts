import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  // Modern Success toast - Green with check icon
  showSuccess(message: string, title: string = 'Succès') {
    this.toastr.success(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true,
      toastClass: 'ngx-toastr modern-toast modern-success',
      titleClass: 'modern-toast-title',
      messageClass: 'modern-toast-message',
      closeButton: true,
      tapToDismiss: true
    });
  }

  // Modern Error toast - Red with X icon
  showError(message: string, title: string = 'Erreur') {
    this.toastr.error(message, title, {
      timeOut: 8000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true,
      toastClass: 'ngx-toastr modern-toast modern-error',
      titleClass: 'modern-toast-title',
      messageClass: 'modern-toast-message',
      closeButton: true,
      tapToDismiss: true
    });
  }

  // Modern Warning toast - Orange/amber with warning icon
  showWarning(message: string, title: string = 'Attention') {
    this.toastr.warning(message, title, {
      timeOut: 6000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true,
      toastClass: 'ngx-toastr modern-toast modern-warning',
      titleClass: 'modern-toast-title',
      messageClass: 'modern-toast-message',
      closeButton: true,
      tapToDismiss: true
    });
  }

  // Modern Info toast - Blue with info icon
  showInfo(message: string, title: string = 'Information') {
    this.toastr.info(message, title, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      enableHtml: true,
      toastClass: 'ngx-toastr modern-toast modern-info',
      titleClass: 'modern-toast-title',
      messageClass: 'modern-toast-message',
      closeButton: true,
      tapToDismiss: true
    });
  }
}