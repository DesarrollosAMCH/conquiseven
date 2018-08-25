<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Eventos</h4>
                        <p class="category">Listado de eventos.</p>
                    </md-card-header>
                    <md-card-content>
                        <eventos-table v-bind:events="events"></eventos-table>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import CacheMixin from '@/mixins/cacheMixin'
import EventosTable from '@/components/Tables/EventosTable'
import {db} from '@/main'

export default {
  name: '',
  components: {EventosTable},
  mixins: [CacheMixin],
  data () {
    return {
      events: []
    }
  },
  mounted () {
    this.loading = true
    this.cacheAllData()
    this.getEvents()
  },
  methods: {
    getEvents: function () {
      if (navigator.onLine) {
        db.collection('events').orderBy('name').onSnapshot(snapshot => {
          this.events = []
          snapshot.forEach(snapItem => {
            const item = snapItem.data()
            moment.locale('es')
            this.events.push({
              name: item.name,
              startDate: moment(String(item.startDate)).format('llll'),
              endDate: moment(String(item.endDate)).format('llll'),
              address: item.address,
              active: item.active,
              actions: [
                {
                  url: snapItem.id,
                  title: 'Mirar Evento',
                  icon: 'remove_red_eye'
                }
              ]
            })
          })
        })
      } else {
        this.events = JSON.parse(localStorage.getItem('events'))
      }
    }
  }
}
</script>
