import { Component, OnInit } from '@angular/core';
import { TypeRessource } from '../../Models/TypeRessource';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-type-ressource',
  templateUrl: './type-ressource.component.html',
  styleUrls: ['./type-ressource.component.scss']
})
export class TypeRessourceComponent implements OnInit {

  typeressources: TypeRessource[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedTypeRessourceId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingTypeRessource: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectedTypeRessource: TypeRessource | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllPriorites();
  }

  // Récupérer toutes les priorités
  getAllPriorites(): void {
    this.parametrageService.getTypeRessources().subscribe(res => {
      this.typeressources = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: TypeRessource): void {
    this.selectedTypeRessource = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedTypeRessource = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectedTypeRessourceId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedTypeRessourceId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deleteTypeRessource(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteTypeRessource(id).subscribe(
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
    this.editingTypeRessource = null; // Mode ajout
    this.showModal = true;
  }
  // Modifier une priorité existante
  editTypeRessource(priorite: any): void {
    this.editingTypeRessource = priorite; // Mode édition
    this.showModal = true;
  }
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingTypeRessource = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllPriorites();
  }
}
