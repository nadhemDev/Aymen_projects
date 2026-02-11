import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatutComponent } from './Parametrage/statut/statut.component';
import { PrioriteComponent } from './Parametrage/Priorite/priorite.component';
import { TypeRessourceComponent } from './Parametrage/type-ressource/type-ressource.component';
import { TypeProjetComponent } from './Parametrage/type-projet/type-projet.component';
import { NatureJobComponent } from './Parametrage/nature-job/nature-job.component';
import { NatureStructureComponent } from './Parametrage/nature-structure/nature-structure.component';
import { NatureRelationComponent } from './Parametrage/nature-relation/nature-relation.component';
import { RelationProjetComponent } from './Parametrage/relation-projet/relation-projet.component';
import { GroupeRessourceComponent } from './Parametrage/groupe-ressource/groupe-ressource.component';
import { TypeEquipementComponent } from './Parametrage/type-equipement/type-equipement.component';
import { SaisieheureComponent } from './gestion_presence/saisieheure/saisieheure.component';
import { AfficherhComponent } from './RessourceHumaine/afficherh/afficherh.component';
import { AfficheComptableComponent } from './Comptable/affiche-comptable/affiche-comptable.component';
import { ValidationPointageComponent } from './gestion_presence/validation-pointage/validation-pointage.component';
import { AfficheglobalbudgetComponent } from './GestionBudget/afficheglobalbudget/afficheglobalbudget.component';
import { AffichedetailbudgetComponent } from './GestionBudget/affichedetailbudget/affichedetailbudget.component';
import { PresencemensuelleComponent } from './gestion_presence/presencemensuelle/presencemensuelle.component';


const routes: Routes = [
 
    {
      path: 'statut',
      component: StatutComponent
    },
    {
      path: 'priorite',
      component: PrioriteComponent
    },
    {
      path: 'typeressource',
      component: TypeRessourceComponent
    },
    {
      path: 'typeequipement',
      component: TypeEquipementComponent
    },
    {
      path: 'grouperessource',
      component: GroupeRessourceComponent
    },
    {
      path: 'relationprojet',
      component: RelationProjetComponent
    },
    {
      path: 'naturerelation',
      component: NatureRelationComponent
    },
    {
      path: 'naturestructure',
      component: NatureStructureComponent
    },
    {
      path: 'naturejob',
      component: NatureJobComponent
    },
    {
      path: 'typeprojet',
      component: TypeProjetComponent
    },
    {
      path: 'saisiheure',
      component: SaisieheureComponent
    },
    {
      path: 'ressourcehumaine',
      component: AfficherhComponent
    },
    {
      path: 'comptable',
      component: AfficheComptableComponent
    },
    {
      path: 'validationpointage',
      component: ValidationPointageComponent
    },

    {
      path: 'projetglobal',
      component: AfficheglobalbudgetComponent
    },
    {
      path: 'projetdetaille',
      component: AffichedetailbudgetComponent
    },
    {
      path: 'presencemensuelle',
      component: PresencemensuelleComponent
    }

    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
