import { Component, OnInit } from '@angular/core';
import { TypeProjet } from '../../Models/TypeProjet';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-type-projet',
  templateUrl: './type-projet.component.html',
  styleUrls: ['./type-projet.component.scss']
})
export class TypeProjetComponent implements OnInit {

  typeprojets: TypeProjet[] = [];
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedtypeprojeteId: number = 0; // ID de la priorité sélectionnée à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingtypeprojet: any = null;

  showDetailModal: boolean = false; // Affichage du modal de détail
  selectedtypeprojet: TypeProjet | null = null; // Priorité sélectionnée pour les détails
  
  constructor(private parametrageService: ParametrageService) {}

  ngOnInit() {
    this.getAllTypeprojet();
  }

  // Récupérer toutes les priorités
  getAllTypeprojet(): void {
    this.parametrageService.getTypeProjets().subscribe(res => {
      this.typeprojets = res.data; // Assure-toi que c’est bien 'data'
    });
  }

  // Ouvrir le modal pour afficher les détails de la priorité
  openDetailModal(typeprojet: TypeProjet): void {
    this.selectedtypeprojet = typeprojet; // Récupérer les détails de la priorité sélectionnée
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  // Fermer le modal de détail
  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedtypeprojet = null; // Réinitialiser la priorité sélectionnée
  }

  // Confirmer la suppression de la priorité
  confirmDelete(typeprojetId: number): void {
    this.selectedtypeprojeteId = typeprojetId;
    this.showConfirmModal = true;
  }

  // Fermer le modal de confirmation
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedtypeprojeteId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  deleteTypeprojet(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.parametrageService.deleteTypeProjet(id).subscribe(
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
    this.editingtypeprojet = null; // Mode ajout
    this.showModal = true;
  }
  
  // Modifier une priorité existante
  editTypeprojet(typeprojet: any): void {
    this.editingtypeprojet = typeprojet; // Mode édition
    this.showModal = true;
  }
  
  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.editingtypeprojet = null;
  }
  
  // Rafraîchir la liste des priorités
  refreshList(): void {
    this.getAllTypeprojet();
  }
}

