<template>
	<div class="container">
		
    	<div v-bind:class="result">
			<div class="row mt-5">
				<div class="col-2">
					<button class="btn btn-danger" v-on:click="borrar">Borrar todo</button>
				</div>
				<div class="col-7">
					<h5>Catálogo de Artículos</h5>
				</div>
				<div class="col-1">
					<button class="btn btn-primary" v-on:click="nuevo">Agregar</button>
				</div>
				<div class="col-2 ">
					<button class="btn btn-success" v-on:click="excel">Excel <i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
				</div>
			</div>
			<div class="row mt-5">
				<div class="col-12" v-if="articulos.length > 0">
					<table id="result_table" class="table table-bordered table-sm table-hover">
					  <thead>
					    <tr>
					      <th scope="col">Nombre Artículo</th>
					      <th scope="col">Descripción</th>
					      <th scope="col">Cantidad</th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="articulo in articulos" :key="articulo.idarticulo" v-on:click="editar(articulo.idarticulo)">
					      <td>{{articulo.nomarticulo}}</td>
					      <td>{{articulo.descripcion}}</td>
					      <td>{{articulo.cantidad}}</td>
					    </tr>
					  </tbody>
					</table>
				</div>
				<div class="col-12 mt-5" v-else>
					<div class="alert alert-danger" role="alert">
					 	No hay artículos registrados
					</div>
				</div>
			</div>
    	</div>
	</div>	
</template>

<script>
	export default {
		data() {
			return {
				articulos: [],
				componentKey: 0,
				loading: '',
				result: 'd-none'
			}
		},
		methods: {
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
			consultar()
			{
				this.$http.get('articulos').then(respuesta=>{return respuesta.json()})
	        	.then(respuestaJson=>{
	          		if (respuestaJson.resp=='excelente') {
	            		this.articulos = respuestaJson.result;
	            		if(this.articulos.length == 0)
	            		{
	            			toastr.clear();
	            			toastr.info("No hay articulos");
	            			this.articulos = '';
	            		}
	            		this.Listo();
	          		}else{
	            		toastr:clear();
	            		toastr.warning("Ups! algo anduvo mal. . .")
	          		}
	    		}).catch(error=>{
	    			toastr.clear();
	            	toastr.warning("Ups! algo anduvo mal. . .")
	        	});
			},
			nuevo()
			{
				this.$router.push({ name:'articulo'})
			},
			borrar()
			{
				if(confirm("¿Esta seguro que desea borrar todos los articulos?"))
				{
					this.$http.delete('articulos', {
		           	articulo:this.articulo
		          	}).then(respuesta => {return respuesta.json();}).
		            then(respuestaJson=>{
		              {
		                if (respuestaJson.res == true)
		                {
		                	toastr.clear();
		                   	toastr.warning("Articulos eliminados");
		                   	this.consultar();
		                }
		                if(respuestaJson.res == false)
		                {
		                 	toastr.clear();
		                 	toastr.warning("Ocurrio un problema");
		                 	this.consultar();
		                }
		              }
		            });

				}
			},
			excel()
			{
				this.$router.push({ name: 'excel'})
			},
			editar(idarticulo)
			{
				this.$router.push({name:'editar_articulo', params:{idarticulo:idarticulo}});
			}
		},
		mounted() {
			this.Cargando();
			this.consultar();
		}
	};
</script>
