import { Component, OnInit } from '@angular/core';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { RelationProjet } from '../../Models/RelationProjet';

@Component({
  selector: 'app-relation-projet',
  templateUrl: './relation-projet.component.html',
  styleUrls: ['./relation-projet.component.scss']
})
export class RelationProjetComponent implements OnInit {
  relations: RelationProjet[] = [];
  showModal = false;
  showConfirmModal: boolean = false;
  selectedRelProjetId: number = 0;
  editingRelation: RelationProjet | null = null;

  showDetailModal: boolean = false;
  selectedRelation: RelationProjet | null = null;

  constructor(private parametrageService: ParametrageService) {}

  ngOnInit(): void {
    this.getAllRelations();
  }

  getAllRelations(): void {
    this.parametrageService.getRelationProjets().subscribe(res => {
      console.log('Relations reçues :', res.data);  // ← check ça
      this.relations = res.data.map((r: any) => ({
        ...r,
        id: r.id // ← doit être l'ID numérique du backend
      }));
    });
  }
  
  

  openModal(): void {
    this.editingRelation = null;
    this.showModal = true;
  }

  editRelation(relation: RelationProjet): void {
    this.editingRelation = relation;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingRelation = null;
  }

  confirmDelete(relProjetId: number): void {
    this.selectedRelProjetId = relProjetId;
    this.showConfirmModal = true;
  }
  // Confirmer la suppression de la priorité
 
  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.selectedRelProjetId = 0;
  }

  deleteRelation(id: number) {
    this.parametrageService.deleteRelationProjet(id).subscribe(
      (response) => {
        console.log('relation projet supprimée avec succès', response);
        this.showConfirmModal = false;
        this.refreshList();
      },
      (error) => {
        console.error('Erreur lors de la suppression du statut', error);
      }
    );
  }
  

  openDetailModal(relation: RelationProjet): void {
    this.selectedRelation = relation;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedRelation = null;
  }

  refreshList(): void {
    this.getAllRelations();
  }
}
