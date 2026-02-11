import { Component, OnInit } from '@angular/core';
import { NatureRelation } from '../../Models/NatureRelation';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-nature-relation',
  templateUrl: './nature-relation.component.html',
  styleUrls: ['./nature-relation.component.scss']
})
export class NatureRelationComponent implements OnInit {

  
  naturerelations: NatureRelation[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectednaturerelationId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingnaturerelation: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectednaturerelation: NatureRelation | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllNaturerelation();
  }

  // Récupérer toutes les priorités
  getAllNaturerelation(): void {
    this.parametrageService.getNatureRelations().subscribe(res => {
      this.naturerelations = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: NatureRelation): void {
    this.selectednaturerelation = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectednaturerelation = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectednaturerelationId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectednaturerelationId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletenaturerelation(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteNatureRelation(id).subscribe(
      (response) => {
        console.log('nature relation supprimé avec succès', response);
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
    this.editingnaturerelation = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  editnaturerelation(priorite: any): void {
    this.editingnaturerelation = priorite; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingnaturerelation = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllNaturerelation();
  }
}
