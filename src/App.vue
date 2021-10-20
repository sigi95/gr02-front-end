<template>
	<div id="app" class="app">

		<div class="navbar">
			<div class="container">
				<div class="logo">
					<h1 @click="loadHome">City Tour Travel</h1>
				</div>
				<nav>
					<div class="link">
						<button @click="loadHome">Inicio</button>
						<button @click="loadTours">Tours</button>
						<button v-if="isAuth" >Cuenta</button>
						<button >Carrito</button>
					</div>
					<div class="button">
						<button v-if="!isAuth">Iniciar Sesión</button>
						<button v-if="!isAuth">Registrarse</button>
						<button v-if="isAuth">Cerrar Sesión</button>
					</div>
				</nav>
			</div>
		</div>

		<div class="main-component">
			<router-view
				v-on:loadTours="loadTours"
			>
			</router-view>
		</div>

		<div class="footer">
			<p class="text-center"> &copy; 2021 Copyright: City Tour Travel</p>
		</div>

	</div>
</template>

<script>
export default {
	name: 'App',

	data: function(){
		return{
			isAuth: false
		}
	},

	methods: {
		loadHome: function(){
			this.$router.push({ name: 'home' })
		},
		loadTours: function(){
			this.$router.push({ name: 'tours' })
		}
	},

	created(){
		this.loadHome()
	}
}


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');

body{
	margin: 0 0 0 0;
	padding: 0 0 0 0;
}

.navbar{
	width: 100%;
	height: 80px;
	box-sizing: border-box;
	background-color: #eaa928;
	color: #fff;
	font-family: 'Poppins', sans-serif;
}

.navbar .container{
	margin: auto 18px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80px;

}

.logo{
	cursor: pointer;
}

nav{
	display: flex;
	margin-right: 10px;
}

.link button{
	background-color: #eaa928;
	border: none;
	color: #fff;
	padding: 5px;
	margin: 8px 12px;
	border-radius: 5px;
	font-size: 22px;
}

.link button:hover{
	background-color: #fff;
	color: #eaa928;
}

.button button{
	background-color: #fff;
	border: none;
	color: #eaa928;
	padding: 6px 12px;
	margin: 8px;
	border-radius: 5px;
	font-size: 18px;
}

.button button:hover{
	background-color: rgb(208, 209, 201);
}

.footer{
	background-color: #eaa928;
	height: 75px;
	align-items: center;
}

.text-center {
	padding: 22px;
	text-align: center;
	font-family: 'Poppins', sans-serif;
	font-size: 20px;
}


</style>

