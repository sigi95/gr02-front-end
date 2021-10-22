<template>
    <div class="cart">

        <h1 class="title">Tours Comprados ({{toursPurchased}}) </h1>

        <div v-if="toursPurchased>0" class="tours-purchased">

            <div v-for="(purchase ,i) in cart" :key="i" class="purchase-info">
                <img :src="`https://github.com/sigi95/gr02-front-end/blob/main/src/assets/tours/${purchase.cc_tour_nombre_id}.png?raw=true`">

                <div class="labels">
                    <label><strong>Documento: </strong></label>
                    <label><strong>Tour: </strong></label>
                    <label><strong>Numero de personas: </strong></label>
                    <label><strong>Precio Total: </strong></label>
                </div>
                <div class="values">
                    <label>{{ userId }}</label>
                    <label>{{ toursNames[i] }}</label>
                    <label>{{ purchase.cc_numeroPersonas }}</label>
                    <label>{{ purchase.cc_precioTotal }} COP</label>
                </div>         
            </div>
        </div> 

        <div v-else class="noTours">
            <h2>Aún no has comprado tours.</h2>
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
            cart: [],
            toursNames: [],
            toursPurchased: 0
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
                    this.cart = result.data["data tour"]
                    this.toursPurchased = this.cart.length
                    if (this.toursPurchased>0)
                        this.getToursNames()
                })
                .catch((e) => {
                    console.log('No se han comprado tours')
                });

        },

        async getToursNames(){
            
            await axios.get("https://back-despliegue.herokuapp.com/api/tour/listar/")
                .then((result) => {
                    let tours = result.data.tours
                    for (let i=0;i<this.cart.length;i++){
                        for(let j=0;j<tours.length;j++){
                            if (this.cart[i].cc_tour_nombre_id == tours[j].tour_id){
                                this.toursNames.push(tours[j].tour_nombre)
                            }
                        }
                    }
                })
                .catch(() => {
                    console.log('No se han comprado tours')
                });
        }

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
    margin: 40px 20px 40px 20px;
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

.noTours h2{
    margin: 20px;
}


</style>