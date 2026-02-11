import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-nature-relation',
  templateUrl: './add-nature-relation.component.html',
  styleUrls: ['./add-nature-relation.component.scss']
})
export class AddNatureRelationComponent implements OnInit {

  @Input() initialnaturerelation: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() onnaturerelation = new EventEmitter<void>();

  naturerelation = {
    id: '',
    id_natureRel: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialnaturerelation) {
      this.naturerelation = { ...this.initialnaturerelation };
    }
  }

  onSubmit() {
    if (this.initialnaturerelation) {
      // Mode édition
      this.parametrageService.updateNatureRelation(Number(this.naturerelation.id), this.naturerelation).subscribe(
        () => {
          this.onnaturerelation.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la naure job :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addNatureRelation(this.naturerelation).subscribe(
        () => {
          this.onnaturerelation.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de l\'ajout de la naturejob :', error)
      );
    }
  }

  onCancel() {
    this.close.emit();
  }
}

