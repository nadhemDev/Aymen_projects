import { Component, OnInit } from '@angular/core';
import { ComptableService } from 'src/app/services/comptable.service';
import { ParametrageService } from 'src/app/services/parametrage.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  showDeleteModal: boolean = false;
itemToDelete: any = null;
selectedItems: Set<any> = new Set();
deleteLoading: boolean = false;
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
activeTab: string = 'operations';
  filePreview: any[] = [];
fileHeaders: string[] = [];
uploadError: string = '';
uploadLoading: boolean = false;

  constructor(
    private parametrageservice: ParametrageService,
    private comptableService: ComptableService,
    private notificationService: NotificationService  // <-- ADDED: Inject NotificationService
    
  ) {}

  ngOnInit() {
    this.loadComptables();
    this.ongetstatuts();
  }
  
  // ========== PAGINATION METHODS ==========

  loadComptables() {
    this.comptableService.getcomptable().subscribe({
      next: (res) => {
        this.allComptables = res.data || [];
        this.comptables = this.allComptables;
        this.totalItems = this.comptables.length;
        this.updatePaginatedData();
      },
      error: (err) => {
        this.notificationService.showError(
          'Erreur lors du chargement des données comptables',
          'Chargement échoué'
        );
      }
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
    this.parametrageservice.getStatuts().subscribe({
      next: (res) => {
        this.statuts = res.data || [];
      },
      error: (err) => {
        this.notificationService.showError(
          'Erreur lors du chargement des statuts',
          'Erreur'
        );
      }
    });
  }

  // Open upload modal
  openUploadModal() {
    this.uploadMois = this.selectedMois || '';
    this.uploadAnnee = this.selectedAnnee || null;
    this.uploadDate = this.selectedDate || new Date().toISOString().split('T')[0];
    this.uploadStatut = '1'; // Default statut ID
    
    this.showUploadModal = true;
    
    // Info toast to guide user
    this.notificationService.showInfo(
      'Sélectionnez un fichier Excel ou CSV à importer',
      'Import de fichier'
    );
  }
closeUploadModal() {
  this.showUploadModal = false;
  this.selectedFile = null;
  this.uploadMois = '';
  this.uploadAnnee = null;
  this.uploadDate = '';
  this.uploadStatut = '';
  this.uploadLoading = false;
  this.filePreview = [];
  this.fileHeaders = [];
  this.uploadError = '';
}

  // ========== IMPORT HISTORY METHODS ==========

  openImportHistoryModal(): void {
    this.showImportHistoryModal = true;
    this.loadImportHistory();
  }

  closeImportHistoryModal(): void {
    this.showImportHistoryModal = false;
  }

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
          this.notificationService.showError(
            'Impossible de charger l\'historique des imports',
            'Erreur historique'
          );
          this.historyLoading = false;
        }
      });
  }

  onHistoryPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.historyPagination.total / this.historyPagination.pageSize)) {
      this.loadImportHistory(page);
    }
  }

  onHistoryPageSizeChange(pageSize: number): void {
    this.historyPagination.pageSize = pageSize;
    this.historyPagination.current = 1;
    this.loadImportHistory(1);
  }

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
switchToHistoryTab() {
  this.activeTab = 'historique';
  this.loadImportHistory(1);
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
      this.notificationService.showWarning(
        'Veuillez sélectionner un fichier CSV, Excel ou TXT',
        'Format invalide'
      );
      return;
    }
    
    this.selectedFile = file;
    this.notificationService.showSuccess(
      `Fichier "${file.name}" sélectionné`,
      'Fichier prêt'
    );
    
    // Create file preview for CSV files
    if (extension === 'csv' || extension === 'txt') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        const lines = content.split('\n').filter((line: string) => line.trim() !== '');
        if (lines.length > 0) {
          this.fileHeaders = lines[0].split(',').map((header: string) => header.trim());
          this.filePreview = lines.slice(1, 6).map((line: string) => 
            line.split(',').map((cell: string) => cell.trim())
          );
        }
      };
      reader.readAsText(file);
    }
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
    
    this.notificationService.showWarning(
      `Champs manquants: ${missing.join(', ')}`,
      'Formulaire incomplet'
    );
    return;
  }

  if (!this.selectedFile) {
    this.notificationService.showWarning(
      'Veuillez sélectionner un fichier à importer',
      'Fichier manquant'
    );
    return;
  }

  this.uploadLoading = true;

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
          this.notificationService.showSuccess(
            `${uploadRes.count} lignes importées avec succès !`,
            'Importation réussie'
          );
          this.closeUploadModal();
          this.loadComptables();
        },
        error: (err) => {
          const errorMsg = err.error && err.error.message ? err.error.message : 'Erreur inconnue';
          this.notificationService.showError(
            `Erreur upload: ${errorMsg}`,
            'Échec de l\'import'
          );
          this.uploadLoading = false;
        }
      });
    },
    error: (err) => {
      this.notificationService.showError(
        "Erreur lors de la création de l'opération",
        'Opération échouée'
      );
      this.uploadLoading = false;
    }
  });
}

  consulterOperations() {
    this.comptableService.getoperation().subscribe({
      next: (res) => {
        this.operations = res.data;
        this.showOperationsModal = true;
        this.notificationService.showInfo(
          `${this.operations.length} opérations trouvées`,
          'Consultation'
        );
      },
      error: (err) => {
        this.notificationService.showError(
          'Erreur lors de la consultation des opérations',
          'Erreur'
        );
      }
    });
  }
  
  getStatutLibelle(statutId: number): string {
    const statut = this.statuts.find(s => s.id_statut === statutId);
    return statut ? statut.libelle : '';
  }

  // Placeholders with toasts
  editgrouperessource(comptable: any) { 
    this.notificationService.showInfo(
      'Fonction de modification en cours de développement',
      'Information'
    );
  }
  
  confirmDelete(id: number) { 
    this.notificationService.showWarning(
      'Fonction de suppression en cours de développement',
      'Information'
    );
  }
  
  openDetailModal(comptable: any) { 
    this.notificationService.showInfo(
      'Ouverture des détails...',
      'Détails'
    );
  }
 
}