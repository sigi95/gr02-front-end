<template>
    <div class="AddTour">
        
        <h1 class="title">{{ tour.tour_nombre }}</h1>

        <div class="info">

            <img src="../assets/tours/prueba.jpg">

            <div class="description">
                <label> <strong>Ciudad: </strong> {{ tour.ciu_nombre_id }}</label>
                <br>
                <label> <strong>Descripción: </strong> {{ tour.tour_descripcion }}</label>
                <br>
                <label> <strong>Precio: </strong> {{ tour.tour_precio }}</label>
                <br>
                <label> <strong>Fecha Inicio: </strong> {{ tour.tour_fechaHoraInicio }}</label>
                <br>
                <label> <strong>Fecha Fin: </strong> {{ tour.tour_fechaHoraFin }}</label>
                <br>
                <label> <strong>Duracion: </strong> {{ tour.tour_duracionHoras }}  horas</label>
                <br>
                <label> <strong>Transporte: </strong> {{ tour.tour_transporte }}</label>
                <br>
                <label> <strong>Alimentación: </strong> {{ tour.tour_alimentacion }}</label>
                <br>
                <label> <strong>Hospedaje: </strong> {{ tour.tour_hospedaje }}</label>
                <br>
                <label> <strong>Kilometros: </strong> {{ tour.tour_kilometros }}</label>
                <br>
                <label> <strong>Inicio: </strong> {{ tour.tour_inicio }}</label>
                <br>
                <label> <strong>Fin: </strong> {{ tour.tour_fin }}</label>
            </div>

        </div>

        <div class="buy">

            <h2>Detalle Compra</h2>

            <div class="buy-info">

                <div class="labels">
                    <label><strong>Documento: </strong></label>
                    <label><strong>Cantidad de Personas: </strong></label>
                    <label><strong>Total: </strong></label>
                </div>
                <div class="values">
                    <label>{{ userId }}</label>
                    <input type="number" v-model="numberPeople">                
                    <label>{{ total }}</label>
                </div>

                <button @click="buyTour">Comprar Tour</button>
            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default {
    name: 'AddTour',

    data: function(){
        return{
            tourId: this.$route.params.id,
            tour: {},
            userId: null,
            numberPeople: 0
        }
    },

    computed: {
        total(){
            return this.numberPeople * this.tour.tour_precio
        }
    },

    methods: {

        verifyToken: async function () {

            return axios.post("https://back-despliegue.herokuapp.com/api/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}} )
                        .then((result) => {
                            localStorage.setItem("token_access", result.data.access);
                        })
                        .catch(() => {
                            alert("Debes iniciar sesión para poder comprar tours")
                            this.$emit('loadLogout');
                        });
        },

        async getData(){

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                alert("Debes iniciar sesión para poder comprar tours")
                this.$emit('loadLogout');
                return;
            }

            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            this.userId = userId

            await axios.get("https://back-despliegue.herokuapp.com/api/tour/listar/")
                .then((result) => {
                    let tours = result.data.tours
                    this.tour = tours.find((tour) => {
                        return tour.tour_id == this.tourId
                    })
                })
                .catch(() => {
                    this.$emit('loadLogout');
                });
        },

        async buyTour(){

            if (this.numberPeople < 1){
                alert("El número de personas debe ser mayor o igual a 1")
                return;
            }

            let data = {
                cc_usu_id: this.userId,
                cc_tour_nombre: this.tourId,
                cc_numeroPersonas: this.numberPeople,
                cc_precioTotal: this.total
            }

            await this.verifyToken();
            let token = localStorage.getItem("token_access");

            await axios.post( `https://back-despliegue.herokuapp.com/api/carrito/registro/`, data, {headers: {'Authorization': `Bearer ${token}`}} )
                .then((result) => {
                    alert("Compra Realizada Exitosamente")
                    this.$emit('loadTours')
                })
                .catch((error) => {
                    alert("Ocurrió un Error")
                    console.log(error)
                })
        }
    },

    created(){
        this.getData()
    }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');

body{
    font-family: 'Poppins', sans-serif;
}

.info{
    margin: 40px;
    display: flex;
    width: 90;


}

.info img{
    width: 50%;
}

.info .description{
    width: 50%;
    margin-left: 60px;
    font-size: 20px;
}

.buy{
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-left: 50px;

}

.buy h2{
    color: #eaa928;
    text-align: center;
    align-content: center;
}

.buy-info{
    font-size: 25px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
}

.buy-info .labels{
    display: flex;
    flex-direction: column;
}

.buy-info .values{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}

.buy-info .values input{
    margin-bottom: 5px;
    margin-top: 5px;
    font-size: 20px;
}

.buy button{
    width: 100%;
    height: 30px;
    font-weight: 600;
	font-size: 16px;
    color: #eaa928;
    margin-top: 15px;
    margin-bottom: 15px;
	background-color:rgba(0, 0, 0, 0);
	border: 1px solid ;
    border-radius: 8px;
	cursor: pointer;
}

.buy button:hover{
    color: #fff;
	background-color: #eaa928;
}



</style>