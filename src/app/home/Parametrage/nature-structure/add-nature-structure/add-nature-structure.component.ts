import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-nature-structure',
  templateUrl: './add-nature-structure.component.html',
  styleUrls: ['./add-nature-structure.component.scss']
})
export class AddNatureStructureComponent implements OnInit {

 
  @Input() initialnaturestructure: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() onnaturestructAdded = new EventEmitter<void>();

  naturestructure = {
    id: '',
    id_natureStruct: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialnaturestructure) {
      this.naturestructure = { ...this.initialnaturestructure };
    }
  }

  onSubmit() {
    if (this.initialnaturestructure) {
      // Mode édition
      this.parametrageService.updateNatureStructure(Number(this.naturestructure.id), this.naturestructure).subscribe(
        () => {
          this.onnaturestructAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la naure job :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addNatureStructure(this.naturestructure).subscribe(
        () => {
          this.onnaturestructAdded.emit();
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
