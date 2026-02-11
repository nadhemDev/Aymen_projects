import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RessourcehumaineService } from 'src/app/services/ressourcehumaine.service';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-add-rh',
  templateUrl: './add-rh.component.html',
  styleUrls: ['./add-rh.component.scss']
})
export class AddRhComponent implements OnInit {

  @Input() initialRessource: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() ongrouperessourceAdded = new EventEmitter<void>();
  
  resourceForm!: FormGroup;
  grouperessources: any[] = [];
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private ressourcehumaineservice: RessourcehumaineService,
    private parametrageService: ParametrageService,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    console.log('AddRhComponent initialized');
    
    this.initForm();
    this.getAllgrouperessource();
  }
  
  initForm(): void {
    this.resourceForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      gsm: ['', Validators.required],
      matricule: [''],
      contrat: [''],
      activite: [''],
      ressource: [''],
      lieuxTravail: [''],
datedebut: ['', Validators.required],  // Add Validators.required      datefin: [''],
      duree: [''],
      commercial: [''],
      nouvellmission: [''],
      secteuractrivite: [''],
      fermeoptionnel: [''],
      localisation: [''],
      teletravail: [''],
      zoneA: [''],
      zoneB: [''],
      zoneC: [''],
      id_grp: [''],
      commentaire: ['']
    });

    if (this.initialRessource) {
      this.resourceForm.patchValue(this.initialRessource);
    }
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.resourceForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }
  
  getAllgrouperessource(): void {
    this.parametrageService.getGroupeRessources().subscribe({
      next: (res) => {
        console.log('Groupes ressources loaded:', res);
        this.grouperessources = res.data || res;
      },
      error: (error) => {
        console.error('Error loading groupes ressources:', error);
      }
    });
  }
  
  onSubmit() {
    console.log('Submit clicked');
    
    if (this.resourceForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire!';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const formData = this.resourceForm.value;
    
    if (this.initialRessource) {
      console.log('Updating resource with ID:', this.initialRessource.id);
      this.ressourcehumaineservice.updaterh(Number(this.initialRessource.id), formData).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.isSubmitting = false;
          this.successMessage = 'Ressource mise à jour avec succès!';
          setTimeout(() => {
            this.ongrouperessourceAdded.emit();
            this.close.emit();
          }, 1500);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.isSubmitting = false;
          this.showError(error);
        }
      });
    } else {
      console.log('Adding new resource...');
      this.ressourcehumaineservice.addrh(formData).subscribe({
        next: (response) => {
          console.log('Add successful:', response);
          this.isSubmitting = false;
          this.successMessage = 'Ressource ajoutée avec succès!';
          this.resourceForm.reset();
          setTimeout(() => {
            this.ongrouperessourceAdded.emit();
            this.close.emit();
          }, 1500);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout:', error);
          this.isSubmitting = false;
          this.showError(error);
        }
      });
    }
  }
  
  private showError(error: any): void {
    console.log('Error details:', error);
    
    let errorMsg = 'Une erreur est survenue.';
    
    if (error.status === 0) {
      errorMsg = 'Serveur Laravel non accessible. Exécutez: php artisan serve --port=8000';
    } else if (error.status === 404) {
      errorMsg = `Endpoint non trouvé: ${error.url}`;
    } else if (error.status === 422 && error.error && error.error.errors) {
      const errors = error.error.errors;
      errorMsg = 'Erreurs de validation: ' + 
        Object.keys(errors)
          .map(key => `${key}: ${errors[key]}`)
          .join('; ');
    } else if (error.error && error.error.message) {
      errorMsg = error.error.message;
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    this.errorMessage = errorMsg;
  }

  onCancel() {
    this.close.emit();
  }
}