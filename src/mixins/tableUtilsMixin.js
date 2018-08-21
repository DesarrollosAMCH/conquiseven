
export default {
  data: function () {
    return {
      loading: false,
      processed: 0
    }
  },
  methods: {
    turnOffloader: function (length) {
      console.log('desde mixin')
      if (this.processed === length) {
        setTimeout(() => {
          this.loading = false
          console.log(this.loading)
        }, 500)
      }
    }
  }
}
