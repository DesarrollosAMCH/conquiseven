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
            <td v-for="header in headers" :key="header" class="text-xs-left">
              <div v-if="header.type === 'boolean'">
                <md-icon class="fa fa-thumbs-up" v-if="props.item[header.value]"></md-icon>
                <md-icon class="fa fa-thumbs-down down" v-else></md-icon>
              </div>
              <div v-if="header.type != 'boolean'">
                {{ props.item[header.value]}}
              </div>
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
  name: 'evaluacion-detalle-table',
  mixins: [tableUtilsMixin],
  props: {
    tableHeaderColor: {
      type: String,
      default: ''
    },
    evaluations: {
      type: Array
    },
    headers: {
      type: Array
    },
    parentGoBack: ''
  },
  components: {Loader},
  data () {
    return {
      pagination: {
        sortBy: 'name'
      }
    }
  },
  methods: {
    goBack: function (step) {
      this.parentGoBack(step)
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
