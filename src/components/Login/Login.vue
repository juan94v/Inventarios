

<template>
	<div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Login</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="email" v-model="usuario.email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                <small for="inputEmail">Correo electronico</small>
              </div>

              <div class="form-label-group">
                <input type="password" v-model="usuario.password" id="inputPassword" class="form-control" placeholder="Password" required>
                <small for="inputPassword">Password</small>
              </div>
              
              
           
              <button class="btn btn-primary btn-block" v-on:click.prevent="iniciar_sesion" type="submit">Conectarse</button>
              <a href="" class="small" v-on:click.prevent="register">¿No tienes cuenta?</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data(){
      return {
        entrando: false,
        usuario:{
          email: '',
          password: ''
        }
      }
    },
    name: 'App',
    methods: {
      register()
      {
        this.$router.push({name: 'register'})
      },
      recuperar()
      {
        this.$router.push({name: 'recuperar'})
      },
	  	iniciar_sesion()
      {
        console.log("Hola?")
        this.entrando = true;
        // console.log(this.usuario.email);
        // console.log(md5(this.usuario.password));
	  		
        this.$http.post('login', {
          usuario:
          {
            email:this.usuario.email,
            password:this.usuario.password
          }
        }).then(respuesta => {return respuesta.json();}).
        then(respuestaJson=>{
          {
            if (respuestaJson.res == true)
            {
              toastr.success("Bienvenido");
              this.continuar_menu();
            }
            if(respuestaJson.res == false)
            {
              toastr.warning("Ocurrio un problema");
              this.entrando = false;
            }
          }
        }).catch(function(error) {
            console.log(error);
        });
	  	},
    continuar_menu()
    {
      $("body").css({"overflow-y": "auto"});
      this.$router.push({ name: 'Menu'})
    }
	},
  mounted()
    {
      // window.scrollTo(0, 0);
    }
};
</script>

<style >
	
</style>