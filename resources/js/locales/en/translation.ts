export default {
  account: 'Account',
  actions: {
    add: 'Add',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    edit: 'Edit',
    leave: 'Leave',
    remove: 'Remove',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    send: 'Send',
    show: 'Show',
    submit: 'Submit'
  },
  appearance: {
    appearance: 'Appearance',
    change: 'Change appearance',
    dark: 'Dark',
    light: 'Light',
    select: 'Select appearance',
    system: 'System',
    theme: 'Theme'
  },
  auth: {
    confirmPassword: 'Confirm password',
    currentPassword: 'Current password',
    newPassword: 'New Password',
    password: 'Password',
    requirements: {
      hasLength: 'At least 12 characters',
      hasLowercase: 'At least one lowercase letter',
      hasNumber: 'At least one number',
      hasSymbol: 'At least one symbol',
      hasUppercase: 'At least one uppercase letter',
      p: 'Must contain:'
    },
    signIn: 'Sign In',
    signOut: 'Sign Out'
  },
  dashboard: 'Dashboard',
  date: 'Date',
  dateCreated: 'Date created',
  dateModified: 'Date modified',
  description: 'Description',
  dialogs: {
    deleteAccount: {
      description:
        'Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.',
      title: 'Are you sure you want to delete your account?',
      trigger: 'Delete account'
    },
    deleteMany: {
      description: 'You are about to delete the following items:'
    },
    deleteManyTasks: {
      title: 'Are you sure you want to delete the selected tasks?'
    },
    deleteProject: {
      description: 'You are about to delete the "{{project}}" project.',
      title: 'Are you sure you want to delete the project?',
      warn: 'Any related task will be lost forever.'
    },
    deleteSessions: {
      description:
        'Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.',
      title: 'Delete other browser sessions?',
      trigger: 'Log Out Other Browser Sessions'
    },
    deleteTask: {
      description: 'You are about to delete the "{{task}}" task.',
      title: 'Are you sure you want to delete the task?'
    },
    deleteTeam: {
      description: 'You are about to delete the "{{team}}" team.',
      title: 'Are you sure you want to delete the team?',
      warn: 'Any related resource (projects, tasks...) will be lost forever.'
    },
    leaveTeam: {
      description: 'You are about to leave the team "{{team}}".',
      title: 'Are you sure you want to leave the team?'
    },
    removeMember: {
      description: 'You are about to remove "{{member}}" from the team.',
      title: 'Are you sure you want to remove the team member?'
    }
  },
  emailAddress: 'Email address',
  fullName: 'Full name',
  help: 'Get Help',
  homepage: 'Homepage',
  invitation_one: 'Invitation',
  invitation_other: 'Invitations',
  language: {
    change: 'Change language',
    language: 'Language',
    select: 'Select language',
    system: 'System'
  },
  loading: 'Loading...',
  management: 'Management',
  manager: 'Manager',
  manageTeams: 'Manage Teams',
  member_one: 'Member',
  member_other: 'Members',
  more: 'More',
  name: 'Name',
  noCurrentTeam: {
    dashboard:
      'You don\'t have a "current team" yet. You can create new teams and set your current team in the Teams section.',
    description: 'You must create a team before being able to manage projects',
    title: 'No current team'
  },
  notifications: 'Notifications',
  openMenu: 'Open menu',
  pages: {
    auth: {
      confirmPassword: {
        h1: 'Confirm your password',
        p: 'This is a secure area of the application. Please confirm your password before continuing.',
        title: 'Confirm password'
      },
      forgotPassword: {
        h1: 'Forgot password',
        loginCTA: 'Or, return to <a>log in</a>',
        p: 'Enter your email to receive a password reset link',
        submit: 'Send password reset link',
        title: 'Forgot password'
      },
      login: {
        forgotPasswordCTA: 'Forgot your password?',
        h1: 'Log in to your account',
        p: 'Enter your email and password below to log in',
        registerCTA: "Don't have an account? <a>Sign Up</a>",
        rememberMe: 'Remember me',
        title: 'Login'
      },
      register: {
        h1: 'Create an account',
        loginCTA: 'Already have an account? <a>Log in</a>',
        p: 'Enter your details below to create your account',
        submit: 'Create account',
        title: 'Register'
      },
      resetPassword: {
        h1: 'Reset password',
        p: 'Please enter your new password below',
        submit: 'Reset password',
        title: 'Reset password'
      },
      verifyEmail: {
        h1: 'Verify email',
        p: 'Please verify your email address by clicking on the link we just emailed to you.',
        submit: 'Resend verification email',
        title: 'Email verification'
      }
    },
    dashboard: {
      account: {
        delete: {
          h2: 'Delete account',
          info: 'Please proceed with caution, this cannot be undone.',
          p: 'Delete your account and all of its resources'
        },
        email: {
          h2: 'Update email',
          info: 'After submitting a new email address, you will need to verify it before proceeding further in the dashboard.',
          p: 'Change the email of your account'
        },
        password: {
          h2: 'Update password',
          p: 'Change the password of your account',
          submit: 'Change password'
        },
        sessions: {
          h2: 'Browser Sessions',
          info: 'If necessary, you may log out of all of your other browser sessions across all of your devices. This list may not be exhaustive. If you feel your account has been compromised, you should also update your password.',
          lastActive: 'Last active',
          p: 'Manage and log out your active sessions on other browsers and devices.',
          thisDevice: 'This device'
        },
        title: 'Account'
      },
      index: {
        title: 'Dashboard'
      },
      invitations: {
        first: 'First invitation',
        last: 'Last invitation',
        pending: {
          h2: 'Pending invitations',
          p: 'List of users who have not yet accepted their invitation.'
        },
        renew: 'Renew',
        revoke: 'Revoke',
        send: {
          h2: 'Invite a new user',
          p: 'Create a new user and send an invitation email.',
          role: 'Select a role'
        },
        teams: 'You may already assign the new user to the following teams:',
        title: 'Invitations'
      },
      profile: {
        drawer: {
          description: 'Set your display name, role and profile visibility.',
          title: 'Update your profile'
        },
        info: 'By setting your profile as public, you allow other users to discover and read your profile information.',
        public: 'Public profile',
        title: '{{name}} profile'
      },
      projects: {
        index: {
          title: 'Projects'
        }
      },
      settings: {
        appearance: {
          h2: 'Appearance settings',
          p: "Choose the application's theme or use the same theme as your system."
        },
        language: {
          h2: 'Language settings',
          p: 'Set the language of the application.'
        },
        title: 'Settings'
      }
    },
    errors: {
      e403: {
        h1: 'Forbidden',
        p: "You don't have authorization to access this resource.",
        title: '403 Forbidden'
      },
      e404: {
        h1: 'Page not found',
        p: 'The resource you were looking for could not be found.',
        title: '404 Page Not Found'
      },
      e429: {
        h1: 'Too Many Requests',
        p: 'You have exceeded the maximum number of requests. Please try again later.',
        title: '429 Too Many Requests'
      },
      unknown: {
        h1: 'Unknown error',
        p: 'An unknown error occurred, please try again later.',
        title: 'Unknown Error'
      }
    },
    public: {
      home: {
        CTA: "Let's get started!",
        h1: 'Welcome to {{appName}}',
        p: 'This is the starting point for the next project.',
        stack: 'The stack:',
        title: 'Laravel 13 example application'
      }
    }
  },
  profile: 'Profile',
  project_one: 'Project',
  project_other: 'Projects',
  projects: {
    chartText: 'Tasks grouped by status and priority',
    createInstructions: 'Start a new project.',
    createProject: 'Create Project',
    deadline: 'Deadline',
    deadlineBy_one: 'Deadline expired yesterday',
    deadlineBy_other: 'Deadline expired {{count}} days ago',
    deadlineBy_zero: 'Deadline today',
    deadlineIn_one: 'Deadline tomorrow',
    deadlineIn_other: 'Deadline in {{count}} days',
    deadlineIn_zero: 'Deadline today',
    defaultName: 'New project',
    deleteManyDialog: {
      title: 'Are you sure you want to delete the selected projects?'
    },
    descriptionPlaceholder: 'Optional, short text describing the project.',
    emptyTable: {
      line1: "You haven't created any project yet.",
      line2: 'Get started by creating your first project.',
      title: 'No Projects yet'
    },
    namePlaceholder: 'Project name',
    newProject: 'New project',
    projectDescription: 'Project description'
  },
  role: 'Role',
  roles: {
    designer: 'Designer',
    developer: 'Developer',
    guest: 'Guest',
    manager: 'Project Manager'
  },
  settings: 'Settings',
  sidebar: {
    mobile: 'Displays the mobile sidebar.',
    sidebar: 'Sidebar',
    toggle: 'Toggle Sidebar'
  },
  table: {
    Asc: 'Asc',
    asc: 'asc',
    clearFilters: 'Clear filters',
    columns: 'Columns',
    Desc: 'Desc',
    desc: 'desc',
    filterSelected_one: '{{count}} selected',
    filterSelected_other: '{{count}} selected',
    goToFirst: 'Go to first page',
    goToLast: 'Go to last page',
    goToNext: 'Go to next page',
    goToPrevious: 'Go to previous page',
    noResults: 'No results.',
    pageOf: 'Page {{page}} of {{total}}',
    rowsPerPage: 'Rows per page',
    search: 'Search...',
    searchByName: 'Search by name...',
    selectAll: 'Select all',
    selectedRows_one: '{{count}} of {{total}} row selected.',
    selectedRows_other: '{{count}} of {{total}} rows selected.',
    selectRow: 'Select row',
    sorting: 'Sorting'
  },
  task_one: 'Task',
  task_other: 'Tasks',
  tasks: {
    assignedTo: 'Assigned to',
    assignToMember: 'Assign to a team member',
    createInstructions: 'Add a new task for this project.',
    createTask: 'Create Task',
    defaultName: 'New task',
    descriptionPlaceholder: 'Optional, short text describing the task.',
    emptyTable: {
      line1: "You haven't created any task yet.",
      line2: 'Get started by creating your first task.',
      title: 'No Tasks yet'
    },
    filterTasks: 'Filter tasks...',
    label: 'Label',
    labels: {
      bug: 'Bug',
      documentation: 'Documentation',
      feature: 'Feature',
      none: 'none'
    },
    namePlaceholder: 'Task name',
    newTask: 'New task',
    priorities: {
      high: 'High',
      low: 'Low',
      medium: 'Medium'
    },
    priority: 'Priority',
    selectLabel: 'Select a label',
    selectPriority: 'Select a priority',
    selectStatus: 'Select a status',
    selectUser: 'Select a team member',
    status: 'Status',
    statuses: {
      backlog: 'Backlog',
      canceled: 'Canceled',
      done: 'Done',
      inProgress: 'In Progress',
      todo: 'To Do'
    },
    taskDescription: 'Task description'
  },
  team_one: 'Team',
  team_other: 'Teams',
  teamPermission_one: 'Team Permission',
  teamPermission_other: 'Team Permissions',
  teamPermissions: {
    admin: 'Administrator',
    canDeleteTeam: 'Can delete the team',
    canEditMembers: 'Can edit team members',
    canEditProjects: 'Can edit related projects and tasks',
    canEditTeam: 'Can edit the team',
    short: {
      admin: 'admin',
      canDeleteTeam: 'delete',
      canEditMembers: 'members',
      canEditProjects: 'projects',
      canEditTeam: 'edit'
    }
  },
  teams: {
    actions: 'Team "{{team}}" actions',
    createDesc: 'Insert the team name to create a new team.',
    createTeam: 'Create Team',
    createTitle: 'New team',
    defaultName: 'New team',
    empty: {
      line1: "You haven't created any team yet.",
      line2: 'Get started by creating your first team.',
      title: 'No Teams yet'
    },
    members: {
      actions: 'Member "{{member}}" actions',
      add: {
        description: 'Search and add users by name or email address.',
        instructions: 'Search for a user, then click on its name to select it.',
        nameOrEmail: 'Name or email',
        title: 'Add new team members'
      }
    },
    namePlaceholder: 'Team name',
    setCurrent: 'Set "{{team}}" as current team',
    teamMembers: 'Team members',
    title: 'Teams management',
    updateDesc: 'Update the team information'
  },
  user_one: 'User',
  user_other: 'Users',
  userMenu: 'User Menu',
  users: {
    deleteUser: 'Delete User',
    profile: {
      activity: {
        description: 'Data related to the user activity.',
        title: 'Activity'
      },
      joined_one: 'Joined 1 day ago',
      joined_other: 'Joined {{count}} days ago',
      project_one: 'Employed in 1 project',
      project_other: 'Employed in {{count}} projects',
      task_one: 'Has 1 task assigned in total',
      task_other: 'Has {{count}} tasks assigned in total',
      taskDone_one: 'Has completed 1 task',
      taskDone_other: 'Has completed {{count}} tasks',
      taskInProgress_one: 'Is working on 1 task right now',
      taskInProgress_other: 'Is working on {{count}} tasks right now',
      taskTodo_one: 'Has 1 task on schedule',
      taskTodo_other: 'Has {{count}} tasks on schedule',
      team_one: 'Currently member of 1 team',
      team_other: 'Currently member of {{count}} teams',
      totalTasks: 'Total Tasks',
      userProfile: {
        description: 'Information about {{name}}',
        title: 'User profile'
      }
    }
  }
} as const
