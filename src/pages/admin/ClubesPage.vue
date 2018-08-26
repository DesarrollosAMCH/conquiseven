<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Clubes Registrados</h4>
                        <p class="category">Listado de clubes que han sido registrados en la Asociación Metropolitana</p>
                    </md-card-header>
                    <md-card-content>
                        <clubes-table v-bind:clubes="clubes"></clubes-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import ClubesTable from '@/components/Tables/ClubesTable'
import CacheMixin from '@/mixins/cacheMixin'
import {db} from '@/main'

export default {
  components: {ClubesTable},
  mixins: [CacheMixin],
  name: '',
  data () {
    return {
      clubes: []
    }
  },
  mounted () {
    this.loading = true
    this.cacheAllData()
    this.getClubs()
  },
  methods: {
    getClubs: function () {
      if (navigator.onLine) {
        db.collection('clubs').orderBy('zone').onSnapshot(snapshot => {
          this.clubes = []
          snapshot.forEach(snapItem => {
            const item = snapItem.data()
            let club = {
              id: snapItem.id,
              name: item.name,
              units_count: 0,
              zone: item.zoneName,
              active: item.active,
              actions: [
                {
                  url: snapItem.id,
                  title: 'Mirar Club',
                  icon: 'remove_red_eye'
                }
              ]
            }
            let frClub = db.collection('clubs').doc(club.id)
            db.collection('units').where('club', '==', frClub).onSnapshot(snapshot => {
              club.units_count = snapshot.docs.length
            })

            this.clubes.push(club)
          })
        })
      } else {
        this.clubes = JSON.parse(localStorage.getItem('clubs'))
      }
    }
  }
}
</script>
