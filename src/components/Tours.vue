<template>
    <div id="tours" class="tours">

        <div v-for="(tour, i) in tours" :key="tour.tour_nombre" class="card">
            <img src="../assets/tours/prueba.jpg">
            <label><strong>Nombre: </strong><span>{{ tour.tour_nombre }}</span></label>
            <br> 
            <label> <strong>Ciudad: </strong> {{ tour.ciu_nombre_id }}</label>
            <br>
            <label><strong>Descripción: </strong><span>{{ tour.tour_descripcion }}</span></label>
            <br>
            <label><strong>Precio: </strong><span>{{ tour.tour_precio }}</span></label>
            <br> 
            <label><strong>Hora inicio: </strong><span>{{ tour.tour_fechaHoraInicio}}</span></label>
            <br> 
            <label><strong>Hora fin: </strong><span>{{ tour.tour_fechaHoraFin }}</span></label>
            <br>
            <label><strong>Duración: </strong><span>{{ tour.tour_duracionHoras }}</span> Horas</label>
            <br>
            <button @click="addToCart" :id=i>Agregar al carrito</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Tours",

    data: function(){
        return {
            tours: []
        }
    },

    methods: {
        async getAllTours(){

            axios.get("https://back-despliegue.herokuapp.com/api/tour/listar/")
                .then((result) => {
                    this.tours = result.data.tours
                })
                .catch((e) => {
                    console.log(e)
                });
        },

        addToCart(event){
            this.tourId = this.tours[parseInt(event.srcElement.id)].tour_id
            this.$emit('addToCart',this.tourId)
        }
    },

    created(){
        this.getAllTours();
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');

.tours{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
    min-height: 80vh;
}

.tours .card{
    width: 330px;
    height: 600px;
    border-radius: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin: 20px;
    text-align: left;
    transition: all 0.25s;
    background-color: #fcfbf7;
}

.tours .card:hover{
    transform: translateY(-15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.tours .card img{
    width: 330px;
    height: 200px;
    margin-bottom: 20px;
}

.tours .card label{
    font-family: 'Poppins', sans-serif;
    margin: 20px;
}


.tours .card button{
    width: 80%;
    height: 30px;
    margin: 25px 30px;
    font-weight: 600;
    font-size: 16px;
    color: #eaa928;
    background-color:rgba(0, 0, 0, 0);
    border: 1px solid ;
    border-radius: 8px;
    cursor: pointer;
}

.tours .card button:hover{
    color: #fff;
    background-color: #eaa928;
}

</style>
