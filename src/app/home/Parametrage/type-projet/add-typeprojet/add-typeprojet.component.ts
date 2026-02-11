import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-typeprojet',
  templateUrl: './add-typeprojet.component.html',
  styleUrls: ['./add-typeprojet.component.scss']
})
export class AddTypeprojetComponent implements OnInit {

  @Input() initialtypeprojet: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() ontypeprojetAdded = new EventEmitter<void>();

  typeprojet = {
    id: '',
    libelle: '',
    description: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialtypeprojet) {
      this.typeprojet = { ...this.initialtypeprojet };
    }
  }

  onSubmit() {
    if (this.initialtypeprojet) {
      // Mode édition
      this.parametrageService.updateTypeProjet(Number(this.typeprojet.id), this.typeprojet).subscribe(
        () => {
          this.ontypeprojetAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la typeprojet :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addTypeProjet(this.typeprojet).subscribe(
        () => {
          this.ontypeprojetAdded.emit();
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
