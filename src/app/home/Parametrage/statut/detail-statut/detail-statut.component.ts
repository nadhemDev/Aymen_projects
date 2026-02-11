import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-statut',
  templateUrl: './detail-statut.component.html',
  styleUrls: ['./detail-statut.component.scss']
})
export class DetailStatutComponent implements OnInit {
  @Input() statut: any; // reçoit le statut depuis le parent

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
