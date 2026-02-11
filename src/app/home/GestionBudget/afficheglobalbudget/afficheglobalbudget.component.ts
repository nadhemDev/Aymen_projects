import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { ProjetService } from 'src/app/services/projet.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';
import { Pivot } from '../../Models/Pivot';

@Component({
  selector: 'app-afficheglobalbudget',
  templateUrl: './afficheglobalbudget.component.html',
  styleUrls: ['./afficheglobalbudget.component.scss']
})
export class AfficheglobalbudgetComponent implements OnInit {
  isModalOpen: boolean = false;
 // Listes dynamiques
 collaborateurs: any[] = [];
 activities: any[] = [];
 projects: any[] = [];
 posts: any[] = [];
 grids: any[] = [];
 addedCollaborators: any[] = []; // <-- uniquement ceux ajoutés via le modal

 filteredCollaborators: any[] = [];
 filteredPVSubOptions: any[] = [];


 activityTypes: string[] = ['Développement', 'Test', 'Support']; // Ex. à adapter depuis le backend si nécessaire
  performances: any[] = [];
  totalProd: number = 0;
  totalCost: number = 0;
  totalMP: number = 0;
  selectedWeek: any;
  // Formulaire modal
  selectedPost: string = '';
  selectedPV: string = '';
  selectedActivityType: string = '';
  selectedActivity: string = '';
  selectedCollaborator: string = '';
  selectedProject: string = '';
  startDate: string = '';
  endDate: string = '';
  average: string = '';
  mois: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
// Exemple pour PV avec Technicien et Ingénieur
pvOptions = [
  {
    type: 'Technicien',
    subOptions: [
      { code: 'T1', cost: 80 },
      { code: 'T2', cost: 90 },
      { code: 'T3', cost: 100 },
      { code: 'T4', cost: 110 },
    ]
  },
  {
    type: 'Ingénieur',
    subOptions: [
      { code: 'I1', cost: 120 },
      { code: 'I2', cost: 130 },
      { code: 'I3', cost: 140 },
      { code: 'I4', cost: 150 },
    ]
  }
];

selectedPVType: string = ''; // "Technicien" ou "Ingénieur"
selectedPVSub: any = null;   // stocke l'option sélectionnée avec le coût

  moisActuel: string = '';
  moisActuelIndex: number = new Date().getMonth();
  years = [2023, 2024, 2025];
  calendarVisible: boolean = false;
  
  selectedYear = new Date().getFullYear();

  weeks: any[] = [];


workloads: { [collabName: string]: { [weekLabel: string]: string } } = {};

  constructor(private projetService: ProjetService,
    private userservice : UserserviceService,private cdr: ChangeDetectorRef,   private snackBar: MatSnackBar

    
    ) {}

    ngOnInit(): void {
      this.loadAllCollaborateurs();  // Charge tous les collaborateurs
      this.loadActivites();
      this.generateWeeksOfYear(this.selectedYear);
    
      this.projetService.getProjets().subscribe(
        (res) => {
          console.log("📌 Projets récupérés:", res);
          this.projects = res.data || res;
        },
        (error) => {
          console.error("❌ Erreur lors de la récupération des projets", error);
        }
      );
    }
    
    // Méthode pour récupérer tous les collaborateurs (backend peut retourner tous si aucun projetId)
    loadAllCollaborateurs() {
      this.userservice.getAllUsers().subscribe((res: any) => {
        this.collaborateurs = res.data || [];
        this.filteredCollaborators = [...this.collaborateurs]; // afficher tous au départ
        this.initWorkloads();
      });
    }
    
    // Initialiser les workloads pour tous les collaborateurs
    initWorkloads() {
      this.collaborateurs.forEach(collab => {
        this.workloads[collab.name] = {};
        this.weeks.forEach(week => {
          this.workloads[collab.name][week.label] = `${Math.floor(Math.random() * 20 + 5)} / 262`;
        });
      });
    }
    
    
  selectPVSub(sub: any) {
    this.selectedPVSub = sub;
  
    const pv = this.pvOptions.find(p => p.subOptions.includes(sub));
    if (pv) {
      this.selectedPVType = pv.type;
      this.selectedPV = `${pv.type} - ${sub.code}`; // ou sub.code selon ce que tu veux sauvegarder
    } else {
      this.selectedPVType = '';
      this.selectedPV = null;
    }
  }
  
  
  
  
  onPVTypeChange() {
    const pv = this.pvOptions.find(p => p.type === this.selectedPVType);
    this.filteredPVSubOptions = pv ? pv.subOptions : [];
    this.selectedPVSub = null; // réinitialiser la sélection précédente
  }
  loadCollaborateurs() {
    this.userservice.getAllUsers().subscribe((res: any) => {
      console.log("📌 Collaborateurs récupérés:", res);
  
      this.collaborateurs = res.data || [];
      this.filteredCollaborators = [...this.collaborateurs]; // <-- ajouter cette ligne
  
      // Initialiser les workloads après avoir chargé les collaborateurs
      this.collaborateurs.forEach(collab => {
        this.workloads[collab.name] = {};
        this.weeks.forEach(week => {
          this.workloads[collab.name][week.label] = `${Math.floor(Math.random() * 20 + 5)} / 262`;
        });
      });
    });
  }
  
  

  // Charge la liste des activités
  loadActivites() {
    this.projetService.getActivites().subscribe(res => {
      this.activities = res.data || [];
      this.cdr.detectChanges(); // force le rafraîchissement du HTML
    });
  }
  
  
  onProjectChange() {
  if (this.selectedProject) {
    const projectId = +this.selectedProject; // ← conversion string → number
    this.projetService.getCollaborateursByProject(projectId).subscribe(
      (res: any) => {
        this.filteredCollaborators = res.data || [];
        console.log("📌 Collaborateurs filtrés:", this.filteredCollaborators);
      },
      (err) => {
        console.error(" Erreur lors du filtrage des collaborateurs", err);
      }
    );
  } else {
    this.filteredCollaborators = [...this.collaborateurs];
  }
}
isWeekActiveForCollaborator(collab: any, week: any): boolean {
  if (!collab.activities || !Array.isArray(collab.activities)) return false;

  const weekStart = new Date(week.start);
  const weekEnd = new Date(week.end);

  return collab.activities.some((act: Pivot) => {
    const actStart = new Date(act.date_debut);
    const actEnd = new Date(act.date_fin);

    return actStart <= weekEnd && actEnd >= weekStart;
  });
}
  // Maintenant la méthode suivante commence proprement
  generateWeeksOfCurrentMonth(year: number, monthIndex: number) {
    const start = new Date(year, monthIndex, 1);
    const end = new Date(year, monthIndex + 1, 0);
    const weeks: any[] = [];
    let current = new Date(start);
    let weekNumber = 1;
    const moisAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    while (current <= end) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekStart.getDate() + 6);
  
      if (weekEnd.getMonth() !== monthIndex) {
        weekEnd.setMonth(monthIndex);
        weekEnd.setDate(end.getDate());
      }
  
      const monthShort = moisAbr[weekStart.getMonth()];
  
      weeks.push({
        label: `${monthShort} - W${weekNumber}`,
        start: weekStart.toISOString().substring(0, 10),
        end: weekEnd.toISOString().substring(0, 10),
        enabled: true
      });
  
      current.setDate(current.getDate() + 7);
      weekNumber++;
    }
  
    this.weeks = weeks;
  }
  onWeekSelected(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      const monday = this.getMonday(selectedDate);
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      
      console.log('Semaine:', this.formatDate(monday), '→', this.formatDate(sunday));
      // Tu peux émettre un event ici si besoin
    }
  }
  
  getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Lundi = 1
    return new Date(d.setDate(diff));
  }
  
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  generateWeeksOfYear(year: number) {
    const weeks: any[] = [];
    const moisAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    // Premier jour de l'année
    let current = new Date(year, 0, 1);
  
    // Ajuster au premier lundi de l'année (ISO 8601)
    const day = current.getDay(); // 0=dimanche, 1=lundi...
    const diffToMonday = day === 0 ? 1 : (day > 1 ? 8 - day : 1 - day);
    current.setDate(current.getDate() + diffToMonday);
  
    for (let weekNumber = 1; weekNumber <= 52; weekNumber++) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);
  
      const monthShort = moisAbr[weekStart.getMonth()];
  
      weeks.push({
        label: `${monthShort} W${weekNumber}`,
        start: weekStart.toISOString().substring(0, 10),
        end: weekEnd.toISOString().substring(0, 10),
        enabled: true // ✅ Ajoute cette ligne

      });
  
      current.setDate(current.getDate() + 7);
    }
  
    this.weeks = weeks;
  }
  toggleWeek(week: any) {
  week.enabled = !week.enabled;
}

  generateReport() {
    console.log(`Génération du rapport pour ${this.selectedProject} - ${this.selectedYear}`);
  }
  isActive(collab: any, week: any): boolean {
    if (!collab.weeks) return false; // ← évite l'erreur
    const weekNumberMatch = week.label.match(/W(\d+)/);
    const weekNumber = weekNumberMatch ? parseInt(weekNumberMatch[1], 10) : 0;
    return collab.weeks.includes(weekNumber);
  }
  
  onWeekSelecteda(event: any) {
    console.log('Semaine sélectionnée :', event);
  }
  getWorkload(collab: any, week: any): string {
    return `${Math.floor(Math.random() * 20 + 5)} / 262`;
  }
  getWeekDays(weekStartISO: string): { label: string, date: Date }[] {
    const weekStart = new Date(weekStartISO);
    // Ajuster au lundi de la semaine (au cas où weekStart n'est pas un lundi)
    const day = weekStart.getDay(); // 0 (Dim) ... 6 (Sam)
    const diffToMonday = (day === 0) ? -6 : 1 - day; // Si dim, recule 6 jours, sinon recule au lundi
    
    const monday = new Date(weekStart);
    monday.setDate(monday.getDate() + diffToMonday);
  
    // Générer du lundi au vendredi
    const days = [];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
    for(let i=0; i<5; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      days.push({ label: dayLabels[i], date: currentDay });
    }
    return days;
  }
  onYearChange() {
    this.generateWeeksOfYear(this.selectedYear);
    // this.generateWeeksOfCurrentMonth(this.selectedYear, this.moisActuelIndex); ❌ À désactiver
    // Regénérer les workloads si nécessaire
    this.collaborateurs.forEach(collab => {
      this.workloads[collab.name] = {};
      this.weeks.forEach(week => {
        this.workloads[collab.name][week.label] = `${Math.floor(Math.random() * 20 + 5)} / 262`;
      });
    });
  }
  openCollaboratorModal() {
    this.loadActivites(); // Charger les activités juste avant l'ouverture
    this.isModalOpen = true;
  }
  
  closeCollaboratorModal() {
    this.isModalOpen = false;
  }

  get collaborateursFiltres() {
    if (!this.selectedProject) return [];
    return this.collaborateurs.filter(c => c.projet_id === this.selectedProject);
  }
  
  onSubmit() {
    if (!this.selectedProject) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez sélectionner un projet',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: '#f44336',
        color: '#fff'
      });
      return;
    }
  
    const data = {
      user_id: this.selectedCollaborator,
      activity_type: this.selectedActivityType,
      activite_id: this.selectedActivity,
      projet_id: this.selectedProject,
      post: this.selectedPost,
      pv: this.selectedPV,
      date_debut: this.startDate,
      date_fin: this.endDate
    };
  
    this.projetService.addCollaborateur(data).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Collaborateur ajouté avec succès ✅',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#4caf50',
          color: '#fff'
        });
  
        // Ajouter le collaborateur localement avec infos du projet
        const collabInfo = this.collaborateurs.find(c => c.id === this.selectedCollaborator);
        if (collabInfo && !this.addedCollaborators.some(c => c.user_id === collabInfo.id && c.projet_id === this.selectedProject)) {
          this.addedCollaborators.push({
            ...collabInfo,
            user_id: collabInfo.id,
            projet_id: this.selectedProject
          });
        }
        //this.filteredCollaborators = this.addedCollaborators.filter(c => c.projet_id === this.selectedProject);

        this.closeCollaboratorModal();
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout ❌',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#f44336',
          color: '#fff'
        });
      }
    );
  }
  
  
  

}
