<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card-content v-if="loading">
                    <loader></loader>
                </md-card-content>
                <md-card v-else-if="found">
                    <md-card-header data-background-color="green">
                        <h4 class="title">Evaluar actividad</h4>
                        <p class="category">Ingrese un código de actividad para comenzar.</p>
                    </md-card-header>
                    <md-card-content>
                        <form novalidate>
                          <div class="md-layout">
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Código</label>
                                    <md-input v-model="code"></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-100 text-right">
                                <md-button class="md-raised md-success" @click="search" :disabled="code.length != 5">Enviar</md-button>
                            </div>
                          </div>
                        </form>
                    </md-card-content>
                </md-card>
            </div>
        </div>

        <md-snackbar :md-duration="10000" :md-active.sync="showSnackbar" md-persistent>
            <span>
                <md-icon class="md-size-2x" style="color: red">error</md-icon>
                Lo sentimos, el código no es válido.
            </span>
        </md-snackbar>
    </div>
</template>

<script>
import {db} from '@/main'
import Loader from '@/components/Utils/Loader'

export default {
  components: {Loader},
  name: '',
  data () {
    return {
      found: true,
      loading: false,
      showSnackbar: false,
      code: '',
      actividad: null
    }
  },
  methods: {
    search () {
      if (this.code.length === 5) {
        db.collection('activities').where('code', '==', this.code).onSnapshot(snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(snapItem => {
              this.$router.push({path: '/evaluar/' + snapItem.id})
            })
          } else {
            this.showSnackbar = true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
</style>
