import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-groupe-ressource',
  templateUrl: './add-groupe-ressource.component.html',
  styleUrls: ['./add-groupe-ressource.component.scss']
})
export class AddGroupeRessourceComponent implements OnInit {

  @Input() initialgrouperessource: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() ongrouperessourceAdded = new EventEmitter<void>();

  grouperessource = {
    id: '',
    id_grp: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}
  ngOnInit(): void {
    if (this.initialgrouperessource) {
      this.grouperessource = { ...this.initialgrouperessource };
    }
  }
  

  onSubmit() {
    if (this.initialgrouperessource) {
      // Mode édition
      this.parametrageService.updateGroupeRessource(Number(this.grouperessource.id), this.grouperessource).subscribe(
        () => {
          this.ongrouperessourceAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la naure job :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addGroupeRessource(this.grouperessource).subscribe(
        () => {
          this.ongrouperessourceAdded.emit();
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
