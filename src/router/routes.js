const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ],
  },
  {
    path: '/search',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SearchView.vue') }
    ],
  },
  {
    path: '/library', // 👈 nuova rotta
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LibraryView.vue') } // 👈 nuova pagina
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
