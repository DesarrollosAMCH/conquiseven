<template>
  <div class="content">
    <div class="md-layout">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <loader v-if="loading"></loader>

      <div class="md-layout-item md-size-100" v-else>
        <v-data-table
                v-if="!evaluations.evaluations"
                :headers="headers"
                :items="evaluations"
                :loading="loading"
                :pagination.sync="pagination"
                :no-data-text="'No hay evaluaciones que mostrar'"
                :rows-per-page-items="[50]"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.activityName }}</td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.presentation"></md-icon>
              <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.timings"></md-icon>
              <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.team_work"></md-icon>
              <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
            </td>
            <td class="text-xs-left">
              <md-icon class="fa fa-thumbs-up" v-if="props.item.excellence"></md-icon>
              <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
            </td>
            <td class="text-xs-left">{{ props.item.id }}</td>
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
      pagination: {
        sortBy: 'name'
      },
      headers: [
        {text: 'Actividad', value: 'activityName', align: 'left'},
        {text: 'Participación', value: 'presentation', align: 'left'},
        {text: 'Tiempo', value: 'timings', align: 'left'},
        {text: 'Trabajo en Equipo', value: 'team_work', align: 'left'},
        {text: 'Excelencia', value: 'excellence', align: 'left'},
        {text: 'Evaluación', value: 'id', align: 'left'}
      ],
      headers2: [
        {text: 'Actividad', value: 'activityName', align: 'left'},
        {text: 'Puntaje Parcial', value: 'presentation', align: 'left'}
      ]
    }
  },
  watch: {
    evaluations: function (newval) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
  .down {
    color: #bf360c !important;
  }
</style>
