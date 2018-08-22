<template>
  <div class="content">
    <div class="md-layout">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <loader v-if="loading"></loader>

      <div class="md-layout-item md-size-100" v-else="">
        <v-data-table
                :headers="headers"
                :items="evaluations"
                :loading="loading"
                :no-data-text="'No hay evaluaciones que mostrar'"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left" v-if="typeof props.item.unit == 'string'">{{ props.item.unit }}</td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.team_work"></md-icon>
              <md-icon class="fa fa-thumbs-down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.timings"></md-icon>
              <md-icon class="fa fa-thumbs-down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.presentation"></md-icon>
              <md-icon class="fa fa-thumbs-down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.excellence"></md-icon>
              <md-icon class="fa fa-thumbs-down" v-else></md-icon>
            </td>
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
        {text: 'Unidad', value: 'unit', align: 'left'},
        {text: 'Trabajo en Equipo', value: 'team_work', align: 'left'},
        {text: 'Tiempo', value: 'timings', align: 'left'},
        {text: 'Presentación', value: 'presentation', align: 'left'},
        {text: 'Excelencia', value: 'excellence', align: 'left'}
      ]
    }
  },
  watch: {
    evaluations: function (newval) {
      newval.forEach((evaluation, index, array) => {
        this.processed++
        evaluation.unit.get().then(data => {
          evaluation.unit = data.data().name
        })
        this.turnOffloader(array.length)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>
