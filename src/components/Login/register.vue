<template>
	<div class="container-fluid">
    <div class="row ">
      <div class="col-12">
      </div>
    </div>
      <form class="align-items-start mt-5">
      	
      	<div class="row align align-items-start justify-content-center pb-5 mt-5">
      		<div class="col-auto">
      			<p class="h2">Nuevo usuarios</p>		
      		</div>
      	</div>
      	

        <div class="row justify-content-center">  
        	<div class="col-4 form-label-group">
            	<input v-model="usuario.nomusuario" name="Nombre" type="text" id="Nombre" class="form-control" placeholder="Nombre" required autofocus>
            	<label for="Nombre">Nombre</label>
            </div>
          	<div class="col-4 form-label-group">
          		<input required autofocus v-model="usuario.email" name="Correo" type="email" id="Correo" class="form-control" placeholder="Correo electronico" >
              	<label for="Correo">Correo electronico</label>
          	</div>
        </div>

        <div class="row justify-content-center">
         	<div class="col-4 form-label-group">
            	<input v-model="usuario.password" name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            	<label for="inputPassword">Contraseña</label>
            </div>
            <div class="col-4 form-label-group">
            	<input v-model="usuario.conf_password" name="Conf_password" type="password" id="Conf_password" class="form-control" placeholder="Confirmar contraseña" required>
            	<label for="Conf_password">Confirmar contraseña</label>
            </div>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-3 col-md-2">
            <button v-on:click.prevent="nuevo_usuario" class="btn btn-lg btn-primary btn-block btn-login mb-2" type="submit">Registrar</button>    
          </div>    
        </div>
        

        <div class="text-center">
          <a class="small" href="#" v-on:click.prevent="login">Iniciar sesión</a>
        </div>

      </form>
  </div>
</template>

<script>
	export default {
    data(){
      return {
        usuario: {
          nomusuario:'',
          email:'',
          password:'',
          conf_password: ''
        }
      }
    },
		methods: {
      nuevo_usuario()
      {
        if(!this.usuario.nomusuario){
          toastr.warning("Nombre de usuario vacio");
        }
        else if(!this.usuario.email){
          toastr.warning("Email vacio");
        }
        else if(!this.usuario.password)
        {
          toastr.warning("Contraseña vacio");
        }
        else if(this.usuario.password === this.usuario.conf_password)
        {
          console.log(this.usuario.nomusuario);
          console.log(this.usuario.email);
          console.log(this.usuario.password);
          this.$http.post('register', {
            usuario: 
            {
              nomusuario: this.usuario.nomusuario,
              email: this.usuario.email,
              password: this.usuario.password  
            }
          }).then(respuesta => {return respuesta.json();}).
            then(respuestaJson=>{
              {
                if(respuestaJson.val == "1")
                {
                  toastr.clear();
                  toastr.warning("El correo ya se encuentra en uso");
                }
                if (respuestaJson.res == true)
                {
                  this.$router.push({name:'login'});
                }
                if(respuestaJson.res == false)
                {
                  console.log("no registrado")
                }
              }
            })
        }
        else  
        {
          // ponerlo en mensaje para el cliente
          toastr.warning("La contraseña difiere de la validacion contraseña");
          toastr.clear();
        }
      },
			login()
			{
				this.$router.push({name:'login'})
			}
		}
	};
</script>

<style>

.container-fluid {
  margin-top: 55px;
}
</style>
