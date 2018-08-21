<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">Evaluación de Unidades</h4>
                        <p class="category">Selecciones un evento y una unidad para realizar la evaluación.</p>
                    </md-card-header>
                    <md-card-content>

                        <form novalidate>
                            <div class="md-layout">
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

export default {
  components: {},
  name: '',
  data () {
    return {
      showSnackbar: false,
      club: {},
      unidad: null,
      clubes: [],
      unidades: [],
      unidadLabel: 'Seleciona una Unidad',
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
  },
  methods: {
    onClubChange (clubId) {
      if (typeof clubId !== 'string') {
        return
      }

      var club = db.collection('clubs').doc(clubId)
      db.collection('unidades').where('club', '==', club).onSnapshot(snapshot => {
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
    save () {
      this.evaluation.unit = db.collection('unidades').doc(this.unidad)
      this.evaluation.activity = this.actividad

      db.collection('evaluations').doc().set(this.evaluation)

      this.showSnackbar = true
    }
  }
}
</script>

<style lang="scss" scoped>
    .md-switch {
        display: flex;
    }
</style>
