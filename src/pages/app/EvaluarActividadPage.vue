<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card-content v-if="loading">
                    <loader></loader>
                </md-card-content>
                <md-card v-else-if="found">
                    <md-card-header data-background-color="green">
                        <small>Evaluar Actividad:</small>
                        <h4 class="title">{{ actividad.name.toUpperCase() }}</h4>
                        <p class="category">Ingrese el código de una unidad para realizar la evaluación.</p>
                    </md-card-header>
                    <md-card-content>

                        <form novalidate>
                            <div class="md-layout">
                            <!--
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="club-select">Selecciona un Club</label>
                                    <md-select v-model="club" name="club" id="club-select" @md-selected="onClubChange">
                                        <md-option v-for="club in clubes" v-bind:key='club.id' :value="club.id">{{ club.name }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-50">
                                <md-field>
                                    <label for="club-select">{{ unidadLabel }}</label>
                                    <md-select v-model="unidad" name="unidad" id="unidad-select" :disabled="!unidades.length">
                                        <md-option v-for="unidad in unidades" v-bind:key='unidad.id' :value="unidad.id">{{ unidad.name }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            -->
                            <div class="md-layout-item md-size-100 md-xsmall-size-50">
                                <md-field>
                                    <label>Código</label>
                                    <md-input @change="search" v-model="code"></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-10">
                                <md-button class="md-raised md-success hidden-lg-only" @click="search" :disabled="code.length != 4">Guardar</md-button>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <unidades-table v-if="unidades.length" v-bind:units="unidades"></unidades-table>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <p class="decription">
                                    <small><b>Nota:</b></small>
                                    Para evaluar la unidad, solo debes hacer check, en las casillas de los requisitos
                                    que si cumple y omitir (dejar vacia) las casillas de los requisitos que no cumple.
                                </p>
                            </div>

                            <div v-for="(value, prop) in actividad.document.items" :key="prop" class="md-layout-item md-size-50 md-xsmall-size-100">
                                <md-checkbox v-model="evaluation[prop]">{{ prop }}</md-checkbox>
                            </div>

                            <div class="md-layout-item md-size-100 text-right">
                                <md-button class="md-raised md-success" @click="save" :disabled="unidad == null">Guardar</md-button>
                            </div>
                        </div>
                        </form>
                    </md-card-content>
                </md-card>
                <md-card v-else>
                    <md-card-header data-background-color="red">
                        <h4 class="title">Actividad no encontrada</h4>
                        <p class="category">La actividad que busca no existe.</p>
                    </md-card-header>
                    <md-card-content>

                    </md-card-content>
                </md-card>
            </div>
        </div>

        <md-snackbar :md-duration="10000" :md-active.sync="showSnackbar" md-persistent>
            <span>
                <md-icon class="md-size-2x" style="color: #4caf50">verified_user</md-icon>
                Felicidades!!. La unidad ya fue evaluada.
            </span>
        </md-snackbar>
    </div>
</template>

<script>
import {db} from '@/main'
import UnidadesTable from '@/components/Tables/UnidadesTable'
import Loader from '@/components/Utils/Loader'

export default {
  components: {
    Loader,
    UnidadesTable},
  name: 'evaluar-actividad-page',
  data () {
    return {
      found: false,
      loading: true,
      showSnackbar: false,
      unidad: null,
      unidades: [],
      code: '',
      unidadLabel: 'Seleciona una Unidad', // can delete
      actividad: db.collection('activities').doc(this.$route.params.activity),
      evaluation: {}
    }
  },
  mounted () {
    this.loading = true
    // Do not delete
    var self = this
    this.actividad.get().then(snapItem => {
      self.found = snapItem.exists
      if (self.found) {
        this.clubes = []
        const item = snapItem.data()
        this.actividad = {
          id: snapItem.id,
          name: item.name,
          document: item
        }
      }
      this.loading = false
    })
  },
  watch: {
    // can delete
    unidad: function (newVal) {
      if (typeof newVal === 'string') {
        db.collection('units').doc(newVal).get().then(snapshot => {
          var item = snapshot.data()
          this.unidades = {
            id: snapshot.id,
            name: item.name
          }
        })
      }
    },
    code: function (newVal) {
      if (newVal.length === 4) {
        this.search()
      }
    },
    actividad: function (newVal) {
      let evaluation = newVal.document.items
      let element = {}
      for (var prop in evaluation) {
        element[prop] = false
      }
      this.evaluation = element
    }
  },
  methods: {
    search (event) {
      if (this.code.length === 4) {
        db.collection('units').where('code', '==', this.code).onSnapshot(snapshot => {
          this.clubes = []
          snapshot.forEach(snapItem => {
            const item = snapItem.data()
            this.unidades = []
            this.unidad = {
              id: snapItem.id,
              name: item.name,
              clubName: item.clubName,
              zoneName: item.zoneName,
              active: true
            }
            this.unidades.push(this.unidad)
          })
        })
      }
    },
    save () {
      this.evaluation.unit = db.collection('units').doc(this.unidad.id)
      this.evaluation.activity = db.collection('activities').doc(this.actividad.id)

      db.collection('evaluations').doc().set(this.evaluation)
      this.showSnackbar = true
      setTimeout(() => this.$router.push({path: '/actividad/' + this.actividad.id}), 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
    .decription{
        margin: 20px 0;
    }
</style>
