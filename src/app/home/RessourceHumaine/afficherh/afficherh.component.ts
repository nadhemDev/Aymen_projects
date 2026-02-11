import { Component, OnInit } from '@angular/core';
import { RessourceHumaine } from '../../Models/Ressourcehumaine';
import { RessourcehumaineService } from 'src/app/services/ressourcehumaine.service';

@Component({
  selector: 'app-afficherh',
  templateUrl: './afficherh.component.html',
  styleUrls: ['./afficherh.component.scss']
})
export class AfficherhComponent implements OnInit {

  ressourcehumaines: RessourceHumaine[] = [];
  searchText: string = '';
  showModal = false;
  showConfirmModal: boolean = false; // Contrôle l'affichage du modal de confirmation
  selectedRessourceId: number = 0; // ID du statut sélectionné à supprimer, ici 'number' pour l'ID auto-incrémenté
  editingRessource: any = null;
showDetailModal: boolean = false; // Affichage du modal de détail
selectedRessource: RessourceHumaine | null = null; // Statut sélectionné pour les détails
history: any[] = [];
  
  // ADDED: Year for import
  importYear: number = new Date().getFullYear();
// Add these properties
showImportModal: boolean = false;
selectedFile: File | null = null;
  constructor(private ressourceservice: RessourcehumaineService) {}

  ngOnInit() {
    this.getAllRh();
        this.loadHistory(); // ADDED: Load history on init

  }
 // ADD THIS FILTERED GETTER
 get filteredRessourcehumaines(): RessourceHumaine[] {
  if (!this.searchText) {
    return this.ressourcehumaines;
  }
  
  const search = this.searchText.toLowerCase();
  return this.ressourcehumaines.filter(rh => {
    const nom = rh.nom ? rh.nom.toLowerCase() : '';
    const email = rh.email ? rh.email.toLowerCase() : '';
    const contrat = rh.contrat ? rh.contrat.toLowerCase() : '';
    const activite = rh.activite ? rh.activite.toLowerCase() : '';
    const gsm = rh.gsm ? rh.gsm.toLowerCase() : '';
    
    return nom.includes(search) ||
           email.includes(search) ||
           contrat.includes(search) ||
           activite.includes(search) ||
           gsm.includes(search);
  });
}


// Add these methods impot
openImportModal(): void {
  this.showImportModal = true;
  this.selectedFile = null;
    this.importYear = new Date().getFullYear(); // ADDED: Reset year
}

closeImportModal(): void {
  this.showImportModal = false;
  this.selectedFile = null;
}

onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

importFile(): void {
  if (!this.selectedFile) {
    alert('Veuillez sélectionner un fichier');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);
 formData.append('year', this.importYear.toString()); // ADDED: Send year
  this.ressourceservice.importRh(formData).subscribe({
    next: (response) => {
      console.log('Import successful:', response);
      alert('Import réussi!');
      this.closeImportModal();
      this.refreshList();
       this.loadHistory(); // ADDED: Refresh history after import
    },
  error: (error) => {
  console.error('Import error:', error);
  let errorMsg = 'Erreur inconnue';
  if (error.error && error.error.message) {
    errorMsg = error.error.message;
  }
  alert('Erreur lors de l\'import: ' + errorMsg);
}
  });
}
  loadHistory(): void {
  this.ressourceservice.getHistory().subscribe({
    next: (res: any) => {
      console.log('History response:', res); // DEBUG
      this.history = res.data || [];
      console.log('History loaded:', this.history); // DEBUG
    },
    error: (err) => {
      console.error('Error loading history:', err);
      this.history = [];
    }
  });
}
  getAllRh(): void {
    this.ressourceservice.getrh().subscribe(res => {
      this.ressourcehumaines = res.data; // Assure-toi que c’est bien 'data'
    });
  }


  openDetailModal(statut: RessourceHumaine): void {
    this.selectedRessource = statut; // Récupérer les détails du statut sélectionné
    this.showDetailModal = true; // Ouvrir le modal de détail
  }

  closeDetailModal(): void {
    this.showDetailModal = false; // Fermer le modal de détail
    this.selectedRessource = null; // Réinitialiser le statut sélectionné
  }


  confirmDelete(ressourceId: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.selectedRessourceId = ressourceId;
    this.showConfirmModal = true;
  }

  // Fonction pour fermer le modal de confirmation
  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedRessourceId = 0; // Réinitialiser l'ID sélectionné à zéro
  }

  // Fonction pour supprimer le statut
  deleteStatut(id: number) {  // Utiliser 'number' pour l'ID auto-incrémenté
    this.ressourceservice.deleterh(id).subscribe(
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
    this.editingRessource = null; // mode ajout
    this.showModal = true;
  }
  
  editStatut(ressourcehumaine: any): void {
  console.log('Editing resource:', ressourcehumaine);
  console.log('ID:', ressourcehumaine.id);
  
  // Clone the object to avoid reference issues
  this.editingRessource = { ...ressourcehumaine };
  this.showModal = true;
}
  
  closeModal(): void {
    this.showModal = false;
    this.editingRessource = null;
  }
  
  refreshList(): void {
    this.getAllRh();
  }

 
}
