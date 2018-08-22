<template>
    <md-card class="md-card-profile">
      <slot :event="event">

      </slot>
      <div class="md-card-avatar">
        <img class="img" :src="cardImage" v-if="cardImage">
        <font-awesome-icon v-else icon="flag" size="4x" />
      </div>

      <md-card-content v-if="!event">
        <loader></loader>
      </md-card-content>

      <md-card-content v-else>
        <h6 class="category text-gray">{{ category }}</h6>
        <h4 class="card-title">{{ event.name }}</h4>
        <p class="card-description">
          {{ event.description }}
        </p>
        <!--
        <md-button class="md-round md-success">Follow</md-button>
        -->
      </md-card-content>
    </md-card>
</template>

<script>
import Loader from '@/components/Utils/Loader'

export default {
  components: {Loader},
  name: 'card',
  props: {
    event: {
      type: Object
    },
    cardImage: {
      type: String,
      default: require('@/assets/img/logo_convencion.png')
    },
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    categoryAsString: () => {
      console.log(this)
      var categoryAsString = ''
      this.event.category.get().then(category => {
        categoryAsString = category.data().name
      })
      return categoryAsString
    }
  }
}

</script>
<style>

</style>
