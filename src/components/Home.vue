<template>
    <div class="home">

		<section class="banner">
			<div class="banner-content">
				<h1>Descubre las maravillas de Colombia</h1>
				<button id='all' @click="loadTours">Ver Tours</button>
			</div>
		</section>

		<h1 class="title">Destinos</h1>

		<div class="container">

			<section class="cities">

				<div  v-for="(city,i) in cities" :key="i" class="card">
					<img :src=images[i] >
					<h2>{{ cities[i] }}</h2>
					<button :id=city @click="loadTours">Ver Tours</button>
				</div>

			</section>
		</div>
		
	</div>
</template>

<script>
import bogota from '../assets/images/bogota.jpg'
import cucuta from '../assets/images/cucuta.jpg'
import medellin from '../assets/images/medellin.jpg'
import popayan from '../assets/images/popayan.jpg'
import santander from '../assets/images/santander.jpg'
import axios from 'axios'

export default {
    name: 'Home',

    data: function(){
        return {
            cities: ['Bogotá','Cúcuta','Medellín','Popayán','Santander'],
            images: [bogota, cucuta, medellin, popayan, santander]
        }
    },

	methods: {
		loadTours: function(event){
			let city = event.srcElement.id
			this.$emit('loadTours', city)
		}
	}
}
</script>

<style>
body{
    font-family: sans-serif;
}

.banner{
	position: relative;
	width: 100%;
	height: calc(100vh - 180px);
	background-color: #F5F5F5;
	background-size: cover;
	background-position: center;
	transition: all .1s ease-out;
	background-image: url('../assets/images/bogota.jpg');
	animation: banner 28s infinite linear;
}
.banner-content{
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	color: #FFF;
	background-color: rgba(0, 22, 40, .6);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.banner-content h1{
	margin: 0;
	padding: 0;
	padding-bottom: 30px;
	font-size: 4rem;
	text-align: center;
}
.banner-content button{
	color: #FFF;
	padding: 9px 20px;
	border: 1px solid #FFF;
    border-radius: 8px;
	font-size: 1.5rem;
	cursor: pointer;
	text-transform: uppercase;
	transition: all .3s ease-in-out;
	background-color: rgba(0, 0, 0, 0);
}
.banner-content button:hover{
	background-color: #fff;
	color: #333;
}

@keyframes banner{
	0%{
		background-image: url('../assets/images/bogota.jpg');
	}
	25%{
		background-image: url('../assets/images/bogota.jpg');
	}


	26%{
		background-image: url('../assets/images/cucuta.jpg');
	}
	50%{
		background-image: url('../assets/images/cucuta.jpg');
	}


	51%{
		background-image: url('../assets/images/medellin.jpg');
	}
	75%{
		background-image: url('../assets/images/medellin.jpg');
	}
	

	76%{
		background-image: url('../assets/images/popayan.jpg');
	}
	100%{
		background-image: url('../assets/images/popayan.jpg');
	}

}

.container{
	display: flex;
	justify-content: center;
}

.title{
    color:#eaa928;
    text-align: center;
    font-weight: 900;
    font-size: 50px;
    margin-top: 50px;
}

.cities{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
}

.cities .card{
    width: 330px;
    height: 330px;
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin: 20px;
    text-align: center;
    transition: all 0.25s;
    background-color: #f8f5e9;
}

.cities .card:hover{
    transform: translateY(-15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.cities .card img{
    width: 330px;
    height: 230px;
}

.cities .card h2{
    font-weight: 900;
    color: #eaa928;
    padding-top: 1rem;
	margin: 0px;
}


.cities .card button{
    font-weight: 600;
	font-size: 16px;
    color: #04040f;
	border: none;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0);
}

.cities .card button:hover{
    color: #b88900;
}


</style>