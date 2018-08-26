import {db} from '@/main'
import moment from 'moment'

export default {
  data: function () {
    return {
      cachedUnits: [],
      cachedClubs: [],
      cachedEvents: [],
      cachedActivities: [],
      cachedEvaluations: []
    }
  },
  watch: {
    cachedUnits: function (newVal) {
      // localStorage.setItem('units', JSON.stringify(newVal))
    },
    cachedClubs: function (newVal) {
      // localStorage.setItem('clubs', JSON.stringify(newVal))
    },
    cachedEvents: function (newVal) {
      // localStorage.setItem('events', JSON.stringify(newVal))
    },
    cachedActivities: function (newVal) {
      // localStorage.setItem('activities', JSON.stringify(newVal))
    },
    cachedEvaluations: function (newVal) {
      // localStorage.setItem('evaluations', JSON.stringify(newVal))
    }
  },
  methods: {
    cacheAllData: function () {
      this.cacheClubs()
      this.cacheEvents()
      this.cacheEvaluations()
    },
    cacheClubs: function () {
      db.collection('clubs').orderBy('zone').onSnapshot(snapshot => {
        snapshot.forEach(snapItem => {
          const item = snapItem.data()
          let club = db.collection('clubs').doc(snapItem.id)
          this.cachedClubs.push({
            id: snapItem.id,
            name: item.name,
            units_count: item.units_count,
            zone: item.zoneName,
            active: item.active,
            actions: [
              {
                url: snapItem.id,
                title: 'Mirar Club',
                icon: 'remove_red_eye'
              }
            ]
          })
          this.cacheUnits(club, item.name)
          if (snapshot.docs.length === this.cachedClubs.length) {
            console.log("Clubes cargados")
          }
        })
      })
    },
    cacheUnits: function (club, clubName) {
      var self = this
      db.collection('units').where('club', '==', club).onSnapshot(snapshot => {
        snapshot.forEach(snapItem => {
          var item = snapItem.data()
          self.cachedUnits.push({
            name: item.name,
            code: item.code,
            id: snapItem.id,
            clubName: clubName,
            clubId: club.id
          })
          if (snapshot.docs.length === this.cachedUnits.length) {
            console.log("Unidades cargadas")
          }
        })
      })
    },
    cacheEvents: function () {
      db.collection('events').orderBy('name').onSnapshot(snapshot => {
        snapshot.forEach(snapItem => {
          const item = snapItem.data()
          let xevent = db.collection('events').doc(snapItem.id)
          moment.locale('es')
          this.cachedEvents.push({
            name: item.name,
            startDate: moment(String(item.startDate)).format('llll'),
            endDate: moment(String(item.endDate)).format('llll'),
            address: item.address,
            active: item.active,
            actions: [
              {
                url: snapItem.id,
                title: 'Mirar Evento',
                icon: 'remove_red_eye'
              }
            ]
          })
          this.cacheActivities(xevent, item.name)
          if (snapshot.docs.length === this.cachedEvents.length) {
            console.log("Eventos cargados")
          }
        })
      })
    },
    cacheActivities: function (xevent, eventName) {
      db.collection('activities').where('event', '==', xevent).onSnapshot(snapshot => {
        console.log(snapshot)
        snapshot.forEach(snapItem => {
          var item = snapItem.data()
          let activity = db.collection('activities').doc(snapItem.id)
          this.cachedActivities.push({
            id: snapItem.id,
            name: item.name,
            code: item.code,
            time: item.time,
            eventId: xevent.id,
            eventName: eventName
          })
          this.cacheEvluations(activity, item.name)
          if (snapshot.docs.length === this.cachedActivities.length) {
            console.log("Actividades cargadas")
          }
        })
      })
    },
    cacheEvluations: function (activity, activityName) {
      db.collection('evaluations').where('activity', '==', activity).onSnapshot(snapshot => {
        console.log(snapshot)
        snapshot.forEach(snapItem => {
          var item = snapItem.data()
          this.cachedEvaluations.push({
            id: snapItem.id,
            name: item.name,
            code: item.code,
            time: item.time,
            eventId: activity.id,
            eventName: activityName
          })
          if (snapshot.docs.length === this.cachedEvaluations.length) {
            console.log("Evaluaciones cargadas")
          }
        })
      })
    }
  }
}
