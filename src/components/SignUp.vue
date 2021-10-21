<template>
    <div class="registro_usuario">
        <div class="contenedor_registro_usuario">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="procesoRegistro">
                <input type="text" v-model="user.id" placeholder="Identificacion">
                <br>
                <select name="tipo_identificacion" v-model="user.usu_tipoId" id="tipo_identificacion">
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
            })
            .catch((error) => {
                console.log(error)
                alert("ERROR: Fallo en el registro.", error);
            });
        }
    }

}
</script>