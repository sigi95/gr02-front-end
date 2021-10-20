<template>

	<div class="navbar">
		<div class="container">
			<div class="logo">
				<h1>City Tour Travel</h1>
			</div>
			<nav>
				<ul>
					<li> <a href="">Inicio</a> </li>
					<li> <a href="">Tours</a> </li>
					<li> <a href="">Carrito</a> </li>

				</ul>
				<div class="button">
					<a v-if="!isAuth" href="">Iniciar Sesión</a>
					<a v-if="!isAuth" href="">Registrarse</a>
				</div>
			</nav>
		</div>
	</div>

	<div class="main-component">
		<router-view>
		</router-view>
	</div>

	<div class="footer">
  		<p class="text-center"> &copy; 2021 Copyright: City Tour Travel</p>
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
		loadHome(){
			this.$router.push({name: 'Home'})
		}
	},

	mounted(){
		this.loadHome();
	}
}


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');

*{
	margin: 0px;
	padding: 0px;
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
	max-width: 1300px;
	margin: 0px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 80px;

}

nav{
	display: flex;
}
nav ul{
	display: flex;
	margin-right: 10px;
}
nav ul li{
	list-style: none;
}
nav ul li a{
	color: #fff;
	text-decoration: none;
	font-size: 20px;
	margin: 0px 20px;
}

.navbar .button a{
	text-decoration: none;
	background-color: #fff;
	color: #eaa928;
	padding: 6px 12px;
	margin: 8px;
	border-radius: 5px;
	font-size: 17px;
}

.navbar .button a:hover{
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

