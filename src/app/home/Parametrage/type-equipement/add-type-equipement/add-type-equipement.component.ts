import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-type-equipement',
  templateUrl: './add-type-equipement.component.html',
  styleUrls: ['./add-type-equipement.component.scss']
})
export class AddTypeEquipementComponent implements OnInit {

  @Input() initialTypeEquipement: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() onTypeEquipementAdded = new EventEmitter<void>();

  typeEquipement = {
    id: '',
    id_typeequipement: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialTypeEquipement) {
      this.typeEquipement = { ...this.initialTypeEquipement };
    }
  }

  onSubmit() {
    if (this.initialTypeEquipement) {
      // Mode édition
      this.parametrageService.updateTypeEquipement(Number(this.typeEquipement.id), this.typeEquipement).subscribe(
        () => {
          this.onTypeEquipementAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour du type d\'équipement :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addTypeEquipement(this.typeEquipement).subscribe(
        () => {
          this.onTypeEquipementAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de l\'ajout du type d\'équipement :', error)
      );
    }
  }

  onCancel() {
    this.close.emit();
  }
}
