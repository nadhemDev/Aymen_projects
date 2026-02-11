import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation ',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/analytics',
        icon: 'feather icon-home'
      },
      
    ]
  },
  {
    id: 'ui-element',
    title: 'UI ELEMENT & FORMS',
    type: 'group',
    icon: 'feather icon-layers',
    children: [
      {
        id: 'basic',
        title: 'Basic',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'alert',
            title: 'Alert',
            type: 'item',
            url: '/basic/alert'
          },
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumbs & Pagination',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'cards',
            title: 'Cards',
            type: 'item',
            url: '/basic/cards'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'carousel',
            title: 'Carousel',
            type: 'item',
            url: '/basic/carousel'
          },
          {
            id: 'grid-system',
            title: 'Grid System',
            type: 'item',
            url: '/basic/grid-system'
          },
          {
            id: 'progress',
            title: 'Progress',
            type: 'item',
            url: '/basic/progress'
          },
          {
            id: 'modal',
            title: 'Modal',
            type: 'item',
            url: '/basic/modal'
          },
          {
            id: 'spinner',
            title: 'Spinner',
            type: 'item',
            url: '/basic/spinner'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/basic/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/basic/typography'
          },
          {
            id: 'tooltip-popovers',
            title: 'Tooltip & Popovers',
            type: 'item',
            url: '/basic/tooltip-popovers'
          },
          {
            id: 'other',
            title: 'Parametrage',
            type: 'item',
            url: '/basic/other'
          }
        ]
      },
      {
        id: 'forms-element',
        title: 'Form Elements',
        type: 'item',
        url: '/forms/basic',
        icon: 'feather icon-file-text'
      }
    ]
  },
  {
    id: 'table',
    title: 'Table & Charts',
    type: 'group',
    icon: 'feather icon-list',
    children: [
      {
        id: 'bootstrap',
        title: 'Bootstrap Table',
        type: 'item',
        url: '/tbl-bootstrap/bt-basic',
        icon: 'feather icon-server'
      },
      {
        id: 'apex',
        title: 'Apex Chart',
        type: 'item',
        url: '/charts/apex',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'Presence et Congé',
    title: 'Ressource Humaine',
    type: 'group',
    icon: 'feather icon-users', // changé depuis 'file-text'
    children: [
      {
        id: 'auth',
        title: 'Gestion Ressource Humaine',
        type: 'collapse',
        icon: 'feather icon-user-check', // changé depuis 'lock'
        children: [
          {
            id: 'ressource humaine',
            title: 'Ressource Humaine',
            type: 'item',
            url: '/home/ressourcehumaine',
            breadcrumbs: false
          }
        ]
      }
    ]
  },
  {
    id: 'comptable',
    title: 'Comptable',
    type: 'group',
    icon: 'feather icon-briefcase',
    children: [
      {
        id: 'auth',
        title: 'Comptable',
        type: 'collapse',
        icon: 'feather icon-file-text', // remplace par une icône visible
        children: [
          {
            id: 'comptable',
            title: 'Affiche Comptable',
            type: 'item',
            url: '/home/comptable',
            breadcrumbs: false,
            external: true

          }
        ]
      }
    ]
  },
  


  {
    id: 'Presence et Congé',
    title: 'Presence',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Gestion des Saisie des heures ',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
       {
  id: 'saisiheure',
  title: 'Saisie des heures',
  type: 'item',
  url: '/home/saisiheure',
  breadcrumbs: false
},
{
  id: 'Validation ',
  title: 'Validation de pointage ',
  type: 'item',
  url: '/home/validationpointage',
  breadcrumbs: false
}, 
{
  id: 'mensuelle ',
  title: 'Presence Mensuelle ',
  type: 'item',
  url: '/home/presencemensuelle',
  breadcrumbs: false
}, 
        ]
      },
      



      {
        id: 'maintenance',
        title: 'Gestion des Congé',
        type: 'collapse',
        icon: 'feather icon-sliders',
        children: [
          {
            id: 'error',
            title: 'Error',
            type: 'item',
            url: '/maintenance/error',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'coming-soon',
            title: 'Maintenance',
            type: 'item',
            url: '/maintenance/coming-soon',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },



  {
    id: 'projet',
    title: 'Projet',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Gestion de projet  ',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
       {
  id: 'saisiheure',
  title: 'Gestion de projet Global ',
  type: 'item',
  url: '/home/projetglobal',
  breadcrumbs: false
},
{
  id: 'Validation ',
  title: 'Gestion de projet Detaillé ',
  type: 'item',
  url: '/home/projetdetaille',
  breadcrumbs: false
}, 
        ]
      },
      
    ]
  },



  
  {
    id: 'pages',
    title: 'Pages',
    type: 'group',
    icon: 'feather icon-file-text',
    children: [
      {
        id: 'auth',
        title: 'Authentication',
        type: 'collapse',
        icon: 'feather icon-lock',
        children: [
          {
            id: 'signup',
            title: 'Sign up',
            type: 'item',
            url: '/auth/signup',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'signin',
            title: 'Sign in',
            type: 'item',
            url: '/auth/signin',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'reset-password',
            title: 'Reset Password',
            type: 'item',
            url: '/auth/reset-password',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'change-password',
            title: 'Change Password',
            type: 'item',
            url: '/auth/change-password',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        type: 'collapse',
        icon: 'feather icon-sliders',
        children: [
          {
            id: 'error',
            title: 'Error',
            type: 'item',
            url: '/maintenance/error',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'coming-soon',
            title: 'Maintenance',
            type: 'item',
            url: '/maintenance/coming-soon',
            target: true,
            breadcrumbs: false
          }
        ]
      }
    ]
  },
  {
    id: 'other',
    title: 'Parametrage',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'menu-level',
        title: 'Parametrage',
        type: 'collapse',
        icon: 'feather icon-menu',
        children: [
          {
            id: 'menu-level-2.1',
            title: 'Type projet',
            type: 'item',
            url: '/home/typeprojet',
            external: true
          },
          {
            id: 'menu-level-2.2',
            title: 'Nature Projet',
            type: 'collapse',
            children: [
              {
                id: 'menu-level-2.2.1',
                title: 'Menu Level 2.2.1',
                type: 'item',
                url: '/home/natureprojet',
                external: true
              },
              {
                id: 'menu-level-2.2.2',
                title: 'Menu Level 2.2.2',
                type: 'item',
                url: 'javascript:',
                external: true
              }
            ]
          }, 
          {
            id: 'menu-level-2.3',
            title: 'Nature Job ',
            type: 'item',
            url: '/home/naturejob',
            external: true
          },
          {
            id: 'menu-level-2.4',
            title: 'Priorite ',
            type: 'item',
            url: '/home/priorite',
            external: true
          },
          {
            id: 'menu-level-2.5',
            title: 'Nature Structure ',
            type: 'item',
            url: '/home/naturestructure',
            external: true
          },
          {
            id: 'menu-level-2.6',
            title: 'Nature Relation ',
            type: 'item',
            url: '/home/naturerelation',
            external: true
          },
          {
            id: 'Statut',
            title: 'Statut ',
            type: 'item',
            url: '/home/statut',
            external: true
          },
          {
            id: 'menu-level-2.7',
            title: ' Relation Projet',
            type: 'item',
            url: '/home/relationprojet',
            external: true
          },
           {
            id: 'menu-level-2.8',
            title: 'Groupe Ressource ',
            type: 'item',
            url: '/home/grouperessource',
            external: true
          },
          {
            id: 'menu-level-2.9',
            title: 'Type Equipement ',
            type: 'item',
            url: '/home/typeequipement',
            external: true
          },
          {
            id: 'menu-level-2.10',
            title: 'Type Ressource ',
            type: 'item',
            url: '/home/typeressource',
            external: true
          },

        ]
      },
      {
        id: 'disabled-menu',
        title: 'Disabled Menu',
        type: 'item',
        url: 'javascript:',
        classes: 'nav-item disabled',
        icon: 'feather icon-power',
        external: true
      },
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
