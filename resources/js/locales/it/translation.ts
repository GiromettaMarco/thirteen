export default {
  account: 'Account',
  add: 'Aggiungi',
  appearance: {
    appearance: 'Aspetto',
    change: 'Cambia aspetto',
    dark: 'Scuro',
    light: 'Chiaro',
    theme: 'Tema',
    select: 'Select appearance',
    system: 'Sistema'
  },
  assignedTo: 'Assegnato a',
  auth: {
    confirmPassword: 'Conferma password',
    currentPassword: 'Password attuale',
    password: 'Password',
    signIn: 'Accedi',
    signOut: 'Esci'
  },
  cancel: 'Annulla',
  close: 'Chiudi',
  dashboard: 'Dashboard',
  date: 'Data',
  dateCreated: 'Date creazione',
  dateModified: 'Ultima modifica',
  delete: 'Elimina',
  description: 'Descrizione',
  edit: 'Modifica',
  emailAddress: 'Indirizzo email',
  employee_one: 'Impiegato',
  employee_other: 'Impiegati',
  employment: 'Impiego',
  fullName: 'Nome completo',
  help: 'Chiedi Aiuto',
  homepage: 'Pagina iniziale',
  invitation_one: 'Invito',
  invitation_other: 'Inviti',
  invitations: {
    pending: {
      title: 'Inviti pendenti',
      description:
        'Lista degli utenti che non hanno ancora accettato il loro invito.'
    },
    renew: 'Rinnova',
    send: {
      title: 'Invita un nuovo utente',
      description: "Crea un nuovo utente ed invia una email d'invito."
    }
  },
  label: 'Etichetta',
  labelValue: {
    bug: 'Bug',
    documentation: 'Documentazione',
    feature: 'Feature',
    none: 'nessuna'
  },
  language: {
    change: 'Cambia lingua',
    language: 'Lingua',
    select: 'Seleziona lingua',
    system: 'Sistema'
  },
  loading: 'Caricamento...',
  logout: 'Log out',
  management: 'Gestione',
  manager: 'Manager',
  manageTeams: 'Gestisci i Team',
  more: 'Altro',
  name: 'Nome',
  noCurrentTeam: {
    dashboard:
      'Non hai ancora un "team corrente". Puoi creare nuovi team e impostare il tuo team corrente nella sezione Teams.',
    description: 'Devi creare un team prima di poter gestire i progetti',
    title: 'Nessun team'
  },
  notifications: 'Notifiche',
  openMenu: 'Apri menu',
  pages: {
    auth: {
      forgotPassword: {
        h1: 'Password dimenticata',
        loginCTA: 'Oppure, ritorna al <a>log in</a>',
        p: 'Inserisci la tua email per ricevere un link di reset password',
        submit: 'Invia link di reset password',
        title: 'Password dimenticata'
      },
      login: {
        forgotPasswordCTA: 'Hai dimenticato la password?',
        h1: 'Accedi al tuo account',
        p: 'Inserisci la tua email e la password qui sotto per accedere',
        registerCTA: 'Non hai un account? <a>Iscriviti</a>',
        rememberMe: 'Ricordati di me',
        title: 'Login'
      },
      register: {
        h1: 'Crea un account',
        loginCTA: 'Hai già un account? <a>Log in</a>',
        p: 'Inserisci i tuoi dettagli per creare il tuo account',
        submit: 'Crea account',
        title: 'Registrazione'
      },
      resetPassword: {
        h1: 'Reimposta la password',
        p: 'Inserisci la tua nuova password qui sotto',
        submit: 'Cambia password',
        title: 'Reimposta la password'
      },
      verifyEmail: {
        h1: 'Verifica la tua email',
        p: 'Verifica il tuo indirizzo email cliccando sul link che ti abbiamo appena inviato.',
        title: 'Verifica email',
        submit: "Invia nuovamente l'email di verifica"
      }
    },
    dashboard: {
      account: {
        delete: {
          description: 'Elimina il tuo account e tutte le sue risorse',
          dialog: {
            description:
              'Una volta eliminato il tuo account, anche tutte le sue risorse e i suoi dati verranno eliminati definitivamente. Inserisci la tua password per confermare che desideri eliminare definitivamente il tuo account.',
            title: 'Sei sicuro di voler eliminare il tuo account?',
            trigger: 'Elimina account'
          },
          info: 'Si prega di procedere con cautela, questa operazione non può essere annullata.',
          title: 'Elimina account'
        },
        password: {
          description: 'Cambia la password del tuo account',
          submit: 'Aggiorna',
          title: 'Aggiorna la password'
        },
        sessions: {
          description:
            'Gestisci e disconnetti le tue sessioni attive su altri browser e dispositivi.',
          dialog: {
            description:
              'Inserisci la tua password per confermare che desideri disconnetterti dalle altre sessioni del browser su tutti i tuoi dispositivi.',
            title: 'Eliminare le altre sessioni del browser?',
            trigger: 'Disconnetti altre sessioni del browser'
          },
          info: 'Se necessario, puoi disconnetterti da tutte le altre sessioni del browser su tutti i tuoi dispositivi. Questo elenco potrebbe non essere esaustivo. Se ritieni che il tuo account sia stato compromesso, dovresti anche aggiornare la password.',
          lastActive: 'Ultima attività',
          thisDevice: 'Questo dispositivo',
          title: 'Sessioni del Browser'
        },
        title: 'Aggiorna account',
        update: {
          description:
            "Cambia il nome utente e l'indirizzo email del tuo account",
          info: 'Dopo aver inserito un nuovo indirizzo email, dovrai verificarlo prima di poter procedere nella dashboard.',
          title: 'Aggiorna account'
        }
      },
      invitations: {
        index: {
          title: 'Inviti'
        }
      },
      projects: {
        index: {
          title: 'Progetti'
        }
      },
      settings: {
        appearanceDescription:
          "Scegli il tema dell'applicazione o utilizza lo stesso tema del tuo sistema.",
        appearanceTitle: 'Impostazioni aspetto',
        languageDescription: "Imposta la lingua dell'applicazione.",
        languageTitle: 'Impostazioni della lingua',
        title: 'Impostazioni'
      },
      teams: {
        index: {
          title: 'Gestione dei team'
        }
      }
    },
    errors: {
      e403: {
        description: "Non hai l'autorizzazione per accedere a questa risorsa.",
        title: 'Accesso vietato'
      },
      e404: {
        description:
          'Non è stato possibile trovare la risorsa che stavi cercando.',
        title: 'Pagina non trovata'
      },
      e429: {
        description:
          'Hai superato il numero massimo di richieste. Riprova più tardi.',
        title: 'Troppe richieste'
      },
      unknown: {
        description:
          'Si è verificato un errore inaspettato, riprova più tardi.',
        title: 'Errore sconosciuto'
      }
    },
    public: {
      home: {
        CTA: 'Iniziamo!',
        h1: 'Benvenuto su {{appName}}',
        p: 'Questo è il punto di partenza per il prossimo progetto.',
        stack: 'Lo stack:',
        title: 'Applicazione di esempio con Laravel 13'
      }
    }
  },
  priority: 'Priorità',
  priorityValue: {
    high: 'Alta',
    low: 'Bassa',
    medium: 'Media'
  },
  profile: 'Profilo',
  project_one: 'Progetto',
  project_other: 'Progetti',
  projects: {
    addEmployees: {
      description: 'Assegna un membro del team al progetto.',
      title: 'Aggiungi nuovi impiegati'
    },
    chartText: 'Compiti raggruppati per stato e priorità',
    createInstructions: 'Inizia un nuovo progetto.',
    createProject: 'Crea Progetto',
    deadline: 'Deadline',
    deadlineIn_zero: 'Deadline oggi',
    deadlineIn_one: 'Deadline domani',
    deadlineIn_other: 'Deadline in {{count}} giorni',
    deadlineBy_zero: 'Deadline oggi',
    deadlineBy_one: 'Deadline scaduta ieri',
    deadlineBy_other: 'Deadline scaduta {{count}} giorni fa',
    defaultName: 'Nuovo progetto',
    descriptionPlaceholder:
      'Facoltativo, breve testo descrittivo del progetto.',
    editEmployee: 'Modifica impiego e permessi.',
    emptyTable: {
      line1: 'Non hai ancora creato alcun progetto.',
      line2: 'Inizia creando il tuo primo progetto.',
      title: 'Ancora nessun progetto'
    },
    leave: 'Abbandona',
    namePlaceholder: 'Nome del progetto',
    newProject: 'Nuovo progetto',
    projectDescription: 'Descrizione del progetto'
  },
  remove: 'Rimuovi',
  reset: 'Reset',
  role: 'Ruolo',
  save: 'Salva',
  search: 'Cerca',
  select: 'Seleziona',
  settings: 'Impostazioni',
  status: 'Stato',
  statusValue: {
    backlog: 'Backlog',
    canceled: 'Cancellato',
    done: 'Fatto',
    inProgress: 'In Corso',
    todo: 'Da Fare'
  },
  submit: 'Invia',
  table: {
    Asc: 'Asc',
    asc: 'asc',
    clearFilters: 'Rimuovi filtri',
    columns: 'Colonne',
    Desc: 'Disc',
    desc: 'disc',
    filterSelected_one: '{{count}} selezionato',
    filterSelected_other: '{{count}} selezionati',
    goToFirst: 'Vai alla prima pagina',
    goToLast: "Vai all'ultima pagina",
    goToNext: 'Vai alla prossima pagina',
    goToPrevious: 'Vai alla prossima pagina',
    noResults: 'Nessun risultato.',
    pageOf: 'Pagina {{page}} di {{total}}',
    rowsPerPage: 'Righe per pagina',
    search: 'Ricerca...',
    searchByName: 'Ricerca per nome...',
    selectAll: 'Seleziona tutto',
    selectedRows_one: '{{count}} di {{total}} righe selezionate.',
    selectedRows_other: '{{count}} di {{total}} righe selezionate.',
    selectRow: 'Seleziona riga',
    sorting: 'Ordinamento'
  },
  task_one: 'Compito',
  task_other: 'Compiti',
  tasks: {
    assignToMember: 'Assegna ad un membro del team',
    createInstructions: 'Aggiungi un nuovo compito per questo progetto.',
    createTask: 'Crea Compito',
    defaultName: 'Nuovo compito',
    descriptionPlaceholder:
      "Facoltativo, breve testo descrittivo dell'attività.",
    emptyTable: {
      line1: 'Non hai ancora creato alcun compito.',
      line2: 'Inizia creando il tuo primo compito.',
      title: 'Ancora nessun compito'
    },
    filterTasks: 'Filtra compiti...',
    namePlaceholder: 'Nome del compito',
    newTask: 'New task',
    selectLabel: 'Seleziona una etichetta',
    selectPriority: 'Seleziona una priorità',
    selectStatus: 'Seleziona uno stato',
    selectUser: 'Seleziona un membro del team',
    taskDescription: 'Descrizione del compito'
  },
  team_one: 'Team',
  team_other: 'Teams',
  teams: {
    addMembers: {
      description: 'Cerca e aggiungi nuovi utenti per nome o indirizzo email.',
      instructions:
        'Cerca un utente, poi clicca sul suo nome per selezionarlo.',
      nameOrEmail: 'Nome o email',
      title: 'Aggiungi nuovi membri al team'
    },
    createInstructions: 'Crea un nuovo team.',
    createTeam: 'Crea Team',
    defaultName: 'Nuovo team',
    descriptionPlaceholder: 'Facoltativo, breve testo descrittivo del team.',
    emptyTable: {
      line1: 'Non hai ancora creato alcun team.',
      line2: 'Inizia creando il tuo primo team.',
      title: 'Ancora nessun team'
    },
    leave: 'Abbandona',
    namePlaceholder: 'Nome del team',
    newTeam: 'Nuovo team',
    teamDescription: 'Descrizione del team',
    teamMembers: 'Membri del team'
  },
  user_one: 'Utente',
  user_other: 'Utenti',
  users: {
    deleteUser: 'Cancella Utente',
    profile: {
      activity: {
        description: "Dati relativi all'attività dell'utente.",
        title: 'Attività'
      },
      joined_one: 'Iscritto 1 giorno fa',
      joined_other: 'Iscritto {{count}} giorni fa',
      project_one: 'Impiegato in 1 progetto',
      project_other: 'Impiegato in {{count}} progetti',
      task_one: 'Ha 1 compito assegnato in totale',
      task_other: 'Ha {{count}} compiti assegnati in totale',
      taskDone_one: 'Ha completato 1 compito',
      taskDone_other: 'Ha completato {{count}} compiti',
      taskInProgress_one: 'Sta lavorando a 1 compito',
      taskInProgress_other: 'Sta lavorando a {{count}} compiti',
      taskTodo_one: 'Ha 1 compito in programma',
      taskTodo_other: 'Ha {{count}} compiti in programma',
      team_one: 'Attualmente membro di 1 team',
      team_other: 'Attualmente membro di {{count}} team',
      totalTasks: 'Compiti totali',
      userProfile: {
        description: 'Informazioni profilo di {{name}}',
        title: 'Profilo utente'
      }
    },
    roles: {
      admin: 'Admin',
      editor: 'Editore',
      reader: 'Lettore',
      worker: 'Worker'
    },
    selectRole: 'Seleziona un ruolo'
  }
} as const
