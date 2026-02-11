import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-ajout-statut',
  templateUrl: './ajout-statut.component.html',
  styleUrls: ['./ajout-statut.component.scss']
})
export class AjoutStatutComponent implements OnInit {
  @Input() initialStatut: any = null; // Si on reçoit un statut existant
  @Output() close = new EventEmitter<void>();
  @Output() onStatutAdded = new EventEmitter<void>();

  statut = {
    id: '',
    id_statut: '',
    libelle: '',
    module: ''
  };

  constructor(private parametrageservice: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialStatut) {
      this.statut = { ...this.initialStatut };
    }
  }

  onSubmit() {
    if (this.initialStatut) {
      // Mode édition
      this.parametrageservice.updateStatut(Number(this.statut.id), this.statut).subscribe(
        () => {
          this.onStatutAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour :', error)
      );
    } else {
      // Mode ajout
      this.parametrageservice.addStatut(this.statut).subscribe(
        () => {
          this.onStatutAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de l\'ajout :', error)
      );
    }
  }

  onCancel() {
    this.close.emit();
  }
}
