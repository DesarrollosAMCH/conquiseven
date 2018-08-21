import {db} from '@/main'

export default {
  data () {
    return {
      evaluationsRef: db.ref('evaluations')
    }
  }
}
