import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../theme/shared/shared.module';

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
import { AjoutStatutComponent } from './Parametrage/statut/ajout-statut/ajout-statut.component';
import { DetailStatutComponent } from './Parametrage/statut/detail-statut/detail-statut.component';
import { DetailPrioriteComponent } from './Parametrage/Priorite/detail-priorite/detail-priorite.component';
import { AjoutPrioriteComponent } from './Parametrage/Priorite/ajout-priorite/ajout-priorite.component';
import { AjoutRelationprojetComponent } from './Parametrage/relation-projet/ajout-relationprojet/ajout-relationprojet.component';
import { DetailRelationprojetComponent } from './Parametrage/relation-projet/detail-relationprojet/detail-relationprojet.component';
import { AddTypeprojetComponent } from './Parametrage/type-projet/add-typeprojet/add-typeprojet.component';
import { AddNatureJobComponent } from './Parametrage/nature-job/add-nature-job/add-nature-job.component';
import { AddNatureStructureComponent } from './Parametrage/nature-structure/add-nature-structure/add-nature-structure.component';
import { AddNatureRelationComponent } from './Parametrage/nature-relation/add-nature-relation/add-nature-relation.component';
import { AddGroupeRessourceComponent } from './Parametrage/groupe-ressource/add-groupe-ressource/add-groupe-ressource.component';
import { AddTypeEquipementComponent } from './Parametrage/type-equipement/add-type-equipement/add-type-equipement.component';
import { AddTypeRessourceComponent } from './Parametrage/type-ressource/add-type-ressource/add-type-ressource.component';

import { SaisieheureComponent } from './gestion_presence/saisieheure/saisieheure.component';
import { AfficherhComponent } from './RessourceHumaine/afficherh/afficherh.component';
import { AddRhComponent } from './RessourceHumaine/add-rh/add-rh.component';
import { AfficheComptableComponent } from './Comptable/affiche-comptable/affiche-comptable.component';
import { ValidationPointageComponent } from './gestion_presence/validation-pointage/validation-pointage.component';
import { AfficheglobalbudgetComponent } from './GestionBudget/afficheglobalbudget/afficheglobalbudget.component';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Angular Material modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

// Fundamental NGX
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { DatetimeAdapter, FdDatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core';
import { AffichedetailbudgetComponent } from './GestionBudget/affichedetailbudget/affichedetailbudget.component';
import { PresencemensuelleComponent } from './gestion_presence/presencemensuelle/presencemensuelle.component';

@NgModule({
  declarations: [
    StatutComponent,
    PrioriteComponent,
    TypeRessourceComponent,
    TypeProjetComponent,
    NatureJobComponent,
    NatureStructureComponent,
    NatureRelationComponent,
    RelationProjetComponent,
    GroupeRessourceComponent,
    TypeEquipementComponent,
    AjoutStatutComponent,
    DetailStatutComponent,
    DetailPrioriteComponent,
    AjoutPrioriteComponent,
    AjoutRelationprojetComponent,
    DetailRelationprojetComponent,
    AddTypeprojetComponent,
    AddNatureJobComponent,
    AddNatureStructureComponent,
    AddNatureRelationComponent,
    AddGroupeRessourceComponent,
    AddTypeEquipementComponent,
    AddTypeRessourceComponent,
    SaisieheureComponent,
    AfficherhComponent,
    AddRhComponent,
    AfficheComptableComponent,
    ValidationPointageComponent,
    AfficheglobalbudgetComponent,
    AffichedetailbudgetComponent,
    PresencemensuelleComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    // Angular Material
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    // Fundamental NGX
    FdDatetimeModule,
    CalendarModule,
    PlatformModule
  ],
  providers: [
    {
      provide: DatetimeAdapter,
      useClass: FdDatetimeAdapter,
      deps: [Platform]
    },
   
  ]
})
export class HomeModule { }