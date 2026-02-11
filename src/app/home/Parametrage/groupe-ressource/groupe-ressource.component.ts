import { Component, OnInit } from '@angular/core';
import { Grouperessource } from '../../Models/grouperessource';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-groupe-ressource',
  templateUrl: './groupe-ressource.component.html',
  styleUrls: ['./groupe-ressource.component.scss']
})
export class GroupeRessourceComponent implements OnInit {

  grouperessources: Grouperessource[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedgrouperessourceId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editinggrouperessource: any = null;
  
  showDetailModal: boolean = false; // Affichage du modal de détail
  selectedgrouperessource: Grouperessource | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllgrouperessource();
  }

  // Récupérer toutes les priorités
  getAllgrouperessource(): void {
    this.parametrageService.getGroupeRessources().subscribe(res => {
      this.grouperessources = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(naturejob: Grouperessource): void {
    this.selectedgrouperessource = naturejob; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedgrouperessource = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(naturejobId: number): void {
    this.selectedgrouperessourceId = naturejobId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedgrouperessourceId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deletegrouperessource(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteGroupeRessource(id).subscribe(
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
    this.editinggrouperessource = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  editgrouperessource(priorite: any): void {
    this.editinggrouperessource = priorite; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editinggrouperessource = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllgrouperessource();
  }
}

