<template>
  <div>

    <loader v-if="loading" />

    <md-table v-model="events" :table-header-color="tableHeaderColor" v-else>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nombre">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Unidades Registradas">{{ item.units }}</md-table-cell>
        <md-table-cell md-label="Fecha Inicio">{{ item.startDate }}</md-table-cell>
        <md-table-cell md-label="Fecha Termino">{{ item.endDate }}</md-table-cell>
        <md-table-cell md-label="Activo">
          <md-icon v-if="item.active">check</md-icon>
          <md-icon v-else>close</md-icon>
        </md-table-cell>
        <md-table-cell md-label="Acciones" >
          <a v-for="action in item.actions" v-bind:key='action.name' @click="redirect('/eventos/'+action.url)" :title="'Mirar '+item.name">
            <md-icon>remove_red_eye</md-icon>
          </a>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import tableUtilsMixin from '@/mixins/tableUtilsMixin'
import Loader from '@/components/Utils/Loader'

export default {
  components: {Loader},
  mixins: [tableUtilsMixin],
  name: 'eventos-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    events: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {
    events: function (newValue) {
      newValue.forEach((item, index, array) => {
        this.processed++
        this.turnOffloader(array.length)
      })
    }
  }
}
</script>
