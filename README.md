# Shopnest

ShopNest es un proyecto de prueba que simula una tienda de e‑commerce construida con Angular, NgRx y Angular Material. Permite a los usuarios explorar productos de una API externa, gestionar el carrito de compras y completar el proceso de checkout.

Desplegado en GitHub Pages: https://danielcaldes.github.io/shopnest/


# Tecnologías utilizadas

- Angular 16+
- NgRx para la gestión de estado global
- Angular Material para UI
- Ngx‑Mask para el enmascarado de inputs (tarjeta, fecha, CVC)
- HttpClient para consumo de API
- Karma + Jasmine para pruebas unitarias
- Cypress para pruebas e2e


# Instrucciones para correr el proyecto localmente

1. Clona el repositorio  
   ``git clone https://github.com/DanielCaldes/shopnest.git``
   ``cd shopnest``

2. Instala dependencias  
   ``npm install``

3. Ejecuta la app  
   ``ng serve``

4. Abre en el navegador:  
   http://localhost:4200


# Tests

Ejecuta los tests unitarios con:

``ng test``

Ejecuta el test e2e purchase-flow con:
``npx cypress open``


# Estructura del proyecto
```
src/
├── app/
│   ├── components/
│   │   ├── basket/              # Carrito de compras con productos seleccionados
│   │   ├── category-filter/     # Filtro de productos por categoría
│   │   ├── checkout/            # Formulario de pago
│   │   ├── footer/              # Pie de página con información legal y enlaces
│   │   ├── home/                # Página principal del sitio
│   │   ├── login/               # Componente de inicio de sesión
│   │   ├── payment-success/     # Pantalla de confirmación de pago exitoso
│   │   ├── product-details/     # Detalle individual de producto
│   │   ├── products/            # Listado de productos disponibles
│   │   ├── register/            # Registro de nuevos usuarios
│   │   ├── search/              # Barra de búsqueda de productos
│   │   ├── sort-selector/       # Selector de ordenamiento de productos
│   │   └── tooltip/             # Encabezado con navegación y logo
│   ├── models/
│   │   └── product.model.ts     # Interfaz que define la estructura de un producto
│   ├── services/
│   │   ├── auth/                # Servicio de autenticación y sesión de usuario
│   │   └── products/            # Servicio para consumir la FakeStore API
│   ├── store/                   # Estado global manejado con NgRx (actions, reducers, selectors)
│   └── app.routes.ts            # Definición de rutas principales del proyecto
├── assets/                      # Recursos estáticos como imágenes o íconos
└── styles/                      # Estilos globales y personalizados
```


# Flujo de Usuario

1. Home: se cargan productos desde ``fakestoreapi.com/products`` 
2. Agrega productos al carrito → se actualiza NgRx  
3. Navega a Basket para ver/modificar el carrito  
4. Desde Basket, va a Checkout, completa datos de pago  
5. Al confirmar: se limpia el carrito y se redirige a Payment Success

