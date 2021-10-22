<template>
    <div class="cart">

        <h1 class="title">Compras Recientes</h1>

        <div class="purchase-info">

            <img :src="`https://github.com/sigi95/gr02-front-end/blob/main/src/assets/tours/${tour.tour_id}.png?raw=true`">

            <div class="labels">
                <label><strong>Documento: </strong></label>
                <label><strong>Tour: </strong></label>
                <label><strong>Numero de personas: </strong></label>
                <label><strong>Precio Total: </strong></label>
            </div>

            <div class="values">
                <label>{{ userId }}</label>
                <label>{{ tour.tour_nombre }}</label>
                <label>{{ numberPeople }}</label>
                <label>{{ totalPrice }} COP</label>
            </div>
                        
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
    name:'Cart',

    data(){
        return{
            userId: null,
            tourId: 0,
            numberPeople: 0,
            totalPrice: 0,
            tour: null
        }
    },

    methods: {

        verifyToken: async function () {

            return axios.post("https://back-despliegue.herokuapp.com/api/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}} )
                        .then((result) => {
                            localStorage.setItem("token_access", result.data.access);
                        })
                        .catch(() => {
                            if (Notification.permission !== "granted") {
                                Notification.requestPermission()
                            }
                            var title = "City Tour Travel"
                            var extra = {
                                icon: "favicon.ico",
                                body: "Debes iniciar sesión."
                            }
                            var noti = new Notification( title, extra)
                            setTimeout( function() { noti.close() }, 10000)
                            this.$emit('loadLogout');
                        });
        },

        async getData(){

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                if (Notification.permission !== "granted") {
                    Notification.requestPermission()
                }
                var title = "City Tour Travel"
                var extra = {
                    icon: "favicon.ico",
                    body: "Debes iniciar sesión."
                }
                var noti = new Notification( title, extra)
                setTimeout( function() { noti.close() }, 10000)
                this.$emit('loadLogout');
                return;
            }

            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();
            this.userId = userId

            await axios.get(`https://back-despliegue.herokuapp.com/api/carrito/${ userId }/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.tourId = result.data['data tour'].cc_tour_nombre_id
                    this.numberPeople = result.data['data tour'].cc_numeroPersonas
                    this.totalPrice = result.data['data tour'].cc_precioTotal
                })
                .catch(() => {
                    this.$emit('loadLogout')
                });

            await axios.get("https://back-despliegue.herokuapp.com/api/tour/listar/")
                .then((result) => {
                    this.tour =  result.data.tours.find((tour) => {
                        return tour.tour_id == this.tourId
                    })
                })
                .catch(() => {
                    this.$emit('loadLogout');
                });
        },

    },

    created(){
        this.getData()
    }
}

</script>

<style>

.cart{
    min-height: 80vh;
}

.purchase-info{
    display: flex;
    font-size: 28px;
    max-width: 1300px;
    background-color: rgb(249, 250, 237);
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    padding: 20px;
    margin: 20px;
}

.purchase-info:hover{
    transform: translateY(-15px);
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
}

.purchase-info img{
    width: 285px;
    border-radius: 8px;
}

.purchase-info .labels{
    display: flex;
    flex-direction: column;
    margin-left: 40px;
}

.purchase-info .values{
    display: flex;
    flex-direction: column;
    margin-left: 30px;
}



</style>