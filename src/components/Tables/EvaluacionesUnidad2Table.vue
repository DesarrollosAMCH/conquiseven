<template>
  <div class="content">
    <div class="md-layout">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <loader v-if="loading"></loader>

      <div class="md-layout-item md-size-100" v-else>
        <v-data-table
                :headers="headers"
                :items="evaluations"
                :loading="loading"
                :pagination.sync="pagination"
                :no-data-text="'No hay evaluaciones que mostrar'"
                :rows-per-page-items="[50]"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.activityName }}</td>
            <td class="text-xs-left">{{ props.item.score }}</td>
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">
              <a @click="showDetail(props.item.id)" :title="'Ver detalle de evaluación para el evento '+props.item.activityName">
                <md-icon>remove_red_eye</md-icon>
              </a>
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
  name: 'evaluaciones2-table',
  mixins: [tableUtilsMixin],
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    evaluations: {
      type: Array
    },
    parentGoBack: '',
    getParentEvaluation: ''
  },
  components: {Loader},
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
      headers: [
        {text: 'Actividad', value: 'activityName', align: 'left'},
        {text: 'Puntaje Parcial', value: 'score', align: 'left'},
        {text: 'Evaluación', value: 'id', align: 'left'},
        {text: 'Ver detalle', align: 'left'}
      ]
    }
  },
  methods: {
    goBack: function (step) {
      this.parentGoBack(step)
    },
    showDetail (id) {
      console.log(id)
      this.parentGoBack('third')
      this.getParentEvaluation(id)
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
