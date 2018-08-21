<template>
    <div class="md-layout md-gutter md-alignment-center-center">
        <div class="md-layout-item md-medium-size-100 md-size-30">
            <img class="md-alignment-center-center" :src="image" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'loader',
  data () {
    return {
      image: 'https://editionsdelarose.com/wp-content/themes/edr/img/loading.gif'
    }
  }
}
</script>
