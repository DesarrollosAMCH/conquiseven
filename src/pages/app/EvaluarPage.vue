<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Evaluación de Actividad: <small>{{ actividad.name }}</small></h4>
                        <p class="category">Selecciones un evento y una unidad para realizar la evaluación.</p>
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
                            <div class="md-layout-item md-size-100">
                                <md-field>
                                    <label>Código</label>
                                    <md-input @keyup="search" v-model="code"></md-input>
                                </md-field>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <unidades-table v-if="unidades.length" v-bind:units="unidades"></unidades-table>
                            </div>

                            <div class="md-layout-item md-size-100">
                                <p>
                                    Para evaluar la unidad, solo debes hacer check, en las casillas de los requisitos
                                    que si cumple y omitir (dejar vacia) las casillas de los requisitos que no cumple.
                                </p>
                            </div>

                            <div class="md-layout-item md-size-50">
                                <md-checkbox v-model="evaluation.presentation">Presentación</md-checkbox>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-checkbox v-model="evaluation.timings">Tiempo</md-checkbox>
                            </div>

                            <div class="md-layout-item md-size-50">
                                <md-checkbox v-model="evaluation.team_work">Trabajo en Equipo</md-checkbox>
                            </div>
                            <div class="md-layout-item md-size-50">
                                <md-checkbox v-model="evaluation.excellence">Excelencia</md-checkbox>
                            </div>

                            <div class="md-layout-item md-size-100 text-right">
                                <md-button class="md-raised md-success" @click="save" :disabled="unidad == null">Guardar</md-button>
                            </div>
                        </div>
                        </form>
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

export default {
  components: {UnidadesTable},
  name: '',
  data () {
    return {
      showSnackbar: false,
      club: {}, // can delete
      unidad: null,
      clubes: [], // can delete
      unidades: [],
      code: null,
      unidadLabel: 'Seleciona una Unidad', // can delete
      actividad: db.collection('activities').doc(this.$route.params.activity),
      evaluation: {
        excellence: false,
        team_work: false,
        timings: false,
        presentation: false
      }
    }
  },
  mounted () {
    this.loading = true
    // can delete
    db.collection('clubs').orderBy('name').onSnapshot(snapshot => {
      this.clubes = []
      snapshot.forEach(snapItem => {
        const item = snapItem.data()
        this.clubes.push({
          id: snapItem.id,
          name: item.name,
          document: item
        })
      })
    })
    // Do not delete
    this.actividad.get().then(snapItem => {
      this.clubes = []
      const item = snapItem.data()
      this.actividad = {
        id: snapItem.id,
        name: item.name,
        document: item
      }
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
    }
  },
  methods: {
    // can delete
    onClubChange (clubId) {
      if (typeof clubId !== 'string') {
        return
      }

      var club = db.collection('clubs').doc(clubId)
      db.collection('units').where('club', '==', club).onSnapshot(snapshot => {
        this.unidades = []
        this.unidad = null
        snapshot.forEach(snapItem => {
          var item = snapItem.data()
          this.unidades.push({
            id: snapItem.id,
            name: item.name
          })
        })
      })
    },
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
      setTimeout(() => this.$router.push({path: '/actividad/TU6WCJnqM0lMvZ5EMIyL'}), 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
</style>
