import { Component, OnInit } from '@angular/core';
import { NatureJob } from '../../Models/NatureJob';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-nature-job',
  templateUrl: './nature-job.component.html',
  styleUrls: ['./nature-job.component.scss']
})
export class NatureJobComponent implements OnInit {

  naturejobs: NatureJob[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectednaturejobId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingnaturejob: any = null;
  showDetailModal: boolean = false; // Affichage du modal de détail
  selectednaturejob: NatureJob | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllPriorites();
  }

  // Récupérer toutes les priorités
  getAllPriorites(): void {
    this.parametrageService.getNatureJobs().subscribe(res => {
      this.naturejobs = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: NatureJob): void {
    this.selectednaturejob = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectednaturejob = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectednaturejobId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectednaturejobId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletenaturejob(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteNatureJob(id).subscribe(
      (response) => {
        console.log('priorite supprimé avec succès', response);
        this.showConfirmModal = false; // Ferme le modal
        this.refreshList(); // Actualise la liste des statuts
      },
      (error) => {
        console.error('Erreur lors de la suppression du statut', error);
      }
    );
  }


  
  

  // Ouvrir le modal pour ajouter une nouvelle priorité
  openModal(): void {
    this.editingnaturejob = null; // Mode ajout
    this.showModal = true;
  }
  // Modifier une priorité existante
  editnaturejob(priorite: any): void {
    this.editingnaturejob = priorite; // Mode édition
    this.showModal = true;
  }
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingnaturejob = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllPriorites();
  }
}
