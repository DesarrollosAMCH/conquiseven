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
    calculateScore: function (evaluation, items) {
      let score = 0
      for (let item in items) {
        if (evaluation.hasOwnProperty(item)) {
          // console.log('coincide: ' + evaluation[item])
          // console.log(item)
          // console.log(items[item])
          // console.log(evaluation)
          // console.log('------------------')
          if (evaluation[item] === true || evaluation[item] === 'on') {
            score += Number(items[item])
          }
        }
      }
      return score
    }
  },
  mounted () {
    // this.loading = true

    // To Search Activities with reference Object

    db.collection('activities').where('event', '==', this.event).onSnapshot(snapshot => {


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
    // To Search Activities with id as string
    db.collection('activities').where('event', '==', '/events/' + this.event.id).onSnapshot(snapshot => {

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

      snapshot.forEach(snapItem => {
        var relation = snapItem.data()
        var unit = relation.unit
        unit.get().then(snapItemx => {
          let unitData = snapItemx.data()
          unitData.id = snapItemx.id
          let evaluations = []
          unitData.score = 0
          db.collection('evaluations').where('unit', '==', unit).onSnapshot(snapshoty => {
            let evalCount = snapshoty.docs.length
            snapshoty.forEach(snapItemy => {
              let data = snapItemy.data()
              unitData.evalCount = evalCount
              let activityScore
              db.collection('activities').doc(data.activity.id).get().then(snpachotv => {
                let activity = snpachotv.data()
                activityScore = this.calculateScore(data, activity.items)
                unitData.score += activityScore
                let evaluation = {}
                evaluation.id = snapItemy.id
                evaluation.activityName = activity.name
                evaluation.presentation = data.presentation
                evaluation.score = activityScore
                for (var prop in data) {
                  evaluation[prop] = data[prop]
                }
                evaluations.push(evaluation)
              })
            })
          })
          unitData.evaluations = evaluations
          this.units.push(unitData)
        })
      })
    })
    db.collection('unitsInEvents').where('event', '==', '/events/' + this.event.id).orderBy('clubName').onSnapshot(snapshot => {
      this.unitsCount = snapshot.docs.length

      snapshot.forEach(snapItem => {
        var participation = snapItem.data()
        var split = participation.unit.split('/')
        var unit = split[2]
        db.collection('units').doc(unit).onSnapshot(snapItemx => {
        // unit.get().then(snapItemx => {
          let unitData = snapItemx.data()
          unitData.id = snapItemx.id
          let evaluations = []
          unitData.score = 0
          db.collection('evaluations').where('unit', '==', participation.unit).where('event', '==', participation.event).onSnapshot(snapshoty => {
            let evalCount = snapshoty.docs.length
            snapshoty.forEach(snapItemy => {
              let data = snapItemy.data()
              unitData.evalCount = evalCount
              let activityScore
              let split = data.activity.split('/')
              db.collection('activities').doc(split[2]).get().then(snpachotv => {
                let activity = snpachotv.data()
                activityScore = this.calculateScore(data, activity.items)
                unitData.score += activityScore
                let evaluation = {}
                evaluation.id = snapItemy.id
                evaluation.activityName = activity.name
                evaluation.presentation = data.presentation
                evaluation.score = activityScore
                for (var prop in data) {
                  evaluation[prop] = data[prop]
                }
                evaluations.push(evaluation)
              })
            })
          })
          unitData.evaluations = evaluations
          this.units.push(unitData)
        })
      })
    })

  }
}
</script>
