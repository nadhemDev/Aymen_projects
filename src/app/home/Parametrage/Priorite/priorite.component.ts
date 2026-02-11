import { Component, OnInit } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { Priorite } from '../../Models/Priorite';  // Assurez-vous que le modèle Priorite est bien défini
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailPrioriteComponent } from './detail-priorite/detail-priorite.component'; // adapte le chemin

@Component({
  selector: 'app-priorite',
  templateUrl: './priorite.component.html',
  styleUrls: ['./priorite.component.scss']
})
export class PrioriteComponent implements OnInit {

  
  priorites: Priorite[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedPrioriteId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingPriorite: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectedPriorite: Priorite | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getAllPriorites();
  }

  // Récupérer toutes les priorités
  getAllPriorites(): void {
    this.parametrageService.getPriorites().subscribe(res => {
      this.priorites = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(priorite: Priorite): void {
    this.selectedPriorite = priorite; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedPriorite = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(prioriteId: number): void {
    this.selectedPrioriteId = prioriteId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedPrioriteId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletePriorite(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deletePriorite(id).subscribe(
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
    this.editingPriorite = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  editPriorite(priorite: any): void {
    this.editingPriorite = priorite; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingPriorite = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllPriorites();
  }
}
