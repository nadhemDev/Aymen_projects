import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-nature-job',
  templateUrl: './add-nature-job.component.html',
  styleUrls: ['./add-nature-job.component.scss']
})
export class AddNatureJobComponent implements OnInit {

  @Input() initialnaturejob: any = null; // Pour édition
  @Output() close = new EventEmitter<void>();
  @Output() onnaturejobAdded = new EventEmitter<void>();

  naturejob = {
    id: '',
    id_natureJob: '',
    libelle: ''
  };

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    if (this.initialnaturejob) {
      this.naturejob = { ...this.initialnaturejob };
    }
  }

  onSubmit() {
    if (this.initialnaturejob) {
      // Mode édition
      this.parametrageService.updateNatureJob(Number(this.naturejob.id), this.naturejob).subscribe(
        () => {
          this.onnaturejobAdded.emit();
          this.close.emit();
        },
        error => console.error('Erreur lors de la mise à jour de la naure job :', error)
      );
    } else {
      // Mode ajout
      this.parametrageService.addNatureJob(this.naturejob).subscribe(
        () => {
          this.onnaturejobAdded.emit();
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
