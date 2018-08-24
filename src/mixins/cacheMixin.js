import {db} from '@/main'

export default {
  data: function () {
    return {
    }
  },
  methods: {
    cacheAllData: function () {
      this.cacheClubs()
    },
    cacheClubs: function () {
      db.collection('clubs').orderBy('zone').onSnapshot(snapshot => {
        let cachedClubs = []
        snapshot.forEach(snapItem => {
          const item = snapItem.data()
          cachedClubs.push({
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
        })
        console.log(cachedClubs)
        localStorage.setItem('clubs', JSON.stringify(cachedClubs))
      })
    },
    cacheUnits: function () {
    },
    cacheEvents: function () {
    },
    cacheActivities: function () {
    },
    cacheevluations: function () {
    }
  }
}
