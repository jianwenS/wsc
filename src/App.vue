<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app,p,h1,h2,h3,h4,h5,h6,div,ul,li{
   margin: 0;
   padding: 0;
}
html,body,#app{
	height: 100%;
	width: 100%;
	overflow-x:hidden;
	box-sizing: border-box;
}
</style>
