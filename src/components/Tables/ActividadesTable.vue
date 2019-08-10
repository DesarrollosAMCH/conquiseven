<template>
  <div>
    <div>

      <loader v-if="loading"></loader>

      <div class="md-layout-item md-size-100" v-else="">
        <v-data-table
                :headers="headers"
                :items="activities"
                :loading="loading"
                :no-data-text="'No hay actividades que mostrar'"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.code.toUpperCase() }}</td>
            <!--<td class="text-xs-left" v-if="typeof props.item.category == 'string'">{{ props.item.category }}</td>-->
            <!--
            <td class="text-xs-left">
              <a @click="redirect('/evaluar/'+props.item.id)" :title="'Evaluar '+props.item.name">
                <md-icon>assignment</md-icon>
              </a>
            </td>
            -->
            <td class="text-xs-left">{{ props.item.count_evaluations }}</td>
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
  name: 'actividades-table',
  mixins: [tableUtilsMixin],
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    activities: {
      type: Array
    }
  },
  components: {Loader},
  data () {
    return {
      headers: [
        {text: 'Nombre', value: 'name', align: 'left'},
        {text: 'Código', value: 'code', align: 'left'},
        {text: 'Evaluaciones', value: 'count_evaluations', align: 'left'}
        // {text: 'Categoria', value: 'category', align: 'left'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-progress-spinner {
    margin: 24px;
  }
</style>
