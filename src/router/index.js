import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/FIME/Menu/menu'
import login from '@/components/Login/Login'
import register from '@/components/Login/register'
import articulos from '@/components/FIME/Articulos/articulos'
import excel from '@/components/FIME/Articulos/excel'
import articulo from '@/components/FIME/Articulos/articulo'
import usuarios from '@/components/FIME/Usuarios/usuarios'
import usuario from '@/components/FIME/Usuarios/usuario'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      children: [
      	  {
      	  	path: 'articulos',
      	  	name: 'articulos',
      	  	component: articulos
      	  },
	      {
	      	path: 'articulo',
	      	name: 'articulo',
	      	component: articulo
	      },
        {
          path: 'articulo/excel',
          name: 'excel',
          component: excel
        },
	      {
	      	path: 'articulo/editar/:idarticulo',
	      	name: 'editar_articulo',
	      	component: articulo
	      },
	      {
	      	path: 'usuarios',
	      	name: 'usuarios',
	      	component: usuarios
	      },
	      {
	      	path: 'usuario',
	      	name: 'usuario',
	      	component: usuario
	      },
        {
          path: 'usuario/editar/:idusuario',
          name: 'editar_usuario',
          component: usuario
        }
      ]
    },
    {
    	path: '/register',
    	name: 'register',
    	component: register
    }
  ]
})
