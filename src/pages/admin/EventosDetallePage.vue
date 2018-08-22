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
        </div>
    </div>
</template>

<script>
import ActividadesTable from '@/components/Tables/ActividadesTable'
import Card from '@/components/Cards/Card'
import {db} from '@/main'

export default {
  name: 'eventos-detalle-page',
  components: {Card, ActividadesTable},
  data () {
    return {
      event: db.collection('events').doc(this.$route.params.id),
      activities: [],
      currentEvent: null
    }
  },
  mounted () {
    this.loading = true
    db.collection('activities').where('event', '==', this.event).onSnapshot(snapshot => {
      this.activities = []

      this.event.get().then(value => {
        this.currentEvent = value.data()
      })

      snapshot.forEach(snapItem => {
        var activity = snapItem.data()
        activity.id = snapItem.id
        this.activities.push(activity)
      })
      this.loading = false
    })
  }
}
</script>
