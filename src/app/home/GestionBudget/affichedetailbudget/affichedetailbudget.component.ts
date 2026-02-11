import { Component, OnInit } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { IndicateurmoisService } from 'src/app/services/indicateurmois.service';

@Component({
  selector: 'app-affichedetailbudget',
  templateUrl: './affichedetailbudget.component.html',
  styleUrls: ['./affichedetailbudget.component.scss']
})
export class AffichedetailbudgetComponent implements OnInit {

  moisLabels: string[] = ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11'];
  expandedMois: string | null = null;
  showAllDetails: boolean = false;

  utilisateurs: any[] = [];

  budgetFIT: number[] = [];
  budgetCE2: number[] = [];
  scrCost: number[] = [];
  production: number[] = [];
  marge: string[] = [];
  etp: number[] = [];

  presenceData: { [userId: number]: { [mois: string]: number | string } } = {};

  detailsData: {
    [userId: number]: {
      [mois: string]: {
        joursTravailles: number;
        scrCost: number;
        joursOuvres: number;
        production: number;
        margin: number;
      };
    };
  } = {}; // <- Initialisation correcte ici

  expandedUserId: number | null = null;

  constructor(
    private userService: UserserviceService,
    private indicateurService: IndicateurmoisService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.utilisateurs = response.data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    );

    const anneeActuelle = new Date().getFullYear();
    this.indicateurService.getIndicateursParAnnee(anneeActuelle).subscribe(
      (response: any) => {
        const data = response.data;
        this.budgetFIT = this.fillMonthlyArray(data, 'budget_fit');
        this.budgetCE2 = this.fillMonthlyArray(data, 'budget_ce2');
        this.scrCost = this.fillMonthlyArray(data, 'scr_cost');
        this.production = this.fillMonthlyArray(data, 'production');
        this.marge = this.fillMonthlyArray(data, 'marge');
        this.etp = this.fillMonthlyArray(data, 'etp');
      },
      (error) => {
        console.error('Erreur lors de la récupération des indicateurs :', error);
      }
    );

    // ✅ DONNÉES DÉTAILS DE TEST : à afficher dans les détails utilisateur
    this.detailsData = {
      1: {
        M0: {
          joursTravailles: 20,
          scrCost: 850,
          joursOuvres: 22,
          production: 140,
          margin: 18
        },
        M1: {
          joursTravailles: 18,
          scrCost: 800,
          joursOuvres: 20,
          production: 130,
          margin: 16
        }
      },
      2: {
        M0: {
          joursTravailles: 15,
          scrCost: 750,
          joursOuvres: 21,
          production: 120,
          margin: 14
        }
      },
      3: {
        M3: {
          joursTravailles: 15,
          scrCost: 750,
          joursOuvres: 21,
          production: 120,
          margin: 14
        }
      }
    };
  }

  fillMonthlyArray(data: any[], field: string): any[] {
    const result = new Array(12).fill(null);
    data.forEach(item => {
      if (item.mois >= 1 && item.mois <= 12) {
        result[item.mois - 1] = item[field];
      }
    });
    return result;
  }

  getPresence(userId: number, mois: string): string {
    const userPresence = this.presenceData[userId];
    if (userPresence && userPresence[mois] !== undefined) {
      return String(userPresence[mois]);
    }
    return '';
  }

  toggleDetails(userId: number, mois: string): void {
    if (this.expandedUserId === userId && this.expandedMois === mois) {
      this.expandedUserId = null;
      this.expandedMois = null;
    } else {
      this.expandedUserId = userId;
      this.expandedMois = mois;
    }
  }

  getNomMois(moisCode: string): string {
    const noms = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const index = parseInt(moisCode.replace('M', ''));
    return noms[index] || moisCode;
  }

  getDetails(userId: number, mois: string) {
    const userDetails = this.detailsData[userId];
    if (userDetails && userDetails[mois]) {
      return userDetails[mois];
    }
    return {
      joursTravailles: '-',
      scrCost: '-',
      joursOuvres: '-',
      production: '-',
      margin: '-'
    };
  }

  toggleMoisDetails(mois: string): void {
    this.expandedMois = this.expandedMois === mois ? null : mois;
  }

  hasDetails(userId: number, mois: string): boolean {
    return !!(this.detailsData[userId] && this.detailsData[userId][mois]);
  }


  getTotal(arr: number[]): number {
    return arr.reduce((sum, val) => sum + val, 0);
  }
  
  getYTD(arr: number[]): number {
    const currentMonth = new Date().getMonth(); // 0 = Janvier
    return arr.slice(0, currentMonth + 1).reduce((sum, val) => sum + val, 0);
  }
  
  getMAT(arr: number[]): number {
    const currentMonth = new Date().getMonth();
    const start = currentMonth - 11 < 0 ? 0 : currentMonth - 11;
    return arr.slice(start, currentMonth + 1).reduce((sum, val) => sum + val, 0);
  }
  
}
