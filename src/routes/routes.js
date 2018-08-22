import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'
import UserProfile from '@/pages/UserProfile.vue'
import TableList from '@/pages/TableList.vue'
import Typography from '@/pages/Typography.vue'
import Icons from '@/pages/Icons.vue'
import Maps from '@/pages/Maps.vue'
import Notifications from '@/pages/Notifications.vue'
import UpgradeToPRO from '@/pages/UpgradeToPRO.vue'

import ClubesPage from '@/pages/admin/ClubesPage'
import UnidadesPage from '@/pages/admin/UnidadesPage'
import EventosPage from '@/pages/admin/EventosPage'
import EventosDetallePage from '@/pages/admin/EventosDetallePage'

import EvaluarPage from '@/pages/app/EvaluarPage'
import EvaluarActividadPage from '@/pages/app/EvaluarActividadPage'
import ActividadPage from '@/pages/app/ActividadPage'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/clubes',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'user',
        name: 'User Profile',
        component: UserProfile
      },
      {
        path: 'table',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        meta: {
          hideFooter: true
        },
        component: Maps

      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: UpgradeToPRO
      },
      /**
       * * Admin Routes
       */
      {
        path: 'clubes',
        name: 'Lista de Clubes',
        component: ClubesPage
      },
      {
        path: 'clubes/:id',
        name: 'Unidades',
        component: UnidadesPage
      },
      {
        path: 'eventos',
        name: 'eventos',
        component: EventosPage
      },
      {
        path: 'eventos/:id',
        name: 'Detalle de Evento',
        component: EventosDetallePage
      },
      /**
       * * App Routes
       */
      {
        path: 'evaluar/',
        name: 'Evaluar',
        component: EvaluarPage
      },
      {
        path: 'evaluar/:activity',
        name: 'Evaluar Acividad',
        component: EvaluarActividadPage
      },
      {
        path: 'actividad/:activity',
        name: 'Ver Actividad',
        component: ActividadPage
      }
    ]
  }
]

export default routes
