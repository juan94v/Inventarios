<template>
	<div>	
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	  		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	    		<span class="navbar-toggler-icon"></span>
	  		</button>
	    	<div class="collapse navbar-collapse" id="navbarNav">
		        <ul class="navbar-nav ml-auto">
		            <li class="nav-item active">
		            	<a class="nav-link" href="#" v-on:click.prevent="articulos" >Articulos</a>
		            </li>
		            <li class="nav-item active">
		            	<a class="nav-link" href="#" v-on:click.prevent="usuarios">Usuarios</a>
		            </li>
		            <li class="nav-item active">
		            	<a class="nav-link" href="#" v-on:click.prevent="salir">Salir</a>
		            </li>
		        </ul>
		    </div>
		</nav>
		<div class="row">
			<div class="col-12">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			articulos() {
				this.$router.push({name: 'articulos'});
			},
			usuarios() {
				this.$router.push({name: 'usuarios'});
			},
			salir() {
				this.$router.push({name: 'login'})
			}
		}
	};
</script>