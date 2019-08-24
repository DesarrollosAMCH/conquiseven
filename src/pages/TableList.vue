<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Clubes Registrados</h4>
            <p class="category">Listado de clubes que han sido registrados en la Asociación Metropolitana</p>
          </md-card-header>
          <md-card-content>
            <clubes-table></clubes-table>
          </md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Eventosx</h4>
            <p class="category"></p>
          </md-card-header>
          <md-card-content>
            <eventos-table></eventos-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SimpleTable,
  OrderedTable
} from '@/components'

export default {
  components: {
    OrderedTable,
    SimpleTable
  }
}
</script>
