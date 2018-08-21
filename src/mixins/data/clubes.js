
export default {
  data () {
    return {
      /*
      clubes: [
        {
          name: 'Rejas Sur',
          units_count: '3',
          zone: 'Poniente',
          active: 'true',
          units: [
            {
              name: 'Aguilas',
              members: '6',
              active: 'true'
            },
            {
              name: 'Panteras',
              members: '6',
              active: 'true'
            },
            {
              name: 'Felinas',
              members: '6',
              active: 'true'
            }
          ],
          actions: {
            show: {
              icon: 'eye',
              url: '/clubes/1',
              title: 'Mirar'
            }
          }
        },
        {
          name: 'Exploradores',
          units_count: '8',
          zone: 'Centro',
          active: 'true',
          units: [
            {
              name: 'Condores',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Cruz del Sur',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Abejitas',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Condores',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Cruz del Sur',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Abejitas',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Condores',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            },
            {
              name: 'Cruz del Sur',
              members: '6',
              club: 'Exploradores',
              club_id: '2',
              active: 'true'
            }
          ],
          actions: {
            show: {
              icon: 'eye',
              url: '/clubes/2',
              title: 'Mirar'
            }
          }
        },
        {
          name: 'Aguila Fiel',
          units_count: '5',
          zone: 'Norte',
          active: 'true',
          units: [
            {
              name: 'Abejitas',
              members: '6',
              club: 'Aguila Fiel',
              club_id: '3',
              active: 'true'
            },
            {
              name: 'Hormiguitas',
              members: '6',
              club: 'Aguila Fiel',
              club_id: '3',
              active: 'true'
            },
            {
              name: 'Leones',
              members: '6',
              club: 'Aguila Fiel',
              club_id: '3',
              active: 'true'
            },
            {
              name: 'Centaruos',
              members: '6',
              club: 'Aguila Fiel',
              club_id: '3',
              active: 'true'
            },
            {
              name: 'Centuriones',
              members: '6',
              club: 'Aguila Fiel',
              club_id: '3',
              active: 'true'
            }
          ],
          actions: {
            show: {
              icon: 'eye',
              url: '/clubes/3',
              title: 'Mirar'
            }
          }
        },
        {
          name: 'K2',
          units_count: '5',
          zone: 'Poniente',
          active: 'true',
          units: [
            {
              name: 'Lilfel',
              members: '6',
              club: 'K2',
              club_id: '4',
              active: 'true'
            },
            {
              name: 'Alcones',
              members: '6',
              club: 'K2',
              club_id: '4',
              active: 'true'
            },
            {
              name: 'Trigres Blancos',
              members: '6',
              club: 'K2',
              club_id: '4',
              active: 'true'
            },
            {
              name: 'Colmillos Blancos',
              members: '6',
              club: 'K2',
              club_id: '4',
              active: 'true'
            },
            {
              name: 'Centuriones',
              members: '6',
              club: 'K2',
              club_id: '4',
              active: 'true'
            }
          ],
          actions: {
            show: {
              icon: 'eye',
              url: '/clubes/4',
              title: 'Mirar'
            }
          }
        }
      ]
      */
    }
  },
  computed: {
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
}
