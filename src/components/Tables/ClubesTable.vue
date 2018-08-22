<template>
  <div>

    <loader v-if="loading"></loader>

    <md-table v-model="clubes" :table-header-color="tableHeaderColor" v-else>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nombre">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Unidades">{{ item.units_count }}</md-table-cell>
        <md-table-cell v-if="typeof item.zone == 'string'" md-label="Zona">{{ item.zone }}</md-table-cell>
        <md-table-cell md-label="Activo">
          <md-icon v-if="item.active">check</md-icon>
          <md-icon v-else>close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Acciones" >
          <a v-for="action in item.actions" v-bind:key='action.name' @click="redirect(action.url)" v-bind:href="'clubes/' + action.url" :title="'Mirar '+item.name">
            <md-icon>remove_red_eye</md-icon>
          </a>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Loader from '@/components//Utils/Loader'
import tableUtilsMixin from '@/mixins/tableUtilsMixin'

export default {
  components: {Loader},
  mixins: [tableUtilsMixin],
  name: 'clubes-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    clubes: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  watch: {
    clubes: function (newval) {
      newval.forEach((club, index, array) => {
        this.processed++
        club.zone.get().then(data => {
          club.zone = data.data().name
        })
        this.turnOffloader(array.length)
      })
    }
  }
}
</script>
