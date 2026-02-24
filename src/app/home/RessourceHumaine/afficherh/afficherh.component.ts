import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RessourceHumaine } from '../../Models/Ressourcehumaine';
import { RessourcehumaineService } from 'src/app/services/ressourcehumaine.service';
import { NotificationService } from 'src/app/services/notification.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-afficherh',
  templateUrl: './afficherh.component.html',
  styleUrls: ['./afficherh.component.scss'],
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AfficherhComponent implements OnInit {

  ressourcehumaines: RessourceHumaine[] = [];
  filteredRessources: RessourceHumaine[] = [];
  paginatedResources: RessourceHumaine[] = [];
  
  searchText: string = '';
  
  // Modals
  showModal = false;
  showEditModal = false;
  showConfirmModal: boolean = false;
  showDetailModal: boolean = false;
  showImportModal: boolean = false;
  
  // Selected items
  selectedRessourceId: number = 0;
  selectedRessource: RessourceHumaine | null = null;
  
  // Form data
  editingRessource: any = null;
  newResource: any = {};
 @ViewChild('editForm', { static: false }) editForm: NgForm;
@ViewChild('addForm', { static: false }) addForm: NgForm;
  
  // History variables
  history: any[] = [];
  paginatedHistory: any[] = [];
  historyLoading: boolean = false;
  
  // Import variables
  importYear: number = new Date().getFullYear();
  selectedFile: File | null = null;
  filePreview: any[] = [];
  fileHeaders: string[] = [];
  uploadLoading: boolean = false;
  
  // ========== PAGINATION RESOURCES ==========
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  // ========== PAGINATION HISTORY ==========
  historyCurrentPage: number = 1;
  historyItemsPerPage: number = 10;
  historyTotalItems: number = 0;
  
  // Selection
  selectedItems: Set<number> = new Set();
  
  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Tabs
  activeTab: string = 'resources';
  
  // Math for template
  Math = Math;

  constructor(
    private ressourceservice: RessourcehumaineService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}
 openEmail(email: string): void {
  if (!email) return;
  
  // Open Gmail compose in new tab
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  window.open(url, '_blank');
}

  ngOnInit() {
    this.getAllRh();
  }

  // ========== FILTER ==========
  
  filterResources() {
    if (!this.searchText) {
      this.filteredRessources = this.ressourcehumaines;
    } else {
      const search = this.searchText.toLowerCase();
      this.filteredRessources = this.ressourcehumaines.filter(rh => {
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
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  get filteredRessourcehumaines(): RessourceHumaine[] {
    return this.filteredRessources;
  }

  // ========== PAGINATION RESOURCES ==========

  getAllRh(): void {
    this.ressourceservice.getrh().subscribe({
      next: (res) => {
        this.ressourcehumaines = res.data || [];
        this.filterResources(); // This calls updatePaginatedData()
      },
      error: (err) => {
        this.notificationService.showError(
          'Erreur lors du chargement des ressources humaines',
          'Chargement échoué'
        );
      }
    });
  }

  updatePaginatedData() {
    this.totalItems = this.filteredRessources.length;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResources = this.filteredRessources.slice(startIndex, endIndex);
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

  // ========== PAGINATION HISTORY ==========

  updateHistoryPaginatedData() {
    this.historyTotalItems = this.history.length;
    const startIndex = (this.historyCurrentPage - 1) * this.historyItemsPerPage;
    const endIndex = startIndex + this.historyItemsPerPage;
    this.paginatedHistory = this.history.slice(startIndex, endIndex);
  }

  onHistoryPageChange(page: number) {
    const totalPages = this.getHistoryTotalPages();
    if (page >= 1 && page <= totalPages) {
      this.historyCurrentPage = page;
      this.updateHistoryPaginatedData();
    }
  }

  onHistoryPageSizeChange(pageSize: number) {
    this.historyItemsPerPage = Number(pageSize);
    this.historyCurrentPage = 1;
    this.updateHistoryPaginatedData();
  }

  getHistoryTotalPages(): number {
    return Math.ceil(this.historyTotalItems / this.historyItemsPerPage) || 1;
  }

  // ========== SELECTION ==========

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.filteredRessources.forEach(r => this.selectedItems.add(r.id));
    } else {
      this.selectedItems.clear();
    }
  }

  toggleSelection(id: number) {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedItems.has(id);
  }

  // ========== SORTING ==========

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredRessources.sort((a: any, b: any) => {
      const aVal = (a[column] || '').toString().toLowerCase();
      const bVal = (b[column] || '').toString().toLowerCase();
      return this.sortDirection === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
    
    this.updatePaginatedData();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return 'icon-arrow-up';
    return this.sortDirection === 'asc' ? 'icon-arrow-up' : 'icon-arrow-down';
  }

  // ========== STATS ==========

  getResourceStats() {
    return [
      {
        value: this.ressourcehumaines.length,
        label: 'Total Ressources',
        icon: 'icon-users',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      },
      {
        value: this.ressourcehumaines.filter(r => r.contrat === 'CDI').length,
        label: 'CDI',
        icon: 'icon-briefcase',
        color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
      },
      {
        value: this.ressourcehumaines.filter(r => r.contrat === 'CDD').length,
        label: 'CDD',
        icon: 'icon-file-text',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
      },
      {
        value: new Set(this.ressourcehumaines.map(r => r.activite)).size,
        label: 'Activités',
        icon: 'icon-activity',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
      }
    ];
  }

  // ========== HELPERS ==========

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#11998e', '#38ef7d', '#fa709a', '#fee140'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  // ========== TABS ==========

  switchToHistoryTab() {
    this.activeTab = 'history';
    this.loadHistory();
  }

  // ========== CRUD OPERATIONS ==========

  // ADD
  openModal(): void {
    this.newResource = {
      contrat: 'CDI',
      date_debut: new Date().toISOString().split('T')[0]
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newResource = {};
  }

 saveNewResource(): void {
  if (!this.addForm || this.addForm.invalid) {
    this.notificationService.showWarning(
      'Veuillez remplir tous les champs obligatoires',
      'Formulaire invalide'
    );
    return;
  }

 const payload = {
  ...this.newResource,
  datedebut: this.newResource.date_debut
    ? new Date(this.newResource.date_debut).toISOString().split('T')[0]
    : null
};

delete payload.date_debut;

  this.ressourceservice.addrh(payload).subscribe({
    next: () => {
      this.notificationService.showSuccess(
        'Ressource humaine ajoutée avec succès',
        'Ajout réussi'
      );

      this.addForm.resetForm();
      this.closeModal();
      this.refreshList();
    },
    error: () => {
      this.notificationService.showError(
        'Erreur lors de l\'ajout',
        'Échec'
      );
    }
  });
}


  // EDIT
  openEditModal(resource: RessourceHumaine): void {
    this.editingRessource = { ...resource };
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingRessource = null;
  }

  saveEdit(): void {
  if (!this.editForm || this.editForm.invalid || !this.editingRessource) {
    this.notificationService.showWarning(
      'Formulaire invalide',
      'Veuillez corriger les erreurs'
    );
    return;
  }

  const payload = {
  ...this.editingRessource,
  datedebut: this.editingRessource.date_debut
    ? new Date(this.editingRessource.date_debut).toISOString().split('T')[0]
    : null
};

delete payload.date_debut;


  this.ressourceservice.updaterh(payload.id, payload).subscribe({
    next: () => {
      this.notificationService.showSuccess(
        'Ressource humaine modifiée avec succès',
        'Modification réussie'
      );

      this.editForm.resetForm();
      this.closeEditModal();
      this.refreshList();
    },
    error: () => {
      this.notificationService.showError(
        'Erreur lors de la modification',
        'Échec'
      );
    }
  });
}


  // DELETE
  confirmDelete(ressourceId: number) {
    this.selectedRessourceId = ressourceId;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedRessourceId = 0;
  }

  deleteStatut(id: number) {
    this.ressourceservice.deleterh(id).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(
          'Ressource humaine supprimée avec succès',
          'Suppression réussie'
        );
        this.showConfirmModal = false;
        this.refreshList();
      },
      error: (error) => {
        this.notificationService.showError(
          'Erreur lors de la suppression',
          'Suppression échouée'
        );
      }
    });
  }

  // DETAIL
  openDetailModal(statut: RessourceHumaine): void {
    this.selectedRessource = statut;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedRessource = null;
  }

  // ========== IMPORT ==========

  openImportModal(): void {
    this.showImportModal = true;
    this.selectedFile = null;
    this.filePreview = [];
    this.fileHeaders = [];
    this.importYear = new Date().getFullYear();
    
    this.notificationService.showInfo(
      'Sélectionnez un fichier Excel ou CSV à importer',
      'Import de fichier'
    );
  }

  closeImportModal(): void {
    this.showImportModal = false;
    this.selectedFile = null;
    this.filePreview = [];
    this.fileHeaders = [];
    this.uploadLoading = false;
  }

  onFileSelected(event: any): void {
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

  importFile(): void {
    if (!this.selectedFile) {
      this.notificationService.showWarning(
        'Veuillez sélectionner un fichier à importer',
        'Fichier manquant'
      );
      return;
    }

    this.uploadLoading = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('year', this.importYear.toString());

    this.ressourceservice.importRh(formData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(
          'Import réussi!',
          'Importation terminée'
        );
        this.closeImportModal();
        this.refreshList();
        if (this.activeTab === 'history') {
          this.loadHistory();
        }
        this.uploadLoading = false;
      },
      error: (error) => {
        let errorMsg = 'Erreur inconnue';
        if (error.error && error.error.message) {
          errorMsg = error.error.message;
        }
        this.notificationService.showError(
          `Erreur lors de l'import: ${errorMsg}`,
          'Import échoué'
        );
        this.uploadLoading = false;
      }
    });
  }

  // ========== HISTORY ==========

  loadHistory(): void {
    this.historyLoading = true;
    this.ressourceservice.getHistory().subscribe({
      next: (res: any) => {
        this.history = res.data || [];
        this.historyCurrentPage = 1;
        this.updateHistoryPaginatedData();
        this.historyLoading = false;
      },
      error: (err) => {
        this.notificationService.showError(
          'Impossible de charger l\'historique des imports',
          'Erreur historique'
        );
        this.history = [];
        this.historyLoading = false;
      }
    });
  }

  getHistoryStats(): any {
  if (this.history.length === 0) {
    return { totalRecords: 0, totalImports: 0, uniqueYears: 0 };
  }

  // Try record_count first (based on your HTML), then records, then 0
  const totalRecords = this.history.reduce((sum, item) => {
    const count = item.record_count || item.records || 0;
    return sum + Number(count);
  }, 0);
  
  const totalImports = this.history.length;
  
  // Try year first, then annee
  const uniqueYears = new Set(this.history.map(item => {
    return item.year || item.annee || new Date().getFullYear();
  })).size;

  return {
    totalRecords,
    totalImports,
    uniqueYears
  };
}

  // ========== REFRESH ==========

  refreshList(): void {
    this.getAllRh();
    this.selectedItems.clear();
  }
}