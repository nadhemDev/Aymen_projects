import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-ajout-priorite',
  templateUrl: './ajout-priorite.component.html',
  styleUrls: ['./ajout-priorite.component.scss']
})
export class AjoutPrioriteComponent implements OnInit {
  @Input() initialPriorite: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() onPrioriteAdded = new EventEmitter<void>();

  priorite = {
    id: '',
    id_prio: '',
    liblle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialPriorite) {
      this.priorite = { ...this.initialPriorite };
    }
  }

  onSubmit() {
    if (this.initialPriorite) {
      // Mode édition
      this.parametrageService.updatePriorite(Number(this.priorite.id), this.priorite).subscribe(
        () => {
          this.onPrioriteAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la priorité :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addPriorite(this.priorite).subscribe(
        () => {
          this.onPrioriteAdded.emit();
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
