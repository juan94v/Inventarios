<template>
	<div class="container-fluid">
    <div class="row ">
      <div class="col-12">
        <img src="https://guiamexico.com.mx/Imagenes/m/209161772-1-repzone-ingenieria-automotriz.png" class="img-fluid" alt="Responsive image">
      </div>
    </div>
      <form class="align-items-start mt-5">
      	
      	<div class="row align align-items-start justify-content-center pb-5">
      		<div class="col-auto">
      			<p class="h2">Recuperar contraseña</p>		
      		</div>
      	</div>
      	
        <div class="row justify-content-center">
        	<div class="col-7 form-label-group">
        		<input name="Correo" type="email" id="Correo" class="form-control" placeholder="Correo electronico" required autofocus>
            	<label for="Correo">Correo electronico</label>
              <small id="passwordHelpBlock" class="form-text text-muted">
                Introduce el correo electrónico para buscar tu cuenta 
            </small>
        	</div>
        </div>
        
        <div class="row justify-content-center">
          <div class="col-6">
            <button class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Recuperar</button>    
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
    name: 'App',
    methods: {
      login()
      {
        this.$router.push({name:'login'})
      }
    }
  };
</script>

<style>

</style>
