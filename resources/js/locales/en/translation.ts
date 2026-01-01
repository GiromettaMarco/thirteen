export default {
  account: 'Account',
  add: 'Add',
  appearance: {
    appearance: 'Appearance',
    change: 'Change appearance',
    dark: 'Dark',
    light: 'Light',
    theme: 'Theme',
    select: 'Select appearance',
    system: 'System'
  },
  assignedTo: 'Assigned to',
  auth: {
    confirmNewPassword: 'Confirm new password',
    confirmPassword: 'Confirm password',
    currentPassword: 'Current password',
    login: 'Login',
    newPasword: 'New password',
    password: 'Password'
  },
  cancel: 'Cancel',
  close: 'Close',
  dashboard: 'Dashboard',
  date: 'Date',
  dateCreated: 'Date created',
  dateModified: 'Date modified',
  delete: 'Delete',
  deleteAccount: {
    title: 'Delete account',
    description: 'Delete your account and all of its resources',
    info: 'Please proceed with caution, this cannot be undone.',
    dialog: {
      trigger: 'Delete account',
      title: 'Are you sure you want to delete your account?',
      description:
        'Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.'
    }
  },
  description: 'Description',
  edit: 'Edit',
  emailAddress: 'Email address',
  employee_one: 'Employee',
  employee_other: 'Employees',
  employment: 'Employment',
  fullName: 'Full name',
  help: 'Get Help',
  homepage: 'Homepage',
  invitation_one: 'Invitation',
  invitation_other: 'Invitations',
  invitations: {
    pending: {
      title: 'Pending invitations',
      description: 'List of users who have not yet accepted their invitation.'
    },
    renew: 'Renew',
    send: {
      title: 'Invite a new user',
      description: 'Create a new user and send an invitation email.'
    }
  },
  label: 'Label',
  labelValue: {
    bug: 'Bug',
    documentation: 'Documentation',
    feature: 'Feature',
    none: 'none'
  },
  language: {
    change: 'Change language',
    language: 'Language',
    select: 'Select language',
    system: 'System'
  },
  loading: 'Loading...',
  logout: 'Log out',
  management: 'Management',
  manager: 'Manager',
  manageTeams: 'Manage Teams',
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
      }
    },
    errors: {
      e404: {
        description: 'The resource you were looking for could not be found.',
        title: 'Page not found'
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
  priority: 'Priority',
  priorityValue: {
    high: 'High',
    low: 'Low',
    medium: 'Medium'
  },
  profile: 'Profile',
  project_one: 'Project',
  project_other: 'Projects',
  projects: {
    addEmployees: {
      description: 'Assign a team member to the project.',
      title: 'Add new team employees'
    },
    chartText: 'Tasks grouped by status and priority',
    createInstructions: 'Start a new project.',
    createProject: 'Create Project',
    deadline: 'Deadline',
    deadlineIn_zero: 'Deadline today',
    deadlineIn_one: 'Deadline tomorrow',
    deadlineIn_other: 'Deadline in {{count}} days',
    deadlineBy_zero: 'Deadline today',
    deadlineBy_one: 'Deadline expired yesterday',
    deadlineBy_other: 'Deadline expired {{count}} days ago',
    defaultName: 'New project',
    descriptionPlaceholder: 'Optional, short text describing the project.',
    editEmployee: 'Edit employment and permissions.',
    emptyTable: {
      line1: "You haven't created any project yet.",
      line2: 'Get started by creating your first project.',
      title: 'No Projects yet'
    },
    leave: 'Leave',
    namePlaceholder: 'Project name',
    newProject: 'New project',
    projectDescription: 'Project description'
  },
  remove: 'Remove',
  reset: 'Reset',
  resetPassword: {
    title: 'Reset password',
    description: 'Please enter your new password below',
    submit: 'Reset Password'
  },
  role: 'Role',
  save: 'Save',
  search: 'Search',
  select: 'Select',
  sessions: {
    description:
      'Manage and log out your active sessions on other browsers and devices.',
    dialog: {
      description:
        'Please enter your password to confirm you would like to log out of your other browser sessions across all of your devices.',
      title: 'Delete other browser sessions?',
      trigger: 'Log Out Other Browser Sessions'
    },
    info: 'If necessary, you may log out of all of your other browser sessions across all of your devices. This list may not be exhaustive. If you feel your account has been compromised, you should also update your password.',
    lastActive: 'Last active',
    thisDevice: 'This device',
    title: 'Browser Sessions'
  },
  settings: 'Settings',
  status: 'Status',
  statusValue: {
    backlog: 'Backlog',
    canceled: 'Canceled',
    done: 'Done',
    inProgress: 'In Progress',
    todo: 'To Do'
  },
  submit: 'Submit',
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
    namePlaceholder: 'Task name',
    newTask: 'New task',
    selectLabel: 'Select a label',
    selectPriority: 'Select a priority',
    selectStatus: 'Select a status',
    selectUser: 'Select a team member',
    taskDescription: 'Task description'
  },
  team_one: 'Team',
  team_other: 'Teams',
  teams: {
    addMembers: {
      description: 'Search and add users by name or email address.',
      instructions: 'Search a for a user, then click on its name to select it.',
      nameOrEmail: 'Name or email',
      title: 'Add new team members'
    },
    createInstructions: 'Make a new team.',
    createTeam: 'Create Team',
    defaultName: 'New team',
    descriptionPlaceholder: 'Optional, short text describing the team.',
    emptyTable: {
      line1: "You haven't created any team yet.",
      line2: 'Get started by creating your first team.',
      title: 'No Teams yet'
    },
    leave: 'Leave',
    namePlaceholder: 'Team name',
    newTeam: 'New team',
    teamDescription: 'Team description',
    teamMembers: 'Team members'
  },
  updateAccount: {
    title: 'Update account',
    description: 'Change username and email of your account',
    info: 'After submitting a new email address, you will need to verify it before proceeding further in the dashboard.'
  },
  updateAppearance: {
    title: 'Appearance settings',
    description:
      "Choose the application's theme or use the same theme as your system.",
    select: 'Select appearance'
  },
  updateLanguage: {
    title: 'Language settings',
    description: 'Set the language of the application.',
    select: 'Select a language'
  },
  updatePassword: {
    title: 'Update password',
    description: 'Change the password of your account',
    submit: 'Update password'
  },
  user_one: 'User',
  user_other: 'Users',
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
        description: 'Informations about {{name}}',
        title: 'User profile'
      }
    },
    roles: {
      admin: 'Admin',
      editor: 'Editor',
      reader: 'Reader',
      worker: 'Worker'
    },
    selectRole: 'Select a role'
  },
  verifyEmail: {
    title: 'Verify email',
    description:
      'Please verify your email address by clicking on the link we just emailed to you.',
    submit: 'Resend verification email'
  }
} as const
