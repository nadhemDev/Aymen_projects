import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import * as moment from 'moment';
import { ChartDB } from 'src/app/fack-db/chart-data';
import { PresenceService } from 'src/app/services/presence.service';
import { UserserviceService } from 'src/app/services/userservice.service';
import { ApexChartService } from 'src/app/theme/shared/components/chart/apex-chart/apex-chart.service';
import { formatDate } from '@angular/common';

interface Jour {
  nomJour: string;
  date: string;
}

@Component({
  selector: 'app-saisieheure',
  templateUrl: './saisieheure.component.html',
  styleUrls: ['./saisieheure.component.scss']
})
export class SaisieheureComponent implements OnInit, OnDestroy {
  semaines: any[] = [];
  semainesVisible: any[] = [];
  currentWeekIndex: number = 0;
  public chartDB: any;

  selectedSemaine: any;
  heuresParJour: { [key: string]: number } = {};
  utilisateur: any = {};
  heuresSelectionnees: { [date: string]: { matin: boolean, apresMidi: boolean } } = {};


  pie2CAC: ApexOptions = {
    chart: {
      type: "donut",
      height: 250
    },
    labels: ["Pris", "Solde"],
    series: [3, 5.4], // ← valeurs statiques
    colors: ["#a0a0a0", "#008000"], // gris pour "Pris", vert pour "Solde"
    title: {
      text: "Solde congés.",
      align: "center",
      style: {
        fontSize: "16px"
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts) {
        const labels = opts.w.config.labels || [];
        const label = labels[opts.seriesIndex] || "";
        return label + ": " + val.toFixed(1) + " jours";
      }
    },
    legend: {
      position: "right"
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "TOTAL",
              formatter: () => "8.4 JOURS" // ← affichage statique du total
            }
          }
        }
      }
    }
  };
  

  
  gaugeTR: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 250
    },
    series: [8],
    labels: ["Tickets"],
    title: {
      text: "Tickets restaurant du mois",
      align: "center",
      style: {
        fontSize: "14px"
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e0e0e0",
          strokeWidth: "100%"
        },
        hollow: {
          margin: 15,
          size: "60%"
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 20,
            color: "#666"
          },
          value: {
            show: true,
            fontSize: "28px",
            offsetY: -10,
            formatter: (val) => `${val} tickets`
          }
        }
      }
    },
    colors: ["#008000"]
  };

  localStorageKey = 'heuresSelectionnees';

  constructor(
    public apexEvent: ApexChartService,
    private userService: UserserviceService,
    private presenceService: PresenceService
  ) {
    this.chartDB = {
      pie2CAC: this.pie2CAC,
      gaugeTR: this.gaugeTR
    };
  }

  ngOnInit() {
    this.utilisateur = this.userService.getUser();
    this.generateSemaines();

    this.currentWeekIndex = this.semaines.findIndex(s => s.isCurrent);
    if (this.currentWeekIndex === -1) {
      this.currentWeekIndex = 0;
    }

    this.updateVisibleWeeks();
    this.selectSemaine(this.semaines[this.currentWeekIndex]);

    const storedHeures = localStorage.getItem(this.localStorageKey);
    if (storedHeures) {
      this.heuresSelectionnees = JSON.parse(storedHeures);
    } else if (this.selectedSemaine) {
      this.initialiserHeuresSelectionnees(this.selectedSemaine);
      this.updateGaugeTR();
    }
  }

  ngOnDestroy() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.heuresSelectionnees));
  }

  calculerTicketsResto(): number {
    let compteur = 0;
    if (this.selectedSemaine && this.selectedSemaine.jours) {
      for (const jour of this.selectedSemaine.jours) {
        const selection = this.heuresSelectionnees[jour.date];
        if (selection && selection.matin && selection.apresMidi) {
          compteur++;
        }
      }
    }
    return compteur;
  }
  getTotalHeuresSemaine(): number {
    let total = 0;
    if (this.selectedSemaine && this.selectedSemaine.jours) {
      for (const jour of this.selectedSemaine.jours) {
        const selection = this.heuresSelectionnees[jour.date];
        if (selection) {
          if (selection.matin) total += 4;       // matin = 4h
          if (selection.apresMidi) total += 4;   // après-midi = 4h
        }
      }
    }
    return total;
  }
  // Vérifie si la semaine est terminée
  isSemaineFinie(): boolean {
    const today = moment();
    // Exemple : on considère que la semaine finit le dimanche
    return today.isoWeekday() === 7; 
  }


  // Total heures d'absence (uniquement si semaine finie)
  getHeuresAbsence(user: any): number {
    if (this.isSemaineFinie()) {
      return user.absences.reduce((a: number, b: number) => a + b, 0);
    }
    return 0; // pas encore de calcul d’absence
  }
    
  updateGaugeTR() {
    const nbTickets = this.calculerTicketsResto();
    console.log('Nombre de tickets:', nbTickets);  // Vérification de la valeur calculée
    this.gaugeTR.series = [nbTickets];
    this.apexEvent.updateOptions(this.gaugeTR);  // Mise à jour du graphique avec la nouvelle série
  }

  valider() {
    const tableauPresence = [];
    for (const jour of this.selectedSemaine.jours) {
      const dateStr = formatDate(jour.date, 'yyyy-MM-dd', 'en-US');
      const selection = this.heuresSelectionnees[dateStr];
      if (selection && (selection.matin || selection.apresMidi)) {
        tableauPresence.push({
          date: dateStr,
          presence_matin: selection.matin ? 1 : 0,
          presence_apresmidi: selection.apresMidi ? 1 : 0,
          user_id: this.utilisateur.id
        });
      }
    }

    if (tableauPresence.length === 0) {
      alert('Aucune présence sélectionnée.');
      return;
    }

    this.presenceService.enregistrerPresence(tableauPresence).subscribe({
      next: (res) => {
        console.log('Présence enregistrée avec succès', res);
        alert('Présence enregistrée !');
        localStorage.removeItem(this.localStorageKey);
      },
      error: (err) => {
        console.error('Erreur d\'enregistrement', err);
        alert('Erreur lors de l’enregistrement');
      }
    });
  }
  toggleHeure(date: Date, periode: 'matin' | 'apresMidi') {
    const dateStr = formatDate(date, 'yyyy-MM-dd', 'en-US');
    if (!this.heuresSelectionnees[dateStr]) {
      this.heuresSelectionnees[dateStr] = { matin: false, apresMidi: false };
    }
  
    this.heuresSelectionnees[dateStr][periode] = !this.heuresSelectionnees[dateStr][periode];
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
      this.selectSemaine(this.semaines[this.currentWeekIndex]); // Resélectionner pour potentiellement recharger les présences
    }
  }

  nextWeeks() {
    if (this.currentWeekIndex + 5 < this.semaines.length) {
      this.currentWeekIndex++;
      this.updateVisibleWeeks();
      this.selectSemaine(this.semaines[this.currentWeekIndex]); // Resélectionner pour potentiellement recharger les présences
    }
  }

  selectSemaine(semaine: any) {
    const index = this.semaines.findIndex(
      (s) => s.numero === semaine.numero
    );
    if (index !== -1) {
      this.selectedSemaine = semaine;
      this.heuresSelectionnees = {};
      this.initialiserHeuresSelectionnees(semaine);
      this.updateGaugeTR();
    }
  }

  initialiserHeuresSelectionnees(semaine: any) {
    semaine.jours.forEach((jour: any) => {
      this.heuresSelectionnees[jour.date] = { matin: false, apresMidi: false };
    });
  }

  togglePresence(jourDate: string, type: 'matin' | 'apresMidi') {
    const selection = this.heuresSelectionnees[jourDate];
    if (selection) {
      selection[type] = !selection[type];
      this.updateGaugeTR();  // Mise à jour du graphique après chaque modification
    }
  }
}
