
module.exports = [
  {
    key: 'pages',
    name: 'Pages',
    icon: 'ios-paper-outline',
    child: [
      // {
      //   key: 'user',
      //   name: 'User Manage',
      //   title: true,
      // },
      {
        key: 'user_maange_page',
        name: 'User Manage Page',
        link: '/app/user',
        icon: 'ios-person',
      },
      // {
      //   key: 'book_page',
      //   name: 'Book Manage',
      //   title: true,
      // },
      {
        key: 'book_manage_page',
        name: 'Book Manage Page',
        link: '/app/book',
        icon: 'ios-book',
      },
     
      
      // {
      //   key: 'dashboard',
      //   name: 'Dashboard',
      //   link: '/app/dashboard',
      //   icon: 'ios-home-outline',
      // },
      // {
      //   key: 'form',
      //   name: 'Form',
      //   link: '/app/form',
      //   icon: 'ios-list-box-outline',
      // },
      // {
      //   key: 'table',
      //   name: 'Table',
      //   link: '/app/table',
      //   icon: 'ios-grid-outline',
      // }
      // {
      //   key: 'maintenance',
      //   name: 'Maintenance',
      //   link: '/maintenance',
      //   icon: 'ios-build-outline'
      // },
      // {
      //   key: 'coming_soon',
      //   name: 'Coming Soon',
      //   link: '/coming-soon',
      //   icon: 'ios-bonfire-outline'
      // },
    ]
  },
  {
    key: 'auth',
    name: 'Auth Page',
    icon: 'ios-contact-outline',
    child: [
      {
        key: 'auth_page',
        name: 'User Authentication',
        title: true,
      },
      {
        key: 'login',
        name: 'Login',
        link: '/login',
        icon: 'ios-person-outline'
      },
      {
        key: 'register',
        name: 'Register',
        link: '/register',
        icon: 'ios-key-outline'
      },
      {
        key: 'reset',
        name: 'Reset Password',
        link: '/reset-password',
        icon: 'ios-undo-outline'
      },
    ]
  },
];
