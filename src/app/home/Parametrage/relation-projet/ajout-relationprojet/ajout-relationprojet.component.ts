import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-ajout-relationprojet',
  templateUrl: './ajout-relationprojet.component.html',
  styleUrls: ['./ajout-relationprojet.component.scss']
})
export class AjoutRelationprojetComponent implements OnInit {

  @Input() initialrelation: any = null; // Si on reçoit un statut existant
  @Output() close = new EventEmitter<void>();
  @Output() onRelationAdded = new EventEmitter<void>();

  relationprojet = {
    id:'',
    id_RelProjet: '',  // Initialiser avec des valeurs vides
    libelle: '',        // Initialiser avec des valeurs vides
  };

  constructor(private parametrageservice: ParametrageService) {}

  
  ngOnInit(): void {
    if (this.initialrelation) {
      this.relationprojet = { ...this.initialrelation };
    }
  }

  onSubmit() {
    if (this.initialrelation) {
      // Mode édition
      this.parametrageservice.updateRelationProjet(Number(this.relationprojet.id), this.relationprojet).subscribe(
        () => {
          this.onRelationAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la priorité :', error)
      );
    } else {
      // Mode ajout
      this.parametrageservice.addRelationProjet(this.relationprojet).subscribe(
        () => {
          this.onRelationAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de l\'ajout de la priorité :', error)
      );
    }
  }


  onCancel() {
    this.close.emit();
  }
}
