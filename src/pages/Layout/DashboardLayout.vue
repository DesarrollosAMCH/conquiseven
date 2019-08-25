<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <!--
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      -->
      <!--
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Usuarios</p>
      </sidebar-link>

      <sidebar-link to="/clubes">
        <md-icon>content_paste</md-icon>
        <p>Clubes</p>
      </sidebar-link>
      <sidebar-link to="/eventos">
        <md-icon>bubble_chart</md-icon>
        <p>Eventos</p>
      </sidebar-link>
      <sidebar-link to="/evaluar">
        <md-icon>assignment</md-icon>
        <p>Evaluar</p>
      </sidebar-link>
      <sidebar-link :to="'/actividad/' + actividad.id" v-if="actividad !== null">
        <md-icon>library_books</md-icon>
        <p>Evaluaciones</p>
      </sidebar-link>
      -->
      <sidebar-link to="/evaluar-offline/">
        <md-icon>library_books</md-icon>
        <p>Evaluar Offline</p>
      </sidebar-link>
      <!--
      <sidebar-link to="/evaluaciones">
        <md-icon>library_books</md-icon>
        <p>Todas las Evaluaciones</p>
      </sidebar-link>
      -->
      <!--
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      -->
      <sidebar-link class="active-pro" v-if="actividad !== null">
        <a @click="removeDefaultActivity">Cambiar de Actividad</a>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content>

      </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

export default {
  data () {
    return {
      offline: !navigator.onLine,
      actividad: this.$store.state.activity
    }
  },
  mounted () {
    this.$store.commit('setActivity', this.getActividad())
    this.actividad = this.$store.state.activity
  },
  methods: {
    getActividad () {
      let exists = localStorage.getItem('defaultActivity')
      if (exists) {
        return JSON.parse(exists)
      } else {
        return null
      }
    },
    removeDefaultActivity () {
      localStorage.removeItem('defaultActivity')
      this.$store.commit('setActivity', null)
    }
  },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  }
}
</script>

<style>
  li.active-pro>button>div>a{
    margin: 0 auto !important;
    color: red !important;
  }
</style>
