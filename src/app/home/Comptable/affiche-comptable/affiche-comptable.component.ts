import { Component, OnInit } from '@angular/core';
import { ComptableService } from 'src/app/services/comptable.service';
import { ParametrageService } from 'src/app/services/parametrage.service';

@Component({
  selector: 'app-affiche-comptable',
  templateUrl: './affiche-comptable.component.html',
  styleUrls: ['./affiche-comptable.component.scss']
})
export class AfficheComptableComponent implements OnInit {

  statuts: any[] = [];
  selectedMois: string = '';
  selectedAnnee: number | null = null;
  selectedDate: string = '';
  selectedStatut: string = '';
  
  allComptables: any[] = [];
  comptables: any[] = [];
  operations: any[] = [];
// ========== PAGINATION VARIABLES ==========
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  paginatedComptables: any[] = [];

  showOperationsModal: boolean = false;
  showUploadModal: boolean = false;
  showDetailModal: boolean = false;
  showEditModal: boolean = false;
  isUploading: boolean = false;

  // ========== IMPORT HISTORY VARIABLES ==========
showImportHistoryModal: boolean = false;
importHistory: any[] = [];
historyLoading: boolean = false;
historyPagination: any = {
  current: 1,
  pageSize: 10,
  total: 0,
  info: ''
};

   // Selected comptable for edit/detail
  selectedComptable: any = null;
  
  // Edit form data
  editData: any = {};

  
  // File upload
  selectedFile: File | null = null;
  
  // For upload modal
  uploadMois: string = '';
  uploadAnnee: number | null = null;
  uploadDate: string = '';
  uploadStatut: string = '';

  moisLabels: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
// Expose Math to template
  Math = Math;
  constructor(
    private parametrageservice: ParametrageService,
    private comptableService: ComptableService
  ) {}

  ngOnInit() {
    this.loadComptables();
    this.ongetstatuts();
  }
  

  
  // ========== PAGINATION METHODS ==========

  loadComptables() {
    this.comptableService.getcomptable().subscribe(res => {
      this.allComptables = res.data || [];
      this.comptables = this.allComptables;
      this.totalItems = this.comptables.length;
      this.updatePaginatedData();
    });
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedComptables = this.comptables.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    const totalPages = this.getTotalPages();
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = Number(pageSize);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
  }


  ongetstatuts() {
    this.parametrageservice.getStatuts().subscribe(res => {
      this.statuts = res.data || [];
    });
  }

  // Open upload modal
  openUploadModal() {
    this.uploadMois = this.selectedMois || '';
    this.uploadAnnee = this.selectedAnnee || null;
    this.uploadDate = this.selectedDate || new Date().toISOString().split('T')[0];
    this.uploadStatut = '1';// Default statut ID
    
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
    this.selectedFile = null;
    this.uploadMois = '';
    this.uploadAnnee = null;
    this.uploadDate = '';
    this.uploadStatut = '';
    this.isUploading = false;
  }
    // ========== IMPORT HISTORY METHODS ==========

  // Ouvrir la modal d'historique
  openImportHistoryModal(): void {
    this.showImportHistoryModal = true;
    this.loadImportHistory();
  }

  // Fermer la modal d'historique
  closeImportHistoryModal(): void {
    this.showImportHistoryModal = false;
  }

  // Charger l'historique
  loadImportHistory(page: number = 1): void {
    this.historyLoading = true;
    this.historyPagination.current = page;

    this.comptableService.getImportHistory(page, this.historyPagination.pageSize)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.importHistory = response.data;
            this.historyPagination.total = response.total;
            this.historyPagination.info = response.pagination_info;
          }
          this.historyLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'historique:', error);
          this.historyLoading = false;
        }
      });
  }

  // Changer la page
  onHistoryPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.historyPagination.total / this.historyPagination.pageSize)) {
      this.loadImportHistory(page);
    }
  }

  // Changer la taille de la page
  onHistoryPageSizeChange(pageSize: number): void {
    this.historyPagination.pageSize = pageSize;
    this.historyPagination.current = 1;
    this.loadImportHistory(1);
  }

  // Calculer les statistiques
  getHistoryStats(): any {
    if (this.importHistory.length === 0) {
      return { totalRecords: 0, totalImports: 0, uniqueYears: 0 };
    }

    const totalRecords = this.importHistory.reduce((sum, item) => sum + (item.records || 0), 0);
    const totalImports = this.importHistory.length;
    const uniqueYears = new Set(this.importHistory.map(item => item.annee)).size;

    return {
      totalRecords,
      totalImports,
      uniqueYears
    };
  }


  // File selected
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['csv', 'xlsx', 'xls', 'txt'];
      const fileName = file.name;
      const lastDotIndex = fileName.lastIndexOf('.');
      const extension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex + 1).toLowerCase() : '';
      
      if (!allowedExtensions.includes(extension)) {
        alert('Veuillez sélectionner un fichier CSV, Excel ou TXT');
        return;
      }
      
      this.selectedFile = file;
    }
  }

  uploadFile() {
    // Ensure uploadStatut has a default value
    if (!this.uploadStatut || this.uploadStatut === '') {
      this.uploadStatut = '1';
    }

    // Check required fields
    if (!this.uploadMois || this.uploadMois === '' ||
        !this.uploadAnnee || 
        !this.uploadDate || this.uploadDate === '') {
      
      let missing = [];
      if (!this.uploadMois || this.uploadMois === '') missing.push('Mois');
      if (!this.uploadAnnee) missing.push('Année');
      if (!this.uploadDate || this.uploadDate === '') missing.push('Date');
      
      alert("Champs manquants: " + missing.join(', '));
      return;
    }

    if (!this.selectedFile) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    this.isUploading = true;

    // Parse statut_id properly
    const statutIdNum = parseInt(this.uploadStatut);
    
    // Create operation with type any to allow dynamic property
    const operationData: any = {
      mois: this.uploadMois,
      annee: this.uploadAnnee.toString(),
      dateop: this.uploadDate,
    };
    
    // Only add statut_id if it has a valid value
    if (!isNaN(statutIdNum) && statutIdNum > 0) {
      operationData.statut_id = statutIdNum;
    }

    this.comptableService.addoperation(operationData).subscribe({
      next: (res) => {
        const operationId = res.data.id;

        // Upload file
        this.comptableService.uploadFile(this.selectedFile, operationId).subscribe({
          next: (uploadRes) => {
            alert(uploadRes.count + " lignes importées avec succès !");
            this.closeUploadModal();
            this.loadComptables();
          },
          error: (err) => {
            const errorMsg = err.error && err.error.message ? err.error.message : 'Erreur inconnue';
          alert('Erreur upload: ' + errorMsg);
          this.isUploading = false;
        }
      });
    },
    error: (err) => {
      alert("Erreur lors de la création de l'opération");
      this.isUploading = false;
    }
  });
}


  consulterOperations() {
    this.comptableService.getoperation().subscribe(res => {
      this.operations = res.data;
      this.showOperationsModal = true;
    });
  }
  

  getStatutLibelle(statutId: number): string {
    const statut = this.statuts.find(s => s.id_statut === statutId);
    return statut ? statut.libelle : '';
  }

  // Placeholders
  editgrouperessource(comptable: any) { }
  confirmDelete(id: number) { }
  openDetailModal(comptable: any) { }
}