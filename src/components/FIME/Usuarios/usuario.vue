<template>
	<div class="container">
		<div v-bind:class="loading">
      		<div class="d-flex justify-content-center">
        		<div class="spinner-border m-5" role="status">
          			<span class="sr-only">Loading...</span>
        		</div>
      		</div>
    	</div>
    	<div v-bind:class="result">
			<div class="row mt-5">
				<div class="col-12">
					<h2>Usuarios</h2>
				</div>
			</div>
			<div class="row mt-5 justify-content-center">
				<div class="col-4">
					<label for="Nombre">Nombre</label>
					<input v-model="usuario.nomusuario" class="form-control" type="text" name="Nombre" id="Nombre">
				</div>
			</div>
			<div class="row mt-5 justify-content-center">	
				<div class="col-4">
					<label for="Correo">Correo</label>
					<input v-model="usuario.email" disabled class="form-control" type="email" name="Correo" id="Correo">
				</div>
				<div class="col-4">
					<label for="Password">Password</label>
					<input v-model="usuario.password" class="form-control" disabled type="password" name="Password" id="Password">
				</div>
			</div>
		<div class="row justify-content-center">
			<div class="col-12 mt-5">
				   <button class="btn btn-success" v-on:click="guardar(1)">Modificar</button>
				   <button class="btn btn-danger" v-on:click="guardar(2)">Borrar</button>
			</div>
		</div>
    	</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				usuario: {
					nomusuario: '',
					email: '',
					password: '',
					status: '',
				},
				loading: '',
				result: 'd-none'

			}
		},
		methods:
		{
			Cargando()
			{
				this.loading = ''
				this.result = 'd-none'
			},
			Listo()
			{
				this.loading = 'd-none'
				this.result = ''
			},
			consultar()
			{
				this.Cargando();
				this.$http.get('usuarios/'+this.$route.params.idusuario).
			    then(respuesta=>{return respuesta.json();}).
			    then(respuestaJson=>{
			        if (respuestaJson.resp=='excelente') {
			        	this.usuario = respuestaJson.result[0];
			        	this.Listo();
			        }else{
			        	console.log("error en else");
			        }})
			       .catch(error=>{
			            console.log("error en catch");
			            // this.$router.push({name:"Camiones"});
			        });
			},
			guardar(status)
			{
				if(!this.usuario.nomusuario)
				{
					toastr.clear()
					toastr.warning("Nombre no puede ir vacio")
				}
				else if(!this.usuario.email)
				{
					toastr.clear();
					toastr.warning("email no puede ir vacio")
				}
				else
				{
					this.Cargando();
					this.usuario.status = status;
					this.$http.put('usuarios/'+this.$route.params.idusuario, {
				            usuario:this.usuario
				        }).then(respuesta => {return respuesta.json();}).
			            then(respuestaJson=>{
			              {
			                if (respuestaJson.res == true)
			                {
			                	if(status == 2)
			                	{
			                		toastr.error("Usuario eliminado");	
			                	}
			                	else
			                	{
			                		toastr.success("Usuario editado");	
			                	}
			                  	
			                  	this.$router.push({name: 'usuarios'});
			                }
			                if(respuestaJson.res == false)
			                {
								toastr.clear();
								toastr.warning("Ocurrio un problema")
			                }
			              }
		    });
				}
				
			}
		},
		created()
		{
			this.consultar();
		}
	};
</script>