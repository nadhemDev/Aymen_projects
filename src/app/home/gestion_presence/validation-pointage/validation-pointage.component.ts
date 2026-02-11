import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PresenceService } from 'src/app/services/presence.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Jour {
  nomJour: string; // exemple: 'Lun.'
  date: string;    // '2025-04-16'
}
@Component({
  selector: 'app-validation-pointage',
  templateUrl: './validation-pointage.component.html',
  styleUrls: ['./validation-pointage.component.scss']
})
export class ValidationPointageComponent implements OnInit {
  semaines: any[] = []; // toutes les semaines générées
  semainesVisible: any[] = []; // les 5 affichées
  currentWeekIndex: number = 0;
  public chartDB: any;
  utilisateurSelectionne: any = null;
  bookmarkValide = false;  // au départ grise

  selectedSemaine: any;
  heuresParJour: { [key: string]: number } = {};
  utilisateurs: any[] = [];
  heuresSelectionnees: {
    [utilisateurId: string]: {
      [date: string]: { matin: boolean; apresMidi: boolean };
    };
  } = {};  constructor( private userService: UserserviceService,
    private presenceService: PresenceService,
    private snackBar: MatSnackBar
     // <-- ici
) { }

 
ngOnInit() {
  this.generateSemaines();
  this.currentWeekIndex = this.semaines.findIndex(s => s.isCurrent);
  if (this.currentWeekIndex === -1) this.currentWeekIndex = 0;
  this.updateVisibleWeeks();
  this.selectSemaine(this.semaines[this.currentWeekIndex]);

  this.userService.getAllUsers().subscribe((res: any) => {
    console.log('Résultat de getAllUsers():', res);
    this.utilisateurs = res.data || [];

    this.utilisateurs.forEach(u => {
      this.heuresSelectionnees[u.id] = {};
    });

    // ✅ maintenant que les utilisateurs sont là, on charge les états cochés
    this.chargerValidationEtat();
  });
}



generateSemaines() {
  const year = new Date().getFullYear();
  const today = new Date();
  const firstMonday = this.getFirstISOWeekMonday(year);
  let current = new Date(firstMonday);
  let weekCount = 1;
  this.semaines = [];

  while (
    current.getFullYear() <= year ||
    (this.getISOWeek(current) === 1 && current.getFullYear() === year + 1)
  ) {
    const end = new Date(current);
    end.setDate(current.getDate() + 6);

    const semaineObj = {
      numero: weekCount,
      dateRange: `${this.formatDate(current)} - ${this.formatDate(end)}`,
      label: `Semaine ${weekCount}`,
      jours: this.getJoursDeLaSemaine(current),
      isCurrent: this.isSameWeek(current, today)
    };

    this.semaines.push(semaineObj);
    current.setDate(current.getDate() + 7);
    weekCount++;
  }
}
isHeureSelectionnee(utilisateurId: string, date: string, type: 'matin' | 'apresMidi'): boolean {
  return (
    this.heuresSelectionnees &&
    this.heuresSelectionnees[utilisateurId] &&
    this.heuresSelectionnees[utilisateurId][date] &&
    this.heuresSelectionnees[utilisateurId][date][type]
  ) || false;
}


getFirstISOWeekMonday(year: number): Date {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay();
  const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  jan4.setDate(jan4.getDate() + diff);
  return jan4;
}

getISOWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDay = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDay + 3);
  const diff = target.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

getJoursDeLaSemaine(date: Date): Jour[] {
  const startOfWeek = moment(date).startOf('isoWeek');
  const jours: Jour[] = [];

  for (let i = 0; i < 7; i++) {
    const jour = startOfWeek.clone().add(i, 'days');
    jours.push({
      nomJour: jour.format('ddd'),
      date: jour.format('YYYY-MM-DD'),
    });
  }

  return jours;
}

generateJours(start: Date) {
  const jours = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    jours.push({
      date: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
      }),
    });
  }
  return jours;
}

isSameWeek(date1: Date, date2: Date): boolean {
  return (
    moment(date1).isoWeek() === moment(date2).isoWeek() &&
    moment(date1).isoWeekYear() === moment(date2).isoWeekYear()
  );
}

formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
  });
}

updateVisibleWeeks() {
  this.semainesVisible = this.semaines.slice(
    this.currentWeekIndex,
    this.currentWeekIndex + 5
  );
}

previousWeeks() {
  if (this.currentWeekIndex - 1 >= 0) {
    this.currentWeekIndex--;
    this.updateVisibleWeeks();
  }
}

nextWeeks() {
  if (this.currentWeekIndex + 5 < this.semaines.length) {
    this.currentWeekIndex++;
    this.updateVisibleWeeks();
  }
}

selectSemaine(semaine: any) {
  const index = this.semaines.findIndex((s) => s.numero === semaine.numero);
  if (index !== -1) {
    this.currentWeekIndex = Math.max(0, index - 2);
    this.updateVisibleWeeks();
    this.selectedSemaine = semaine;

    const dateDebut = semaine.jours[0].date;
    const dateFin = semaine.jours[semaine.jours.length - 1].date;

    this.presenceService.getPresencesParSemaine(dateDebut, dateFin).subscribe((res: any) => {
      const presences = res.data || [];

      this.utilisateurs.forEach(utilisateur => {
        this.heuresSelectionnees[utilisateur.id] = {};
        semaine.jours.forEach(jour => {
          this.heuresSelectionnees[utilisateur.id][jour.date] = {
            matin: false,
            apresMidi: false
          };
        });
      });

      presences.forEach(userPresence => {
        const id = userPresence.id;
        const jours = userPresence.presences;

        Object.keys(jours).forEach(date => {
          if (!this.heuresSelectionnees[id]) this.heuresSelectionnees[id] = {};
          this.heuresSelectionnees[id][date] = {
            matin: jours[date].matin,
            apresMidi: jours[date].apresMidi
          };
        });
      });
    });
  }
}

toggleHeure(utilisateurId: string, date: string, type: 'matin' | 'apresMidi') {
  if (!this.heuresSelectionnees[utilisateurId][date]) {
    this.heuresSelectionnees[utilisateurId][date] = { matin: false, apresMidi: false };
  }

  this.heuresSelectionnees[utilisateurId][date][type] =
    !this.heuresSelectionnees[utilisateurId][date][type];
}


// Quand je valide, j'ajoute aussi estVerrouille
validerPresence(utilisateur: any) {
  const presencesValidees = [];

  for (const jour of this.selectedSemaine.jours) {
    const date = jour.date;
    const heuresParDate = this.heuresSelectionnees[utilisateur.id];
    const heures = heuresParDate ? heuresParDate[date] : null;

    if ((heures && heures.matin) || (heures && heures.apresMidi)) {
      presencesValidees.push({
        user_id: utilisateur.id,
        date: date
      });
    }
  }

  if (presencesValidees.length > 0) {
    this.presenceService.validerPresences(presencesValidees).subscribe(
      (res: any) => {
        utilisateur.estValide = true;
        utilisateur.estVerrouille = true; // ✅ Verrouille après validation
        this.onCheckboxChange(utilisateur);
        this.snackBar.open(`✅ Heures validées pour ${utilisateur.nom}`, 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      (err) => {
        utilisateur.estValide = false;
        utilisateur.estVerrouille = false;
        this.onCheckboxChange(utilisateur);
      }
    );
  }
}

// Toggle lock
toggleLock(utilisateur: any) {
  utilisateur.estVerrouille = !utilisateur.estVerrouille;
}



chargerValidationEtat() {
  const data = localStorage.getItem('validationEtat');
  if (data) {
    const etatParUtilisateur = JSON.parse(data);
    for (const utilisateur of this.utilisateurs) {
      utilisateur.estValide = etatParUtilisateur[utilisateur.id] || false;
    }
  }
}

onCheckboxChange(utilisateur: any) {
  if (utilisateur.estValide) {
    this.utilisateurSelectionne = utilisateur;
  } else {
    this.utilisateurSelectionne = null;
  }

  // ✅ Enregistrer les états actuels dans localStorage
  const etatParUtilisateur: { [key: string]: boolean } = {};
  for (const u of this.utilisateurs) {
    etatParUtilisateur[u.id] = u.estValide || false;
  }
  localStorage.setItem('validationEtat', JSON.stringify(etatParUtilisateur));
}



}
