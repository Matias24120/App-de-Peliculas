let miApp = new Vue({
	el: "#miapp",
	data : {
		// Mis productos
		productos : productos,

		// Array carrito.
		carrito : [],
		// Guarda los Ids de los productos para verificar si ya existen.
		productosIds: [],
		agregado : "",
		ElCarritoEstaVacio : "",
		mensaje : "",

		// Filtro para los productos
		filtro: ""
	},
	created() 
	{
		this.leerDatos();
		this.checkearCantidad();
	},
	computed : {
		// Metodos para los productos
		buscarProductos() 
		{
			// Filtramos el array
			let filtro = this.filtro.trim();
			let producto = this.productos.filter(producto => producto.nombre.toLowerCase().includes(this.filtro.toLowerCase()));

			// Si hay algo, que lo retorne sino devuelve falso y muestra el mensaje.
			return producto.length > 0 ? producto : false;
		},
		cantidadDeProductosEnElCarrito() 
		{	
			let total = 0;
			this.carrito.forEach(dato => {
				total += dato.cantidad;
			})
			return total;
		},
		precioFinal() 
		{
			let totalCarrito = 0;
			this.carrito.forEach(dato => {
				totalCarrito += dato.precio * dato.cantidad;
			})
			return Math.round(totalCarrito);
		}
	},
	methods : {

		// Metodos del carrito
		agregarAlCarrito(id, nombre, precio) 
		{
			let indice = this.productosIds.indexOf(id);
			if (indice != -1) {
				// Si existe
				for (let datos of this.carrito) {
					// Le agrego más cantidad
					if (datos.id === id) {
						datos.cantidad++;
					}
				}
			} else {
				// Si no existe, lo agrego. 
				this.productosIds.push(id);
				this.carrito.push({
					id : id,
					nombre : nombre,
					precio : precio,
					imagen : `imagenes/${id}.jpg`,
					cantidad : 1
				})
			}
			
			this.notificarUsuario();

			this.ElCarritoEstaVacio = false;
			// Guardamos los datos en el LocalStorage
			this.actualizarDatos();
		},
		vaciarCarrito() 
		{
			this.carrito = [];
			this.productosIds = [];

			// Actualizamos los datos.
			this.actualizarDatos();
			this.ElCarritoEstaVacio = true;
		},
		eliminarProducto(indice)
		{
			this.carrito.splice(indice, 1);
			this.productosIds.splice(indice, 1);
			if (this.productosIds.length === 0) {
				this.ElCarritoEstaVacio = true;
				this.mensaje = "No agregaste ningún producto";
			}
			this.actualizarDatos();
		},
		notificarUsuario() 
		{
			this.agregado = true;
			setTimeout( () => {
				this.agregado = false;
			}, 2000 )
		},
		checkearCantidad()
		{
			if (this.productosIds.length === 0) {
				this.ElCarritoEstaVacio = true;
				this.mensaje = "No agregaste ningún producto";
			}
		},
		// Fin metodos del carrito


		// LocalStorage
		actualizarDatos() 
		{
			localStorage.setItem("carrito", JSON.stringify(this.carrito));
			localStorage.setItem("productosIds", JSON.stringify(this.productosIds));
		},
		leerDatos() 
		{
			let carritoDelLocalStorage = JSON.parse(localStorage.getItem("carrito"));
			let productosIdsDelLocalStorage = JSON.parse(localStorage.getItem("productosIds"));
			if (carritoDelLocalStorage && productosIdsDelLocalStorage) {
				this.carrito = carritoDelLocalStorage;
				this.productosIds = productosIdsDelLocalStorage;
				this.ElCarritoEstaVacio = false;
			} 
		}
	}
})