<template>
	<div class="container mt-2">
		<div v-bind:class="loading">
      		<div class="d-flex justify-content-center">
        		<div class="spinner-border m-5" role="status">
          			<span class="sr-only">Loading...</span>
        		</div>
      		</div>
    	</div>
		<div v-bind:class="result">
			<div class="row">
				<div class="col-12">
					<input id="upload" type="file"  name="files[]">
				</div>
			</div>
			<div class="row mt-3 justify-content-end">
				<div class="col-6">
					<button class="btn btn-primary" v-on:click="guardar">Guardar</button>
				</div>
			</div>
			<div class="row mt-5">
				<div class="col-12">
					<table id="result_table" class="table table-bordered table-sm table-hover">
					    <thead>
						    <tr>
						      <th scope="col">Nombre Artículo</th>
						      <th scope="col">Descripción</th>
						      <th scope="col">Cantidad</th>
						      <th scope="col">Codigo de barras</th>
						    </tr>
					  	</thead>
					  	<tbody>
						    <tr v-for="Excels in Excel" >
						      <td>{{Excels.nombre}}</td>
						      <td>{{Excels.descripcion}}</td>
						      <td>{{Excels.cantidad}}</td>
						      <td>{{Excels.barcode}}</td>
						    </tr>
					  	</tbody>
					</table>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<small>El archivo deberá contener los campos nombre, cantidad, descripción y barcode con minúsculas.</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				Excel: [],
				ExcelJson: [],
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
      
		        this.loading = 'd-none'
		        this.result = ''
			},
			guardar(){
				this.Cargando();
				if(this.Excel.length > 0)
				{
					this.$http.post('articulos/excel', {
			           articulo:this.Excel
			          }).then(respuesta => {return respuesta.json();}).
			            then(respuestaJson=>{
			              {
			                if (respuestaJson.res == true)
			                {
			                   toastr.clear()
			                   toastr.success("Articulos guardados");
			                  this.$router.push({name: 'articulos'});
			                }
			                if(respuestaJson.res == false)
			                {
			                 	toastr.warning("Ocurrio un problema");
			                 	console.log("error");
			                }
			              }
			            });
				}
				else
				{
					this.Listo();
					toastr.clear();
					toastr.info("No adjuntaste el Excel");
				}
			},
			cambio(){
				console.log("cambio")
			}
		},
		mounted(){
			this.Cargando();
			var that = this;
			
		
			document.getElementById('upload').addEventListener('change', handleFileSelect, false);
			 var ExcelToJSON = function() {
      			this.parseExcel = function(file) {
    				var reader = new FileReader();
        			reader.onload = function(e) {
          				var data = e.target.result;
          				var workbook = XLSX.read(data, {
            			type: 'binary'
      				});
      			workbook.SheetNames.forEach(function(sheetName) {
        			// Here is your object
            		var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            		var json_object = JSON.stringify(XL_row_object);
            		console.log(JSON.parse(json_object));
            		// jQuery( '#xlx_json' ).val( json_object );
            		that.Excel = JSON.parse(json_object)
      				})
      			
				};

        reader.onerror = function(ex) {
          console.log(ex);
        };

        reader.readAsBinaryString(file);
      };
  };

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
    
  }
  	this.Listo();
		}
	};
</script>