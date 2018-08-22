<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Unidades</h4>
                        <p class="category">Unidades del club {{ clubName }}</p>
                    </md-card-header>
                    <md-card-content>
                        <unidades-table v-if="units.length" v-bind:units="units"></unidades-table>

                        <div v-else class="alert alert-warning alert-with-icon" data-notify="container">
                            <button type="button" aria-hidden="true" class="close">×</button>
                            <i data-notify="icon" class="material-icons">add_alert</i>
                            <span data-notify="message">Este club no tiene unidades registradas.</span>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import UnidadesTable from '@/components/Tables/UnidadesTable'
import {db} from '@/main'

export default {
  components: {UnidadesTable},
  name: 'unidades-page',
  data () {
    return {
      club: db.collection('clubs').doc(this.$route.params.id),
      clubName: '',
      units: []
    }
  },
  mounted () {
    db.collection('units').where('club', '==', this.club).onSnapshot(snapshot => {
      this.units = []

      this.club.get().then(value => {
        this.clubName = value.data().name
      })

      snapshot.forEach(snapItem => {
        this.units.push(snapItem.data())
      })
    })
  }
}
</script>
