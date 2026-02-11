export class OperationUpload {
    id!: number;
    mois!: string;
    annee!: string;
    dateop!: string; // string car généralement Laravel retourne les dates en format string ISO
    statut_id!: number;
  }
  