<template>
	<div id="app" class="app">

		<div class="navbar">
			<div class="container">
				<div @click="loadHome" class="logo">
					<img src="./assets/logoCityTourTravel2.png">
					<h1>City Tour Travel</h1>
				</div>
				<nav>
					<div class="link">
						<button @click="loadHome">Inicio</button>
						<button @click="loadTours">Tours</button>
						<button v-if="isAuth">Carrito</button>
					</div>
					<div class="button">
						<button @click="loadLogin" v-if="!isAuth">Iniciar Sesión</button>
						<button @click="loadSignUp" v-if="!isAuth">Registrarse</button>
						<button @click="loadLogout" v-if="isAuth">Cerrar Sesión</button>
					</div>
				</nav>
			</div>
		</div>

		<div class="main-component">
			<router-view
			v-on:completedSignUp="completedSignUp"
			v-on:completedLogin="completedLogin"
			v-on:loadLogout="loadLogout"
			v-on:loadTours="loadTours"
			v-on:addToCart="addToCart"
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
		//metodo para verificar la sesion
		verifyAuth: function(){
			this.isAuth = localStorage.getItem("isAuth") || false;
			if(this.isAuth == false)
				this.$router.push({ name: 'Login' })
			else
				this.$router.push({ name: 'Home' })
		},

		loadHome(){
			this.$router.push({name: 'Home'})
		},

		loadLogin(){
			this.$router.push({ name: 'Login' })
		},

		loadSignUp(){
			this.$router.push({ name: 'SignUp' })
		},

		loadLogout(){
			localStorage.clear();
			console.log("Sesion finalizada");
			this.verifyAuth();
		},

		loadTours(){
			this.$router.push({ name: 'Tours' })
		},

		completedLogin: function(data){
			localStorage.setItem("isAuth", true);
            localStorage.setItem("username", data.usu_nombreUsuario);
            localStorage.setItem("token_access", data.token_access);
            localStorage.setItem("token_refresh", data.token_refresh);
            this.verifyAuth();
            console.log("Autenticacion exitosa");
		},

		completedSignUp: function(data){
			console.log("Registro exitoso");
            this.completedLogin(data);
		},

		addToCart(tourId){
			this.tourId = tourId
			this.$router.push({path : '/tours/add/'+tourId})
		}
		
	},

	created: function(){
		this.verifyAuth()
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
	display: flex;
}

.logo img{
	height: 65px;
	margin: 10px 10px 10px 10px;
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
	font-size: 17px;
	cursor: default;
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

