import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(private authService: UserserviceService) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user && user.name ? user.name : 'Utilisateur';
  }
  

  logout() {
    this.authService.logout();
    window.location.href = '/auth/signin'; // ou router.navigate
  }  userName: string = '';
}
