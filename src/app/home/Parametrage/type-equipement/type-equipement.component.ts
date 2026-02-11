import { Component, OnInit } from '@angular/core';
import { TypeEquipement } from '../../Models/TypeEquipement';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-type-equipement',
  templateUrl: './type-equipement.component.html',
  styleUrls: ['./type-equipement.component.scss']
})
export class TypeEquipementComponent implements OnInit {

  typeequipements: TypeEquipement[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedTypeEquipementId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingtypeequipement: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectedTypeEquipement: TypeEquipement | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllTypeeqipement();
  }

  // Récupérer toutes les priorités
  getAllTypeeqipement(): void {
    this.parametrageService.getTypeEquipements().subscribe(res => {
      this.typeequipements = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: TypeEquipement): void {
    this.selectedTypeEquipement = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedTypeEquipement = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectedTypeEquipementId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedTypeEquipementId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletetypeequipement(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteTypeEquipement(id).subscribe(
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
    this.editingtypeequipement = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  edittypeequipement(priorite: any): void {
    this.editingtypeequipement = priorite; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingtypeequipement = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllTypeeqipement();
  }
}
