import { Component, OnInit } from '@angular/core';
import { NatureStructure } from '../../Models/NatureStructure';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-nature-structure',
  templateUrl: './nature-structure.component.html',
  styleUrls: ['./nature-structure.component.scss']
})
export class NatureStructureComponent implements OnInit {
  naturestructs: NatureStructure[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectednaturestructId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingnaturestruct: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectednaturestruct: NatureStructure | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllnaturestruct();
  }

  // Récupérer toutes les priorités
  getAllnaturestruct(): void {
    this.parametrageService.getNatureStructures().subscribe(res => {
      this.naturestructs = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: NatureStructure): void {
    this.selectednaturestruct = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectednaturestruct = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectednaturestructId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectednaturestructId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletenaturestruct(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteNatureStructure(id).subscribe(
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
    this.editingnaturestruct = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  editnaturestruct(priorite: any): void {
    this.editingnaturestruct = priorite; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingnaturestruct = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllnaturestruct();
  }
}

