<template>
    <div class="registro_usuario">
        <div class="contenedor_registro_usuario">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="procesoRegistro">
                <input type="text" v-model="user.id" placeholder="Identificacion">
                <br>
                <select name="tipo_identificacion" v-model="user.usu_tipoId" id="tipo_identificacion">
                    <option value="">Selecciona una opcion</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjeria</option>
                    <option value="NIT">NIT</option>
                </select>
                <br>
                <input type="text" v-model="user.usu_nombreUsuario" placeholder="Nombre de usuario">
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña">
                <br>
                <input type="text" v-model="user.usu_nombre" placeholder="Nombres">
                <br>
                <input type="text" v-model="user.usu_apellido1" placeholder="Primer apellido">
                <br>
                <input type="text" v-model="user.usu_apellido2" placeholder="Segundo apellido">
                <br>
                <input type="email" v-model="user.usu_email" placeholder="Email">
                <br>
                <input type="text" v-model="user.usu_telefonoCelular" placeholder="Telefono/Celular">
                <br>
                <input type="text" v-model="user.usu_pais" placeholder="Pais">
                <br>
                <input type="text" v-model="user.usu_ciudad" placeholder="Ciudad">
                <br>
                <button type="submit"> Registrarse </button>
            </form>
        </div>
    </div>
</template>

<script>
//importo la libreria axios
import axios from 'axios';

export default {
    name: "IniciarSesion",

    data: function(){
        return {
            user: {
                id: "",
                usu_tipoId: "",
                usu_nombreUsuario: "",
                password: "",
                usu_nombre: "",
                usu_apellido1: "",
                usu_apellido2: "",
                usu_email: "",
                usu_pais: "",
                usu_ciudad: ""
            }
        }
    },

    //Se llama al proceso para hacer el respectivo inicio de sesion
    methods: {
        procesoRegistro: function(){
            axios.post(
                "https://back-despliegue.herokuapp.com/api/usuario/registro/",
                this.user,
                {headers:{}}
            )
            .then((result) => {
                let dataRegistro = {
                    usu_nombreUsuario: this.user.usu_nombreUsuario,
                    token_access: result.data.access,
                    token_refresh: result.data.refresh
                }
                this.$emit('completedSignUp', dataRegistro)

                if (Notification.permission !== "granted") {
                    Notification.requestPermission()
                }
                var title = "City Tour Travel"
                var extra = {
                    icon: "favicon.ico.ico.ico",
                    body: "Gracias por registrarte en City Tour Travel, los datos de usuario y contraseña se enviaron a tu correo electronico."
                }
                var noti = new Notification( title, extra)
                setTimeout( function() { noti.close() }, 10000)
            })
            .catch((error) => {
                //console.log(error)
                //alert("ERROR: Fallo en el registro.", error);
                if (Notification.permission !== "granted") {
                    Notification.requestPermission()
                }
                var title = "Error al registrarse"
                var extra = {
                    icon: "favicon.ico.ico.ico",
                    body: "Parece que a ocurrido un fallo a la hora de realizar tu registro."
                }
                var noti = new Notification( title, extra)
                setTimeout( function() { noti.close() }, 10000)
            });
        }
    }

}
</script>

<style>
    .registro_usuario{
        width: 40em;
        height: 60em;
        align-content: center;
        display: flex;
        margin: 2em auto;
        padding: 3em;
    }

    .contenedor_registro_usuario{
        width: 100%;
        padding: 2em;
        height: 60em;
        border: 1px solid green;
        border-radius: 2em;
        align-items: center;
        text-align: center;
    }

    .contenedor_registro_usuario form {
        display: grid;
        width: 50%;
        align-content: center;
        padding: 0;
        margin: 1em auto;
    }

    .contenedor_registro_usuario > form > input {
        text-decoration: none;
        background-color: #fff;
        color: #eaa928;
        padding: 6px 12px;
        margin: 8px;
        border-radius: 5px;
        font-size: 17px;
        cursor: default;
        height: 1em;
    }

    .contenedor_registro_usuario > form > select {
        text-decoration: none;
        background-color: #fff;
        color: #eaa928;
        padding: 6px 12px;
        margin: 8px;
        border-radius: 5px;
        font-size: 17px;
        cursor: default;
        height: 2em;
    }

    .contenedor_registro_usuario > form > button {
        text-decoration: none;
        background-color: #fff;
        color: #eaa928;
        padding: 6px 12px;
        margin: 8px;
        border-radius: 5px;
        font-size: 17px;
        cursor: default;
    }
</style>