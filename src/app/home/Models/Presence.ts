export class Presence {
    id?: number;
    user_id!: number;
    date!: string; // ou Date si tu utilises un parseur
    presence_matin!: boolean;
    presence_apresmidi!: boolean;
    heurestravaillees!: number;
    heuresabsence!: number;
    est_valide!: boolean;
   
   
  }
  // src/app/models/presence.model.ts

export interface PresenceDataByDay {
  [day: string]: string;  // valeurs possibles : "1", "0.5", "Absent", ""
}

export interface UserPresence {
  id: number;
  nom: string;
  presences: PresenceDataByDay;
  joursTravailles?: number;  // optionnel
  joursOuvres?: number;      // 
}

export interface PresencesResponse {
  message: string;
  data: UserPresence[];
}
