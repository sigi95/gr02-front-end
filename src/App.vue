<template>
  <div id="app" class="app">

    <div class="Imagen">
      <h3>Imagen</h3>

      <img src="Mapa Colombia.jpg">    
    </div>

    <div class="header">
      <h1>CITY TOUR TRAVEL</h1>
    </div>

    <div class="subtitulo">
      <h2>"Descubre las maravillas de Colombia"</h2>
    </div>
  </div>
</template>

<script>
export default{
  name: 'App',
  data: function(){
  },
  methods:{
  },
  created: function(){ 
  }
}
</script>

<style>
  body{
    margin:0000; 
  }
  .Imagen h3{
    display: none;
    background-color: #ffcc3e;
    align-items: center;
  }
  .Imagen img {
    height: 100px;
    display: block;
    background-color: #ffcc3e;
    align-items: center;
} 
  .header{
    margin:0;
    padding:0;
    width: 100%;
    height: 5vh;
    min-height: 50px;
    background-color: #ffcc3e;
    color:#2d34a3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header h1{
    width: 100%;
    text-align: center;   
  }
  .subtitulo{
    margin:0;
    padding:0;
    width: 100%;
    height: 5vh;
    min-height: 50px;
    background-color: #ffcc3e;
    color:#ca3f3f;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .subtitulo h2{
    width: 100%;
    text-align: center;
    font-family: cursive;
  }
</style>