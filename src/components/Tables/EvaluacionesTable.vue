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
                :pagination.sync="pagination"
                :no-data-text="'No hay evaluaciones que mostrar'"
                :rows-per-page-items="[50]"
        >
          <template slot="items" slot-scope="props">
            <td v-for="header in headers" :key="header.value" class="text-xs-left">
              <div v-if="header.value != 'unit'">
                <md-icon class="fa fa-thumbs-up" v-if="props.item[header.text]"></md-icon>
                <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
              </div>
              <div v-else>
                {{ getUnitName(props.item[header.value]) }}
              </div>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>

import {db} from '@/main'
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
    },
    new_evaluations: {
      type: Array
    }
  },
  components: {Loader},
  data () {
    return {
      pagination: {
        sortBy: 'name'
      },
      unitNames : [],
      headers: [
        {text: 'Unidad', value: 'unit', align: 'left'},
        {text: 'Equipo', value: 'team_work', align: 'left'},
        {text: 'Tiempo', value: 'timings', align: 'left'},
        {text: 'Participación', value: 'presentation', align: 'left'},
        {text: 'Excelencia', value: 'excellence', align: 'left'}
      ]
    }
  },
  mounted() {
    this.evaluations.forEach(item => {
      let split = item.unit.split('/')
      let unit = split[2]
      var _this = this
      db.collection('units').doc(unit).get().then(function(doc) {
        const itemx = doc.data()
        let forAdd = {
          path : item.unit,
          name: itemx.name
        }
        _this.unitNames.push(forAdd)

      })
    })
  },
  methods: {
    getUnitName (unitCode) {
      var find = this.lodash.find(this.unitNames,{path: unitCode})
      console.log(unitCode)
      if( find != undefined){
        return find.name
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>
