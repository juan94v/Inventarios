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
			<div class="row">
				<div class="col-12 mt-5">
					<h2>Artículos</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-4 mt-5">
					 <label for="Nombre">Nombre</label>
	      			 <input type="text" v-model="articulo.nomarticulo" class="form-control" id="nomarticulo">
				</div>
				<div class="col-4 mt-5">
					 <label for="Cantidad">Cantidad</label>
	      			 <input type="number" v-model="articulo.cantidad" class="form-control" id="cantidad" >
				</div>
				<div class="col-4 mt-5">
					 <label for="Cantidad">Codigo de barras</label>
	      			 <input type="text" v-model="articulo.barcode" class="form-control" id="cantidad" >
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-8 mt-5">
					<label>Descripción</label>
					<textarea class="form-control" v-model="articulo.descripcion" id="descripcion" rows="5"></textarea>
				</div>				
			</div>
			<div class="row">
				<div class="col-12 mt-5">
					<button v-bind:class="button_agregar" v-bind:disabled="button" v-on:click.stop="Guardar">Agregar</button>
					<button v-bind:class="button_modificar" v-on:click.stop="Guardar">Modificar</button>
					<button v-bind:class="button_borrar" v-on:click.stop="Guardar(2)">Eliminar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				articulo: {
					nomarticulo: '',
					cantidad: '0',
					descripcion: '',
					barcode: '',
					status: ''
				},
				button: false,
				modo: '1',
				button_agregar: 'btn btn-primary d-none',
				button_modificar: 'btn btn-success d-none',
				button_borrar: 'btn btn-danger d-none',
				result: 'd-none',
				loading: ''
			}
		},
		methods: {
			Listo()
			{
				this.loading = 'd-none'
				this.result = ''
			},
			Cargando()
			{
				this.loading = ''
				this.result = 'd-none'
			},
			Guardar(param)
			{	
			
				console.log("iniciando proceso de guardado. . . ")
				if(!this.articulo.nomarticulo && param != 2)
				{
					toastr.warning("El nombre del articulo no puede ir vacio");
				}
				else if (!this.articulo.cantidad && param != 2)
				{
					toastr.warning("la cantidad del articulo no puede ir vacio");
				}
				else if (!this.articulo.descripcion && param != 2)
				{
					toastr.warning("la descripción del articulo no puede ir vacio");
				}		
				else{
					this.button = true
					this.Cargando();
					if(this.modo == 1)
					{
						this.$http.post('articulos', {
			           articulo:this.articulo
			          }).then(respuesta => {return respuesta.json();}).
			            then(respuestaJson=>{
			              {
			                if (respuestaJson.res == true)
			                {
			                   toastr.success("Articulo guardado");
			                  this.$router.push({name: 'articulos'});
			                }
			                if(respuestaJson.res == false)
			                {
			                 	toastr.clear();
			                 	toastr.warning("Ocurrio un problema");
			                }
			              }
			            });
			            this.button = true;
					}
					else if(this.modo == 2)
					{
						this.articulo.status = 1;
						if(param == 2)
						{
							this.articulo.status = 2
						}
						this.$http.put('articulos/'+this.$route.params.idarticulo, {
				            articulo:this.articulo
				        }).then(respuesta => {return respuesta.json();}).
			            then(respuestaJson=>{
			              {
			                if (respuestaJson.res == true)
			                {
			                  if(param == 2)
			                  {
			                  	toastr.clear();
			                  	toastr.error("Articulo eliminado");
			                  }
			                  else
			                  {
			                  	toastr.clear();
			                  	toastr.success("Articulo editado");	
			                  }
			                  
			                  this.$router.push({name: 'articulos'});
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
			Consultar()
			{
				this.$http.get('articulos/'+this.$route.params.idarticulo).
			    then(respuesta=>{return respuesta.json();}).
			    then(respuestaJson=>{
			        if (respuestaJson.resp=='excelente') {
			        	this.articulo = respuestaJson.result[0];
			        }else{
			        	console.log("error en else");
			        }})
			       .catch(error=>{
			            console.log("error en catch");
			            // this.$router.push({name:"Camiones"});
			        });
			}
		},
		created()
		{
			if(this.$route.params.idarticulo)
			{
				this.modo = 2;
			}
			if(this.modo == 1)
			{
				this.button_agregar = 'btn btn-primary';
			}
			if(this.modo == 2)
			{
				this.button_borrar = 'btn btn-danger';
				this.button_modificar = 'btn btn-success';
				this.Consultar();
			}
			this.Listo();
		}

	}
</script>