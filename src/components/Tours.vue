<template>
    <div id="tours" class="tours">
        <div v-for="tour in tours" :key="tour.ciu_nombre">
            <h1>Tours que ofrece la ciudad de {{ tour.ciu_nombre }}</h1>
            <label>Nombre: <span>{{ tour.tour_nombre }}</span></label>
            <br> 
            <label for="">Descripcion: <span>{{ tour.tour_descripcion }}</span></label>
            <br>
            <label for="">Precio: <span>{{ tour.tour_precio }}</span></label>
            <br> 
            <label for="">Hora inicio: <span>{{ tour.tour_fechaHoraInicio}}</span></label>
            <br> 
            <label for="">Hora fin: <span>{{ tour.tour_fechaHoraFin }}</span></label>
            <br>
            <label for="">Duracion: <span>{{ tour.tour_duracionHoras }}</span> Horas</label>
            <br>
            <button>Agregar al carrito</button>
        </div>
        <button id="data_bogota" ref="data_bogota" value="Bogota" @click="listarTours">Bogota</button>
        
    </div>
</template>

<style>
    #data_bogota{
        width: 20%;
        height: 5em;
    }
</style>

<script>
    import axios from 'axios';

export default {
    name: "Tours",

    //para los datos que se manejan en la pagina
    data: function(){
        return {
            tours: [],
        }
    },

    //se manejan las funciones como post, put, delete, get
    methods: {
        listarTours: function(){
            axios.get(
                "https://back-despliegue.herokuapp.com/api/tour/" + this.$refs.data_bogota.value
            )
            .then((response)=>{
                console.log(response.data);
                console.log(this.$refs.data_bogota.value);
                this.tours = response.data;
            })
            .catch((response) => {
                console.log(response.error);
            });
        }
    },
}
</script>