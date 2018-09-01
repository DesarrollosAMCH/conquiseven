<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-size-33">
                <card :event="currentEvent" />
            </div>
            <div class="md-layout-item md-medium-size-100 md-size-66">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Actividades</h4>
                    </md-card-header>
                    <md-card-content>
                        <actividades-table :activities="activities"></actividades-table>
                    </md-card-content>
                </md-card>
            </div>
            <div class="md-layout-item md-medium-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Unidades</h4>
                    </md-card-header>
                    <md-card-content>
                        <loader v-if="loading" />
                        <unidades-table :units="units" :totalRows="unitsCount" v-else></unidades-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import ActividadesTable from '@/components/Tables/ActividadesTable'
import Card from '@/components/Cards/Card'
import {db} from '@/main'
import Loader from '@/components/Utils/Loader'
import UnidadesTable from '@/components/Tables/UnidadesEvaluadasTable.vue'

export default {
  name: 'eventos-detalle-page',
  components: {
    Loader,
    UnidadesTable,
    Card,
    ActividadesTable
  },
  data () {
    return {
      loading: false,
      event: db.collection('events').doc(this.$route.params.id),
      activities: [],
      units: [],
      currentEvent: null,
      unitsCount: 1
    }
  },
  methods: {
    calculateScore: function (evaluation) {
      let points = {
        team_work: 20,
        presentation: 10,
        excellence: 45,
        timings: 25
      }

      let score = 0
      for (let item in evaluation) {
        if (typeof evaluation[item] === 'boolean') {
          if (evaluation[item]) {
            score += points[item]
          }
        }
      }
      return score
    }
  },
  mounted () {
    // this.loading = true
    db.collection('activities').where('event', '==', this.event).onSnapshot(snapshot => {
      this.activities = []

      this.event.get().then(value => {
        this.currentEvent = value.data()
      })

      snapshot.forEach(snapItem => {
        var activity = snapItem.data()
        activity.id = snapItem.id
        activity.name = activity.name.replace(/\b\w/g, l => l.toUpperCase())

        let actividad = db.collection('activities').doc(activity.id)
        db.collection('evaluations').where('activity', '==', actividad).onSnapshot(snapshot => {
          activity.count_evaluations = snapshot.docs.length
        })
        this.activities.push(activity)
      })
    })

    db.collection('unitsInEvents').where('event', '==', this.event).orderBy('clubName').onSnapshot(snapshot => {
      this.unitsCount = snapshot.docs.length

      this.units = []
      console.log('unitEvents')
      console.log(snapshot)
      snapshot.forEach(snapItem => {
        var relation = snapItem.data()
        var unit = relation.unit

        unit.get().then(snapItemx => {
          let unitData = snapItemx.data()
          unitData.id = snapItemx.id
          let evaluations = []
          unitData.score = 0
          db.collection('evaluations').where('unit', '==', relation.unit).onSnapshot(snapshoty => {
            let evalCount = snapshoty.docs.length
            snapshoty.forEach(snapItemy => {
              let data = snapItemy.data()
              unitData.score += this.calculateScore(data)
              unitData.evalCount = evalCount
              db.collection('activities').doc(data.activity.id).get().then(snpachotv => {
                let activity = snpachotv.data()
                evaluations.push({
                  id: snapItemy.id,
                  activityName: activity.name,
                  presentation: data.presentation,
                  team_work: data.team_work,
                  timings: data.timings,
                  excellence: data.excellence
                })
              })
            })
          })
          unitData.evaluations = evaluations
          // console.log(unitData)
          this.units.push(unitData)
        })
      })
    })
  }
}
</script>
