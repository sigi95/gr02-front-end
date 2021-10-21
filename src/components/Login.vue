<template>
    <div class="iniciarSesion_usuario">
        <div class="contenedor_iniciarSesion_usuario">
            <h2>Iniciar sesion</h2>
            <form v-on:submit.prevent="procesoIniciarSesion">
                <input type="text" v-model="user.usu_nombreUsuario" placeholder="Nombre de usuario">
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                <button type="submit"> Iniciar Sesion </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "IniciarSesion",

    data: function(){
        return {
            user: {
                usu_nombreUsuario: "",
                password: ""
            }
        }
    },

    methods: {
        procesoIniciarSesion: function(){
            axios.post(
                "https://back-despliegue.herokuapp.com/api/login/",
                this.user,
                {headers: {}}
            )
            .then((result) => {
                let dataLogin = {
                    usu_nombreUsuario: this.user.usu_nombreUsuario,
                    token_access: result.data.access,
                    token_refresh: result.data.refresh,
                }
                
                this.$emit('completedLogin', dataLogin)
                //funcion para mostrar las notificaciones cuando el usuario inicia sesion
                if (Notification.permission !== "granted") {
                    Notification.requestPermission()
                }
                var title = "Bienvenido a City Tour Travel"
                var extra = {
                    icon: "favicon.ico.ico.ico",
                    body: "Usuario: " + this.user.usu_nombreUsuario
                }
                var noti = new Notification( title, extra)
                setTimeout( function() { noti.close() }, 10000)
            })
            .catch((error) => {
                if(error.response.status == "401")
                    alert("ERROR 401: Credenciales Incorrectas.");
            })
        }
    }
}
</script>
<style>
    .iniciarSesion_usuario{
        width: 40em;
        height: 25em;
        align-content: center;
        display: flex;
        margin: 2em auto;
        padding: 3em;
    }

    .contenedor_iniciarSesion_usuario{
        width: 100%;
        padding: 3em;
        border: 1px solid green;
        border-radius: 2em;
        align-items: center;
        text-align: center;
        -webkit-box-shadow: -1px 1px 15px -2px rgba(0,0,0,0.98); 
        box-shadow: -1px 1px 15px -2px rgba(0,0,0,0.98);
    }

    .contenedor_iniciarSesion_usuario form {
        display: grid;
        width: 50%;
        align-content: center;
        padding: 3em;
        margin: 1em auto;
    }

    .contenedor_iniciarSesion_usuario > form > input {
        text-decoration: none;
        background-color: #fff;
        color: #eaa928;
        padding: 6px 12px;
        margin: 8px;
        border-radius: 5px;
        font-size: 17px;
        cursor: default;
    }

    .contenedor_iniciarSesion_usuario > form > button {
        text-decoration: none;
        background-color: #fff;
        color: #eaa928;
        padding: 6px 12px;
        margin: 8px;
        border-radius: 5px;
        font-size: 17px;
        cursor: pointer;        
        transition: background-color .5s;
    }


    .contenedor_iniciarSesion_usuario > form > button:hover {
        background-color:#eaa928;
        color:#464140;
    }
</style>

