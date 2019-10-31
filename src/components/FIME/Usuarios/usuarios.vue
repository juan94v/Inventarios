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
				<h5>Catalogo de Usuarios</h5>
			</div>
			</div>
			<div class="row mt-5">
				<div class="col-12">
					<table id="result_table" class="table table-bordered table-sm table-hover">
					  <thead>
					    <tr>
					      <th scope="col">Nombre</th>
					      <th scope="col">Email</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="usuario in usuarios" @click.prevent="editar(usuario.idusuario)">
					      <td>{{usuario.nomusuario}}</td>
					      <td>{{usuario.email}}</td>
					    </tr>
					  </tbody>
					</table>
				</div>
			</div>
    	</div>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				usuarios: [],
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
				var that=this;
      
		        $(document).ready(function(){
		        	$('#result_table').DataTable();
		      			that.loading='d-none';
		      			that.result=''; 
		      	});
			},
			editar(idusuario)
			{
				this.$router.push({name: 'editar_usuario', params:{idusuario:idusuario}})
			}
		},
		mounted()
		{
			this.Cargando();
			this.$http.get('usuarios').then(respuesta=>{
				return respuesta.json()
			}).then(respuestaJson=>{
				if(respuestaJson.resp=='excelente')
				{
					this.usuarios= respuestaJson.result;
					this.Listo();
				}
				else
				{
					console.log("error");
				}
			})
		}
	}
</script>
