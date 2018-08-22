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
import {db} from '@/main'

export default {
  components: {
    ClubesTable
  },
  name: '',
  data () {
    return {
      clubes: []
    }
  },
  mounted () {
    this.loading = true
    db.collection('clubs').orderBy('name').onSnapshot(snapshot => {
      this.clubes = []
      snapshot.forEach(snapItem => {
        const item = snapItem.data()

        this.clubes.push({
          name: item.name,
          units_count: item.units_count,
          zone: item.zone,
          active: item.active,
          actions: [
            {
              url: snapItem.id,
              title: 'Mirar Club',
              icon: 'remove_red_eye'
            }
          ]
        })
      })
    })
  }
}
</script>
