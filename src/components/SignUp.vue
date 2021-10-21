<template>
    <div class="registro_usuario">
        <div class="contenedor_registro_usuario">
            <h2>Registrarse</h2>
            <form v-on:submit.prevent="procesoRegistro">
                <input type="text" v-model="user.id" placeholder="Identificacion" required>
                <span class="error" v-if="user.id && !validarId">*El campo debe de ser solo numeros y min 7 caracteres.</span>
                <br>
                <select name="tipo_identificacion" v-model="user.usu_tipoId" id="tipo_identificacion" required>
                    <option value="">Selecciona una opcion</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjeria</option>
                    <option value="NIT">NIT</option>
                </select>
                <br>
                <input type="text" v-model="user.usu_nombreUsuario" placeholder="Nombre de usuario" required>
                <span class="error" v-if="user.usu_nombreUsuario && !validarUsuario">min 4 y Max 10 caracteres</span>
                <br>
                <input type="password" v-model="user.password" placeholder="Contraseña" required>
                <span class="error" v-if="user.password && !validarContra">*Min 4 y max 16 caracteres</span>
                <br>
                <input type="text" v-model="user.usu_nombre" placeholder="Nombres" required>
                <span class="error" v-if="user.usu_nombre && !validarNombre">*El campo solo requiere letras.</span>
                <br>
                <input type="text" v-model="user.usu_apellido1" placeholder="Primer apellido" required>
                <span class="error" v-if="user.usu_apellido1 && !validarApellido">*El campo solo requiere letras.</span>
                <br>
                <input type="text" v-model="user.usu_apellido2" placeholder="Segundo apellido" required>
                <span class="error" v-if="user.usu_apellido2 && !validarApellido2">*El campo solo requiere letras.</span>
                <br>
                <input type="email" v-model="user.usu_email" placeholder="Email" required>
                <span class="error" v-if="user.usu_email && !validarCorreo">*Ingrese un correo electronico valido.</span>
                <br>
                <input type="text" v-model="user.usu_telefonoCelular" placeholder="Telefono/Celular" required>
                <span class="error" v-if="user.usu_telefonoCelular && !validarTelefono">*El campo solo requiere de numeros sin espacios(min 7 y 10 max).</span>
                <br>
                <input type="text" v-model="user.usu_pais" placeholder="Pais" required>
                <span class="error" v-if="user.usu_pais && !validarPais">*El campo solo requiere de letras(Min 3).</span>
                <br>
                <input type="text" v-model="user.usu_ciudad" placeholder="Ciudad" required>
                <span class="error" v-if="user.usu_ciudad && !validarCiudad">*El campo solo requiere de letras(Min 3).</span>
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
                usu_telefonoCelular: "",
                usu_pais: "",
                usu_ciudad: ""
            }
        }
    },

    computed: {
        validarId() { return /^\d{7,14}$/.test(this.user.id); },//para validar que solo sean numeros y que tengan un rango de 7 a 14 digitos
        validarUsuario(){ return /^[a-zA-Z0-9\_\-]{4,10}$/.test(this.user.usu_nombreUsuario); }, //para validar que se ingresen minusculas, mayusculas, numeros, _ y guion, de 4 a 10 caracteres
        validarContra(){ return /^[a-zA-Z0-9\@\#\%\.\ñ\Ñ]{4,16}$/.test(this.user.password); }, //lo mismo que el anterior solo que se puede agregar la letra ñ
        validarNombre(){ return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(this.user.usu_nombre);}, //para validar solo letras incluyendo mayus, minus y acentos
        validarApellido(){ return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(this.user.usu_apellido1);}, //lo mismo que la anterior
        validarApellido2(){ return /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(this.user.usu_apellido2);},
        validarCorreo(){ return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.user.usu_email);},
        validarTelefono(){ return /^\d{7,10}$/.test(this.user.usu_telefonoCelular);},
        validarPais(){ return /^[a-zA-ZÀ-ÿ\s]{3,20}$/.test(this.user.usu_pais);},
        validarCiudad(){ return /^[a-zA-ZÀ-ÿ\s]{3,20}$/.test(this.user.usu_ciudad);},
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

    .error{ color: red; }
</style>