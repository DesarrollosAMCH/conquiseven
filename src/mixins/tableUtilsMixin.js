
export default {
  data: function () {
    return {
      loading: false,
      processed: 0
    }
  },
  methods: {
    turnOffloader: function (length) {
      if (this.processed === length) {
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
    },
    redirect: function (url) {
      this.$router.push({path: url})
    }
  }
}
