import { Component, OnInit } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { Statut } from '../../Models/Statuts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailStatutComponent } from './detail-statut/detail-statut.component'; // adapte le chemin

@Component({
  selector: 'app-statut',
  templateUrl: './statut.component.html',
  styleUrls: ['./statut.component.scss']
})
export class StatutComponent implements OnInit {
  statuts: Statut[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedStatutId: number = 0; // ID du statut sélectionné à supprimer, ici 'number' pour l'ID auto-incrémenté
editingStatut: any = null;



showDetailModal: boolean = false; // Affichage du modal de détail
selectedStatut: Statut | null = null; // Statut sélectionné pour les détails
  constructor(private parametrageService: ParametrageService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getAllStatuts();
  }

  getAllStatuts(): void {
    this.parametrageService.getStatuts().subscribe(res => {
      this.statuts = res.data; // Assure-toi que c’est bien 'data'
    });
  }


  openDetailModal(statut: Statut): void {
    this.selectedStatut = statut; // Récupérer les détails du statut sélectionné
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedStatut = null; // Réinitialiser le statut sélectionné
  }


  confirmDelete(statutId: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.selectedStatutId = statutId;
    this.showConfirmModal = true;
  }

  // Fonction pour fermer le modal de confirmation
  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedStatutId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  // Fonction pour supprimer le statut
  deleteStatut(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteStatut(id).subscribe(
      (response) => {
        console.log('Statut supprimé avec succès', response);
        this.showConfirmModal = false; // Ferme le modal
        this.refreshList(); // Actualise la liste des statuts
      },
      (error) => {
        console.error('Erreur lors de la suppression du statut', error);
      }
    );
  }


  openModal(): void {
    this.editingStatut = null; // mode ajout
    this.showModal = true;
  }
  
  editStatut(statut: any): void {
    this.editingStatut = statut; // mode édition
    this.showModal = true;
  }
  
  closeModal(): void {
    this.showModal = false;
    this.editingStatut = null;
  }
  
  refreshList(): void {
    this.getAllStatuts();
  }

 
}
