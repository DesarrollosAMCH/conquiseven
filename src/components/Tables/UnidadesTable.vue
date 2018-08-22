<template>
  <div>

    <loader v-if="loading" />

    <md-table v-model="units" :table-header-color="tableHeaderColor" v-else>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Unidad">{{ item.name }}</md-table-cell>
        <!--<md-table-cell md-label="Fuerza">{{ item.members }}</md-table-cell>-->
        <md-table-cell md-label="Club">{{ item.clubName }}</md-table-cell>
        <md-table-cell md-label="Zona">{{ item.zoneName }}</md-table-cell>
        <md-table-cell md-label="Activo">
          <a>
            <md-icon v-if="item.active">check</md-icon>
            <md-icon v-else>close</md-icon>
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
  name: 'unidades-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    units: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  }
}
</script>
