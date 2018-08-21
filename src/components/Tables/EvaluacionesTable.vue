<template>
  <div>
    <div>

      <loader v-if="loading"></loader>

      <div class="md-layout-item md-size-100" v-else="">
        <v-data-table
                :headers="headers"
                :items="evaluations"
                :loading="loading"
                :no-data-text="'No hay evaluaciones que mostrar'"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left" v-if="typeof props.item.category == 'string'">{{ props.item.category }}</td>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Utils/Loader'
import tableUtilsMixin from '@/mixins/tableUtilsMixin'

export default {
  name: 'evaluaciones-table',
  mixins: [tableUtilsMixin],
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    evaluations: {
      type: Array
    }
  },
  components: {Loader},
  data () {
    return {
      headers: [
        {text: 'Unidad', value: 'name', align: 'left'},
        {text: 'Trabajo en Equipo', value: 'team_work', align: 'left'},
        {text: 'Tiempo', value: 'timings', align: 'left'},
        {text: 'Presentación', value: 'presentation', align: 'left'},
        {text: 'Excelencia', value: 'excellence', align: 'left'}
      ]
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>
