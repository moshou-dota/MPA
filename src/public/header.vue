<template>
  <div>this is a common vue header<br>
    {{pageName}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: ''
    }
  },
  created () {
    this.pageName = location.href
    console.log('href==',location.href)
  }
}
</script>

<style>

</style>
