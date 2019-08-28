<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Evaluaciones de: {{ actividad.name }}</h4>
                        <p class="category">{{ actividad.description }}.</p>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-100">
                                <evaluaciones-table v-bind:evaluations="evaluations"></evaluaciones-table>
                            </div>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <md-snackbar :md-duration="10000" :md-active.sync="showSnackbar" md-persistent>
            <span>
                <md-icon class="md-size-2x" style="color: #4caf50">verified_user</md-icon>
                Felicidades!!. La unidad ya fue evaluada.
            </span>
        </md-snackbar>
    </div>
</template>

<script>
import {db} from '@/main'
import EvaluacionesTable from '@/components/Tables/EvaluacionesTable'

export default {
  components: {EvaluacionesTable},
  name: '',
  data () {
    return {
      showSnackbar: false,
      actividad: this.getActividad(),
      activities: [],
      evaluations: []
    }
  },
  mounted () {
    this.loading = true
    // console.log('actividad', this.actividad)
    let count_evaluations = 0
    /*
    db.collection('activities').orderBy('order').onSnapshot(snapshot => {
      this.activities = []
      snapshot.forEach(snapItem => {
        const item = snapItem.data()
        let activity = {
          id: snapItem.id,
          name: item.name
        }

        db.collection('evaluations').where('activity', '==', snapItem).onSnapshot(snapshot => {
           activity.count_evaluations = snapshot.docs.length
        })
      })
    })
    */


    db.collection('evaluations').where('activity', '==', '/activities/'+this.actividad.id).onSnapshot(snapshot => {
      count_evaluations = snapshot.docs.length

      snapshot.forEach(snapItem => {
        const item = snapItem.data()
        // console.log('evaluation', item)
        this.evaluations.push(item)
      })

    })
  },
  methods: {
    getActividad () {
      let exists = localStorage.getItem('defaultActivity')
      if (exists) {
        return JSON.parse(exists)
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
</style>
