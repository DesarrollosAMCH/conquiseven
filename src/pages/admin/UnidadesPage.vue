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
import _ from 'vue-lodash'

export default {
  components: {UnidadesTable},
  name: 'unidades-page',
  data () {
    return {
      club: this.getClub(),
      clubName: '',
      units: [],
      relation: {}
    }
  },
  mounted () {
    db.collection('units').where('club', '==', this.club).onSnapshot(snapshot => {
      this.units = []
      this.club.get().then(value => {
        this.clubName = value.data().name
      })

      snapshot.forEach(snapItem => {
        let unit = snapItem.data()
        this.units.push(unit)

        let relation = {}
        relation.event = db.collection('events').doc('LhW02AHCAhl57jRGFefA')
        relation.unit = db.collection('units').doc(snapItem.id)
        relation.unitName = unit.name
        relation.clubName = unit.clubName

        // db.collection('unitsInEvents').doc().set(relation)
      })
    })
  },
  methods: {
    getClub: function () {
      if (navigator.onLine) {
        return db.collection('clubs').doc(this.$route.params.id)
      } else {
        let club = _.find(localStorage.getItem('clubs'), ['id', this.$route.params.id])
        return JSON.parse(club)
      }
    }
  }
}
</script>
