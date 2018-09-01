<template>
  <div v-if="units.length">
    <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="Unidades" md-description="Todas las unidades que participaron del evento" :md-done.sync="first">
        <loader v-if="loading" />
        <v-data-table
                v-else
                :headers="headers"
                :items="units"
                :loading="loading"
                :no-data-text="'No hay actividades que mostrar'"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.code.toUpperCase() }}</td>
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

      <md-step id="second" md-label="Evaluaciones" :md-description="(unit)?unit.name + ' / ' + unit.clubName + ' / ' + unit.score:''" :md-done.sync="second">
        <evaluacionesunidad-table :evaluations="unit.evaluations"></evaluacionesunidad-table>
        <md-button @click="goBack">Volver</md-button>
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

export default {
  components: {Loader, EvaluacionesunidadTable},
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
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null
    }
  },
  methods: {
    goBack: function () {
      this.active = 'first'
    },
    showDetail (unitId) {
      this.active = 'second'
      this.unit = this.lodash.find(this.units, { id: unitId })
    }
  },
  watch: {
    totalRows: function (newVal) {
      console.log('Total ' + newVal)
    },
    units: function (newVal) {
      return this.lodash.orderBy(newVal, ['clubName'])
    }
  }
}
</script>
