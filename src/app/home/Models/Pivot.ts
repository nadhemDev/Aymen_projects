export class Pivot {
    id!: number;
    user_id!: number;       // clé étrangère utilisateur
    projet_id!: number;     // clé étrangère projet
    activite_id!: number;   // clé étrangère activité
    date_debut!: string;    // format YYYY-MM-DD
    date_fin!: string;      // format YYYY-MM-DD
    pv!: string;            // Procès-verbal ou autre info
    activity_type!: string; // type d'activité
    post!: string;          // poste ou fonction
  }
  