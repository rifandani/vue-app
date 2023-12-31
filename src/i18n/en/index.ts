import type { BaseTranslation } from '../i18n-types'

const en = {
  auth: {
    welcome: 'Welcome Back',
    logout: 'Logout',
    logoutUsername: 'Logout ({username:string})',
    registerHere: "Don't have an account? <>Register here<>",
    notFound404: '404: Not Found',
    gone: "It's gone",
    backTo: 'Go back to {isLoggedIn|{true: home, false: login}}'
  },
  home: {
    title: 'Bulletproof Vue 3 Template',
    sortBtn: 'Sort Buttons',
    clock: 'Clock',
    toggleClock: 'Toggle Clock',
    clickToggleClock: 'Click toggle clock to restart the clock',
    changeLang: 'Change Language',
    getStarted: 'Get Started'
  },
  todo: {
    backTo: 'Go back to {target:string}'
  },
  user: {
    preferences: 'Preferences',
    likedTodos: 'Liked todos',
    savedTodos: 'saved todos',
    yourComments: 'Your comments'
  },
  forms: {
    username: 'Username',
    usernamePlaceholder: 'Your username...',
    password: 'Password',
    passwordPlaceholder: 'Your password...',
    error: '{icon:string} Form error',
    loginLoading: 'Logging in...',
    login: 'Login',
    register: 'Register',
    add: 'Add',
    update: 'Update',
    remove: 'Remove',
    limit: 'Limit',
    todoPlaceholder: 'What should you do next...'
  },
  common: {
    loading: 'Loading...',
    list: '{0:string} List',
    xDetail: '{feature:string} Detail',
    xCreateSuccess: '{feature:string} successfully created',
    xCreateError: '{feature:string} failed to create',
    xUpdateSuccess: '{feature:string} successfully updated',
    xUpdateError: '{feature:string} failed to update',
    xDeleteSuccess: '{feature:string} successfully deleted',
    xDeleteError: '{feature:string} failed to delete',
    error: '{module:string|capitalize} error',
    noPageContent: 'No Page Content',
    appName: 'Vue Template',
    theme: 'Theme',
    empty: 'Empty Data',
    unauthorized: 'Unauthorized. Please login first',
    authorized: 'Already authorized',
    unsavedChanges: 'Discard unsaved changes - are you sure?',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    create: 'Create',
    settings: 'Settings',
    account: 'Account'
  },
  success: {
    action: '{module:string} successfully {action:string}'
  },
  error: {
    minLength: '{field:string} must contain at least {length:number} characters',
    passwordMinLength: 'password must contain at least 6 characters',
    action: '{module:string} failed to {action:string}'
  }
} satisfies BaseTranslation

export default en
