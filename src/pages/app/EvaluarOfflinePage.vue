<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" v-if="actividad === null">
                <md-card-content v-if="loading">
                    <loader></loader>
                </md-card-content>
                <md-card v-else-if="found">
                    <md-card-header data-background-color="green">
                        <h4 class="title">Evaluar actividad - Modo offline</h4>
                        <p class="category">Ingrese un código de actividad para comenzar.</p>
                    </md-card-header>
                    <md-card-content>
                        <form novalidate>
                          <div class="md-layout">
                            <div class="md-layout-item md-size-100 md-xsmall-size-50">
                                <md-field>
                                    <label>Código Actividad</label>
                                    <md-input v-model="activityCode"></md-input>
                                </md-field>
                            </div>

                              <div class="md-layout-item md-size-100 md-xsmall-size-50 text-right">
                                <md-button class="md-raised md-success" @click="search">Buscar</md-button>
                            </div>
                          </div>
                        </form>
                    </md-card-content>
                </md-card>
            </div>

            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" v-else>
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
                                        <label>Código Unidad</label>
                                        <md-input @change="search" v-model="unitCode"></md-input>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-100 md-xsmall-size-50 text-right">
                                    <md-button class="md-raised md-success" @click="searchByUnitCode">Buscar</md-button>
                                </div>

                                <div class="md-layout-item md-size-100">
                                    <unidades-table class="unidades-table" v-if="unidades.length" v-bind:units="unidades"></unidades-table>
                                </div>

                                <div class="md-layout-item md-size-100">
                                    <p class="decription">
                                        <small><b>Nota:</b></small>
                                        Para evaluar la unidad, solo debes hacer check, en las casillas de los requisitos
                                        que si cumple y omitir (dejar vacia) las casillas de los requisitos que no cumple.
                                    </p>
                                </div>

                                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                                    <md-checkbox v-model="evaluation.presentation">Presentación</md-checkbox>
                                </div>
                                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                                    <md-checkbox v-model="evaluation.timings">Tiempo</md-checkbox>
                                </div>
                                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                                    <md-checkbox v-model="evaluation.excellence">Excelencia</md-checkbox>
                                </div>

                                <div class="md-layout-item md-size-50 md-xsmall-size-100">
                                    <md-checkbox v-model="evaluation.team_work">Trabajo en Equipo</md-checkbox>
                                </div>

                                <div class="md-layout-item md-size-100">
                                    <p class="decription">
                                        <small><b>Nota:</b></small>
                                        Si lo consideras necesario, puedes agregar un comentario a la evaluación.
                                    </p>
                                </div>

                                <div class="md-layout-item md-size-100 md-xsmall-size-50">
                                    <md-field>
                                        <label>Comentarios</label>
                                        <md-textarea v-model="evaluation.comment"></md-textarea>
                                    </md-field>
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
                Muy bien, Evaluación completada!
            </span>
        </md-snackbar>

        <md-snackbar :md-duration="10000" :md-active.sync="showSnackbarError" md-persistent>
            <span>
                <md-icon class="md-size-2x" style="color: red">error</md-icon>
                Lo sentimos, el código no es válido.
            </span>
        </md-snackbar>

        <md-snackbar :md-duration="10000" :md-active.sync="showSnackbarWarning" md-persistent>
            <span>
                <md-icon class="md-size-2x" style="color: orange">warning</md-icon>
                Unidad ya evaluada en el evento.
            </span>
        </md-snackbar>
    </div>
</template>

<script>
import {db} from '@/main'
import Loader from '@/components/Utils/Loader'
import CacheMixin from '@/mixins/cacheMixin'
import UnidadesTable from '@/components/Tables/UnidadesTable'
import moment from 'moment'

export default {
  components: {Loader, UnidadesTable},
  mixins: [CacheMixin],
  name: 'evaluarOfflne',
  data () {
    return {
      found: true,
      loading: false,
      showSnackbar: false,
      showSnackbarError: false,
      showSnackbarWarning: false,
      activityCode: '',
      actividad: this.$store.state.activity,
      unidad: null,
      unidades: [],
      unitCode: '',
      evaluation: {
        comment: '',
        excellence: false,
        team_work: false,
        timings: false,
        presentation: false
      }
    }
  },
  watch: {
    unitCode: function (newVal) {
      this.unitCode = newVal.toUpperCase()
    },
    activityCode: function (newVal) {
      this.activityCode = newVal.toUpperCase()
    }
  },
  mounted () {
    this.cacheAllData()
    this.$store.commit('setActivity', this.getActividad())
    this.actividad = this.$store.state.activity
  },
  methods: {
    getActividad () {
      let exists = localStorage.getItem('defaultActivity')
      if (exists) {
        return JSON.parse(exists)
      } else {
        return null
      }
    },
    search () {
      /*
      let activities = JSON.parse(localStorage.getItem('activities'))
      let result = this.lodash.find(activities, ['code', this.activityCode.toLowerCase()])
      if (typeof result !== 'undefined') {
        this.actividad = result
        this.showSnackbarError = false
        // localStorage.setItem('mainActivity', this.actividad)
      } else {
        this.error()
      }
      */
      db.collection('activities').where('code', '==', this.activityCode.toLowerCase()).onSnapshot(snapshot => {
        if (snapshot.empty) { this.error() }
        snapshot.forEach(snapItem => {
          const item = snapItem.data()
          let actividad = {
            id: snapItem.id,
            name: item.name,
            description: item.description,
            time: item.time
          }
          this.$store.commit('setActivity', actividad)
          this.actividad = this.$store.state.activity
          localStorage.setItem('defaultActivity', JSON.stringify(actividad))
        })
      })
    },
    searchByUnitCode () {
      /*
      let units = JSON.parse(localStorage.getItem('units'))
      let result = this.lodash.find(units, ['code', this.unitCode.toLowerCase()])
      if (typeof result !== 'undefined') {
        this.unidad = result
        this.unidades = []
        this.unidades.push(this.unidad)
        this.showSnackbarError = false
      } else {
        this.error()
      }
      */

      db.collection('units').where('code', '==', this.unitCode.toLowerCase()).onSnapshot(snapshot => {
        this.clubes = []
        snapshot.forEach(snapItem => {

          let frUnidad = db.collection('units').doc(snapItem.id)
          let frActividad = db.collection('activities').doc(this.actividad.id)
          db.collection('evaluations').where('unit', '==', frUnidad).where('activity', '==', frActividad).onSnapshot(snapshot => {
            console.log(snapshot)
            if(snapshot.docs.length){
              this.showSnackbarWarning = true
            }
          })

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
    },
    save () {
      this.evaluation.unit = db.collection('units').doc(this.unidad.id)
      this.evaluation.activity = db.collection('activities').doc(this.actividad.id)
      moment.locale('es')
      this.evaluation.date = moment().format('YYYY-MM-DD HH:mm')

        db.collection('evaluations').doc().set(this.evaluation)
      // this.showSnackbar = true
      this.successfull()
      this.reset()
      setTimeout(() => this.$router.push({path: '/actividad/' + this.actividad.id}), 2000)
    },
    saveOffline () {
      this.evaluation.unit = this.unidad.id
      this.evaluation.activity = this.actividad.id
      let cachedEvaluations = localStorage.getItem('evaluations')
      let evaluations = cachedEvaluations ? JSON.parse(cachedEvaluations) : []
      evaluations.push(this.evaluation)
      localStorage.setItem('evaluations', JSON.stringify(evaluations))
      this.successfull()
      setTimeout(() => this.reset(), 1000)

      // db.collection('evaluations').doc().set(this.evaluation)
      // setTimeout(() => this.$router.push({path: '/actividad/TU6WCJnqM0lMvZ5EMIyL'}), 2000)
    },
    successfull () {
      this.showSnackbarError = false
      this.showSnackbar = true
    },
    error () {
      this.showSnackbarError = true
      this.showSnackbar = false
    },
    reset () {
      this.unidad = null
      this.unidades = []
      this.unitCode = ''
      this.evaluation = {
        excellence: false,
        team_work: false,
        timings: false,
        presentation: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
    .decription{
        margin-top: 60px;
        margin-bottom: 10px;
    }
    .unidades-table{
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>
