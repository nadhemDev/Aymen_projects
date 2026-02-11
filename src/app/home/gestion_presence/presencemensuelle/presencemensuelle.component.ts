import { Component, OnInit } from '@angular/core';
import { PresenceService } from 'src/app/services/presence.service';
import { UserPresence } from '../../Models/Presence';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JourFerie } from '../../Models/JourFerie';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presencemensuelle',
  templateUrl: './presencemensuelle.component.html',
  styleUrls: ['./presencemensuelle.component.scss']
})
export class PresencemensuelleComponent implements OnInit {

  presencesData: UserPresence[] = [];
  joursDuMois: number[] = [];
  mois: string = '08';
  annee: string = '2025';
  moisSelectionne: string = '';
  jourFerieForm!: FormGroup;
  showModal = false;
  joursFeries: JourFerie[] = [];
  showListeFerieModal = false; // pour contrôler le popup de la liste
  selectedJourFerie: any = null; // Contient le jour à modifier, ou null en mode ajout
  joursTravailles: number = 0;
  searchTerm: string = '';
  presencesDataOriginal: UserPresence[] = []; // copie pour restaurer les données
  constructor(
    private presenceService: PresenceService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const today = new Date();
    this.moisSelectionne = today.toISOString().slice(0, 7);
    [this.annee, this.mois] = this.moisSelectionne.split('-');
  
    this.loadPresences();
    this.chargerJoursFeries();  
  
    this.jourFerieForm = this.fb.group({
      nom: ['', Validators.required],
      date_ferie: ['', Validators.required],
      annee: ['', Validators.required],
      description: ['']
    });
  }
  
  chargerJoursFeries(): void {
    this.presenceService.getJourFerie().subscribe({
      next: (res) => {
        this.joursFeries = res.data;  // Charge tous les jours fériés
      },
      error: (err) => {
        console.error('Erreur lors du chargement des jours fériés :', err);
      }
    });
  }
  

  loadPresences() {
    this.presenceService.getPresencesParMois(this.mois, this.annee).subscribe(res => {
      this.presencesDataOriginal = res.data; // on garde l'original
      this.presencesData = [...this.presencesDataOriginal];
  
      const daysInMonth = new Date(+this.annee, +this.mois, 0).getDate();
      this.joursDuMois = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
      this.presencesData.forEach(user => {
        this.presenceService.getJoursTravailles(user.id, Number(this.mois), Number(this.annee))
          .subscribe((response: any) => {
            user.joursTravailles = response.jours_travailles;
          }, () => {
            user.joursTravailles = 0;
          });
  
        this.presenceService.getJoursOuvres(user.id, Number(this.mois), Number(this.annee))
          .subscribe((response: any) => {
            user.joursOuvres = response.jours_ouvres; // mise à jour champ correct
          }, () => {
            user.joursOuvres = 0;
          });
      });
    });
  }
  
  // 🔹 Filtrage selon le nom
  filtrerPresences() {
    if (!this.searchTerm) {
      this.presencesData = [...this.presencesDataOriginal];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.presencesData = this.presencesDataOriginal.filter(user =>
        user.nom.toLowerCase().includes(term)
      );
    }
  }
  
  
  
  changerMois(direction: number): void {
    if (this.moisSelectionne) {
      const [annee, mois] = this.moisSelectionne.split('-').map(Number);
      const date = new Date(annee, mois - 1 + direction);
      const nouveauMois = date.toISOString().slice(0, 7);

      this.moisSelectionne = nouveauMois;
      this.mois = nouveauMois.split('-')[1];
      this.annee = nouveauMois.split('-')[0];

      this.loadPresences();
    }
  }

  onMoisSelectionneChange(): void {
    this.mois = this.moisSelectionne.split('-')[1];
    this.annee = this.moisSelectionne.split('-')[0];
    this.loadPresences();
  }

  getColor(status: string): string {
    switch (status) {
      case 'Hiver_Continue': return '#d4edda';
      case 'MIS': return '#28a745';
      case 'CA': return '#c3e6cb';
      case 'FDLR': return '#f8d7da';
      case 'Absent': return '#f5c6cb';
      case '1': return '#a9d08e';
      case '0.5': return '#ffe599';
      case '': return '#ffffff';
      default: return '#e2e3e5';
    }
  }

  getNomJour(jour: number): string {
    const date = new Date(+this.annee, +this.mois - 1, jour);
    const joursSemaine = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    return joursSemaine[date.getDay()];
  }
  isWeekend(jour: number): boolean {
    const date = new Date(+this.annee, +this.mois - 1, jour);
    const day = date.getDay(); // 0 = Dimanche, 6 = Samedi
    return day === 0 || day === 6;
  }
  
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedJourFerie = null;
    this.jourFerieForm.reset();
  }
  
  soumettreJourFerie(): void {
    if (this.jourFerieForm.invalid) return;
  
    const formData: JourFerie = this.jourFerieForm.value;
  
    if (this.selectedJourFerie) {
      // ✅ Mode modification
      this.presenceService.updatejourferie(this.selectedJourFerie.id, formData).subscribe({
        next: () => {
          this.closeModal();
          this.consulterJoursFeries(); // Recharge la liste
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Jour férié modifié avec succès !',
            confirmButtonColor: '#28a745',
          });
        },
        error: (err) => {
          console.error('Erreur lors de la modification :', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de la modification du jour férié.',
            confirmButtonColor: '#dc3545',
          });
        }
      });
  
    } else {
      // ✅ Mode ajout
      this.presenceService.addJourFerie(formData).subscribe({
        next: () => {
          this.closeModal();
          this.consulterJoursFeries(); // Recharge la liste
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Jour férié ajouté avec succès !',
            confirmButtonColor: '#28a745',
          });
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout :', err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Échec de l\'ajout du jour férié.',
            confirmButtonColor: '#dc3545',
          });
        }
      });
    }
  }
  
  
  consulterJoursFeries(): void {
    this.presenceService.getJourFerie().subscribe({
      next: (res) => {
        // Supprime le filtre pour afficher tous les jours fériés
        this.joursFeries = res.data;
        this.showListeFerieModal = true; // Ouvre la modal à la fin du chargement
      },
      error: (err) => {
        console.error('Erreur lors du chargement des jours fériés :', err);
      }
    });
  }
  
  
  modifierJourFerie(jour: any) {
    this.selectedJourFerie = jour;
    this.jourFerieForm.patchValue({
      nom: jour.nom,
      date_ferie: jour.date_ferie,
      annee: jour.annee,
      description: jour.description
    });
    this.showModal = true;
  }
  estJourFerie(jour: number): boolean {
    const dateCourante = new Date(+this.annee, +this.mois - 1, jour);
  
    return this.joursFeries.some(jf => {
      const jfDate = new Date(jf.date_ferie);
  
      return (
        jfDate.getFullYear() === dateCourante.getFullYear() &&
        jfDate.getMonth() === dateCourante.getMonth() &&
        jfDate.getDate() === dateCourante.getDate()
      );
    });
  }
  
  
}
