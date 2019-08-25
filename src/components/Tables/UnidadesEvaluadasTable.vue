<template>
  <div v-if="units.length">
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Unidades" md-description="Unidades que participaron" :md-done.sync="first">
        <loader v-if="loading" />
        <v-data-table
                v-else
                :headers="headers"
                :pagination="pagination"
                :rows-per-page-items="[50]"
                default-sort="score:desc"
                :items="units"
                :loading="loading"
                :no-data-text="'No hay actividades que mostrar'"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.code }}</td>
            <td class="text-xs-left">{{ props.item.clubName }}</td>
            <td class="text-xs-left">{{ props.item.zoneName }}</td>
            <td class="text-xs-left">{{ props.item.evalCount }}</td>
            <td class="text-xs-left">{{ props.item.score }}</td>
            <!--<td class="text-xs-left" v-if="typeof props.item.category == 'string'">{{ props.item.category }}</td>-->
            <td class="text-xs-left">
              <a @click="showDetail(props.item.id)" :title="'Ver evaluaciones de la unidad '+props.item.name">
                <md-icon>remove_red_eye</md-icon>
              </a>
            </td>
          </template>
        </v-data-table>
      </md-step>

      <md-step id="second" md-label="Actividades Evaluadas" :md-description="(unit)?unit.name + ' / ' + unit.clubName + ' / ' + unit.score:''" :md-done.sync="second">
        <evaluacionesunidad2-table :evaluations="unit.evaluations" :parentGoBack="goBack" :getParentEvaluation="getEvaluation"></evaluacionesunidad2-table>
        <!--
        <evaluacionesunidad-table :evaluations="unit.evaluations" v-else=""></evaluacionesunidad-table>
        -->
        <md-button @click="goBack('first')">Volver</md-button>
      </md-step>
      <md-step id="third" md-label="Detalle Evaluación" :md-description="(unit)?unit.name + ' / ' + unit.clubName + ' / ' + unit.score:''" :md-done.sync="second">
        <evaluacion-detalle-table v-if="!isEmpty(unit)" :headers="getHeaders()" :evaluations="evaluation"></evaluacion-detalle-table>
        <md-button @click="goBack('second')">Volver</md-button>
      </md-step>
    </md-steppers>

    <!--
    <md-table v-model="units" :table-header-color="tableHeaderColor" v-else>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :id="'code-' + item.id">
        <md-table-cell md-label="Unidad">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Fuerza">{{ item.members }}</md-table-cell>
        <md-table-cell md-label="Club">{{ item.clubName }}</md-table-cell>
        <md-table-cell md-label="Zona">{{ item.zoneName }}</md-table-cell>
        <md-table-cell md-label="Puntaje">{{ item.score }}</md-table-cell>
        <md-table-cell md-label="Detalle">
          <md-button class="md-icon-button">
            <md-icon>remove_red_eye</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    -->

  </div>
</template>

<script>
import tableUtilsMixin from '@/mixins/tableUtilsMixin'
import Loader from '@/components/Utils/Loader'
import EvaluacionesunidadTable from '@/components/Tables/EvaluacionesUnidadTable'
import Evaluacionesunidad2Table from '@/components/Tables/EvaluacionesUnidad2Table'
import EvaluacionDetalleTable from '@/components/Tables/EvaluacionDetalleTable'

export default {
  components: {Loader, EvaluacionesunidadTable, Evaluacionesunidad2Table, EvaluacionDetalleTable},
  mixins: [tableUtilsMixin],
  name: 'unidades-table',
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    totalRows: {
      type: Number,
      default: 0
    },
    units: {
      type: Array,
      default: () => {
        return []
      }
    },
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 35,
      sortBy: 'score',
      totalItems: 0,
      rowsPerPageItems: [30, 20, 50]
    }
  },
  data () {
    return {
      headers: [
        {text: 'Unidad', value: 'unit', align: 'left'},
        {text: 'Código', value: 'code', align: 'left'},
        {text: 'Club', value: 'clubName', align: 'left'},
        {text: 'Zona', value: 'zoneName', align: 'left'},
        {text: 'Eventos', value: 'evalCount', align: 'left'},
        {text: 'Puntaje', value: 'score', align: 'left'}
      ],
      unit: {},
      evaluation: [],
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null
    }
  },
  methods: {
    isEmpty: function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false
        }
      }
      return JSON.stringify(obj) === JSON.stringify({})
    },
    getEvaluation: function (id) {
      this.evaluation = []
      let index = this.lodash.findIndex(this.unit.evaluations, function (o) {
        return o.id === id
      })

      this.evaluation.push(this.unit.evaluations[index])
    },
    getHeaders: function () {
      let headers = []
      headers.push({text: 'Actividad', value: 'activityName', align: 'left'})
      for (var prop in this.evaluation[0]) {
        console.log('element', this.evaluation[0][prop])
        if ((typeof this.evaluation[0][prop] === 'boolean') || (this.evaluation[0][prop] === 'on')) {
          headers.push({text: prop, value: prop, align: 'left', type: 'boolean'})
        }
      }
      headers.push({text: 'Puntaje', value: 'score', align: 'left'})
      return headers
    },
    goBack: function (step) {
      this.active = step
    },
    showDetail (unitId) {
      this.active = 'second'
      this.unit = this.lodash.find(this.units, { id: unitId })
      this.unit.evaluations.forEach(function (key, value) {
        key.headers = []
        for (var prop in key) {
          key.headers.push({text: prop, value: prop, align: 'left'})
        }
      })
    }
  },
  watch: {
    totalRows: function (newVal) {
      // console.log('Total ' + newVal)
    },
    units: function (newVal) {
      return this.lodash.orderBy(newVal, ['clubName'])
    }
  }
}
</script>
