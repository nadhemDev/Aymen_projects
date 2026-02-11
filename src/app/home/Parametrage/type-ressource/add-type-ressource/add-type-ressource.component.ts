import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeRessource } from 'src/app/home/Models/TypeRessource';
import { ParametrageService } from 'src/app/services/parametrage.service'; // Adapte le chemin si nécessaire

@Component({
  selector: 'app-add-type-ressource',
  templateUrl: './add-type-ressource.component.html',
  styleUrls: ['./add-type-ressource.component.scss']
})
export class AddTypeRessourceComponent implements OnInit {

 
  @Input() initialtyperessource: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() ontyperessourceAdded = new EventEmitter<void>();

  typeressource = {
    id: '',
    id_typeressource: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialtyperessource) {
      this.typeressource = { ...this.initialtyperessource };
    }
  }

  onSubmit() {
    if (this.initialtyperessource) {
      // Mode édition
      this.parametrageService.updateTypeRessource(Number(this.typeressource.id), this.typeressource).subscribe(
        () => {
          this.ontyperessourceAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la naure job :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addTypeRessource(this.typeressource).subscribe(
        () => {
          this.ontyperessourceAdded.emit();
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
