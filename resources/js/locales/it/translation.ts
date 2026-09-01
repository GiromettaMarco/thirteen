export default {
  account: 'Account',
  actions: {
    add: 'Aggiungi',
    cancel: 'Annulla',
    close: 'Chiudi',
    delete: 'Elimina',
    edit: 'Modifica',
    leave: 'Abbandona',
    remove: 'Rimuovi',
    reset: 'Reset',
    save: 'Salva',
    search: 'Cerca',
    select: 'Seleziona',
    send: 'Invia',
    show: 'Mostra',
    submit: 'Invia'
  },
  appearance: {
    appearance: 'Aspetto',
    change: 'Cambia aspetto',
    dark: 'Scuro',
    light: 'Chiaro',
    select: 'Select appearance',
    system: 'Sistema',
    theme: 'Tema'
  },
  auth: {
    confirmPassword: 'Conferma password',
    currentPassword: 'Password attuale',
    newPassword: 'Nuova Password',
    password: 'Password',
    requirements: {
      hasLength: 'Almeno 12 caratteri',
      hasLowercase: 'Almeno una lettera minuscola',
      hasNumber: 'Almeno un numero',
      hasSymbol: 'Almeno un simbolo',
      hasUppercase: 'Almeno una lettera maiuscola',
      p: 'Deve contenere:'
    },
    signIn: 'Accedi',
    signOut: 'Esci'
  },
  dashboard: 'Dashboard',
  date: 'Data',
  dateCreated: 'Date creazione',
  dateModified: 'Ultima modifica',
  description: 'Descrizione',
  dialogs: {
    deleteAccount: {
      description:
        'Una volta eliminato il tuo account, anche tutte le sue risorse e i suoi dati verranno eliminati definitivamente. Inserisci la tua password per confermare che desideri eliminare definitivamente il tuo account.',
      title: 'Sei sicuro di voler eliminare il tuo account?',
      trigger: 'Elimina account'
    },
    deleteMany: { description: 'Stai per cancellare i seguenti elementi:' },
    deleteManyTasks: {
      title: 'Sei sicuro di voler eliminare i compiti selezionati?'
    },
    deleteProject: {
      description: 'Stai per cancellare il progetto "{{project}}".',
      title: 'Sei sicuro di voler eliminare il progetto?',
      warn: 'Tutti i compiti correlati andranno persi per sempre.'
    },
    deleteSessions: {
      description:
        'Inserisci la tua password per confermare che desideri disconnetterti dalle altre sessioni del browser su tutti i tuoi dispositivi.',
      title: 'Eliminare le altre sessioni del browser?',
      trigger: 'Disconnetti altre sessioni del browser'
    },
    deleteTask: {
      description: 'Stai per cancellare il compito "{{task}}".',
      title: 'Sei sicuro di voler eliminare questo compito?'
    },
    deleteTeam: {
      description: 'Stai per cancellare il team "{{team}}".',
      title: 'Sei sicuro di voler eliminare il team?',
      warn: 'Tutte le risorse correlate (progetti, compiti...) andranno perse per sempre.'
    },
    leaveTeam: {
      description: 'Stai per lasciare il team "{{team}}".',
      title: 'Sei sicuro di voler abbandonare il team?'
    },
    removeMember: {
      description: 'Stai per rimuovere "{{member}}" dal team.',
      title: 'Sei sicuro di voler rimuovere il membro del team?'
    }
  },
  emailAddress: 'Indirizzo email',
  fullName: 'Nome completo',
  help: 'Chiedi Aiuto',
  homepage: 'Pagina iniziale',
  invitation_one: 'Invito',
  invitation_other: 'Inviti',
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
  member_one: 'Membro',
  member_other: 'Membri',
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
      confirmPassword: {
        h1: 'Conferma la tua password',
        p: "Questa è un'area protetta dell'applicazione. Conferma la password prima di continuare.",
        title: 'Conferma password'
      },
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
        submit: "Invia nuovamente l'email di verifica",
        title: 'Verifica email'
      }
    },
    dashboard: {
      account: {
        delete: {
          h2: 'Elimina account',
          info: 'Si prega di procedere con cautela, questa operazione non può essere annullata.',
          p: 'Elimina il tuo account e tutte le sue risorse'
        },
        email: {
          h2: 'Aggiorna email',
          info: 'Dopo aver inserito un nuovo indirizzo email, dovrai verificarlo prima di poter procedere nella dashboard.',
          p: "Cambia l'indirizzo email del tuo account"
        },
        password: {
          h2: 'Aggiorna la password',
          p: 'Cambia la password del tuo account',
          submit: 'Cambia password'
        },
        sessions: {
          h2: 'Sessioni del Browser',
          info: 'Se necessario, puoi disconnetterti da tutte le altre sessioni del browser su tutti i tuoi dispositivi. Questo elenco potrebbe non essere esaustivo. Se ritieni che il tuo account sia stato compromesso, dovresti anche aggiornare la password.',
          lastActive: 'Ultima attività',
          p: 'Gestisci e disconnetti le tue sessioni attive su altri browser e dispositivi.',
          thisDevice: 'Questo dispositivo'
        },
        title: 'Account'
      },
      invitations: {
        first: 'Primo invito',
        last: 'Ultimo invito',
        pending: {
          h2: 'Inviti pendenti',
          p: 'Lista degli utenti che non hanno ancora accettato il loro invito.'
        },
        renew: 'Rinnova',
        revoke: 'Revoca',
        send: {
          h2: 'Invita un nuovo utente',
          p: "Crea un nuovo utente ed invia una email d'invito.",
          role: 'Seleziona un ruolo'
        },
        teams: 'Puoi già assegnare il nuovo utente ai seguenti team:',
        title: 'Inviti'
      },
      profile: {
        drawer: {
          description:
            'Imposta il nome visualizzato, il ruolo e la visibilità del profilo.',
          title: 'Aggiorna il tuo profilo'
        },
        info: 'Pubblicando il tuo profilo, consentirai agli altri utenti di trovare e leggere le informazioni in esso contenute.',
        public: 'Profilo pubblico',
        title: 'Profilo di {{name}}'
      },
      projects: {
        index: {
          title: 'Progetti'
        }
      },
      settings: {
        appearance: {
          h2: 'Impostazioni aspetto',
          p: "Scegli il tema dell'applicazione o utilizza lo stesso tema del tuo sistema."
        },
        language: {
          h2: 'Impostazioni della lingua',
          p: "Imposta la lingua dell'applicazione."
        },
        title: 'Impostazioni'
      }
    },
    errors: {
      e403: {
        h1: 'Accesso vietato',
        p: "Non hai l'autorizzazione per accedere a questa risorsa.",
        title: '403 Forbidden'
      },
      e404: {
        h1: 'Pagina non trovata',
        p: 'Non è stato possibile trovare la risorsa che stavi cercando.',
        title: '404 Page Not Found'
      },
      e429: {
        h1: 'Troppe richieste',
        p: 'Hai superato il numero massimo di richieste. Riprova più tardi.',
        title: '429 Too Many Requests'
      },
      unknown: {
        h1: 'Errore sconosciuto',
        p: 'Si è verificato un errore inaspettato, riprova più tardi.',
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
  profile: 'Profilo',
  project_one: 'Progetto',
  project_other: 'Progetti',
  projects: {
    chartText: 'Compiti raggruppati per stato e priorità',
    createInstructions: 'Inizia un nuovo progetto.',
    createProject: 'Crea Progetto',
    deadline: 'Deadline',
    deadlineBy_one: 'Deadline scaduta ieri',
    deadlineBy_other: 'Deadline scaduta {{count}} giorni fa',
    deadlineBy_zero: 'Deadline oggi',
    deadlineIn_one: 'Deadline domani',
    deadlineIn_other: 'Deadline in {{count}} giorni',
    deadlineIn_zero: 'Deadline oggi',
    defaultName: 'Nuovo progetto',
    deleteManyDialog: {
      title: 'Sei sicuro di voler eliminare i progetti selezionati?'
    },
    descriptionPlaceholder:
      'Facoltativo, breve testo descrittivo del progetto.',
    emptyTable: {
      line1: 'Non hai ancora creato alcun progetto.',
      line2: 'Inizia creando il tuo primo progetto.',
      title: 'Ancora nessun progetto'
    },
    namePlaceholder: 'Nome del progetto',
    newProject: 'Nuovo progetto',
    projectDescription: 'Descrizione del progetto'
  },
  role: 'Ruolo',
  roles: {
    designer: 'Designer',
    developer: 'Sviluppatore',
    guest: 'Ospite',
    manager: 'Project Manager'
  },
  settings: 'Impostazioni',
  sidebar: {
    mobile: 'Visualizza la sidebar mobile.',
    sidebar: 'Sidebar',
    toggle: 'Attiva/disattiva Sidebar'
  },
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
    assignedTo: 'Assegnato a',
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
    label: 'Etichetta',
    labels: {
      bug: 'Bug',
      documentation: 'Documentazione',
      feature: 'Feature',
      none: 'nessuna'
    },
    namePlaceholder: 'Nome del compito',
    newTask: 'New task',
    priorities: {
      high: 'Alta',
      low: 'Bassa',
      medium: 'Media'
    },
    priority: 'Priorità',
    selectLabel: 'Seleziona una etichetta',
    selectPriority: 'Seleziona una priorità',
    selectStatus: 'Seleziona uno stato',
    selectUser: 'Seleziona un membro del team',
    status: 'Stato',
    statuses: {
      backlog: 'Backlog',
      canceled: 'Cancellato',
      done: 'Fatto',
      inProgress: 'In Corso',
      todo: 'Da Fare'
    },
    taskDescription: 'Descrizione del compito'
  },
  team_one: 'Team',
  team_other: 'Teams',
  teamPermission_one: 'Permesso del Team',
  teamPermission_other: 'Permessi del Team',
  teamPermissions: {
    admin: 'Amministratore',
    canDeleteTeam: 'Può cancellare il team',
    canEditMembers: 'Può modificare i membri del team',
    canEditProjects: 'Può modificare progetti e compiti correlati',
    canEditTeam: 'Può modificare il team',
    short: {
      admin: 'admin',
      canDeleteTeam: 'cancella',
      canEditMembers: 'membri',
      canEditProjects: 'progetti',
      canEditTeam: 'modifica'
    }
  },
  teams: {
    actions: 'Azioni del team "{{team}}"',
    createDesc: 'Inserisci il nome del team per creare un nuovo team.',
    createTeam: 'Crea Team',
    createTitle: 'Nuovo team',
    defaultName: 'Nuovo team',
    empty: {
      line1: 'Non hai ancora creato alcun team.',
      line2: 'Inizia creando il tuo primo team.',
      title: 'Ancora nessun team'
    },
    members: {
      actions: 'Azioni del membro "{{member}}"',
      add: {
        description:
          'Cerca e aggiungi nuovi utenti per nome o indirizzo email.',
        instructions:
          'Cerca un utente, poi clicca sul suo nome per selezionarlo.',
        nameOrEmail: 'Nome o email',
        title: 'Aggiungi nuovi membri al team'
      }
    },
    namePlaceholder: 'Nome del team',
    setCurrent: 'Imposta "{{team}}" come team corrente',
    teamMembers: 'Membri del team',
    title: 'Gestione dei team',
    updateDesc: 'Aggiorna le informazioni del team'
  },
  user_one: 'Utente',
  user_other: 'Utenti',
  userMenu: 'Menù Utente',
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
    }
  }
} as const
