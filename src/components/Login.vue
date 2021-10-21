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
            })
            .catch((error) => {
                if(error.response.status == "401")
                    alert("ERROR 401: Credenciales Incorrectas.");
            })
        }
    }
}
</script>