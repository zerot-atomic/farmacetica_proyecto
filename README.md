# farmacetica_proyecto
<<<<<<< HEAD
# 🏥 Farmacia "Fortaleza" - Sistema de Gestión Farmacéutica

Este proyecto es una aplicación web estática para la gestión de la Farmacia "Fortaleza". Permite a los usuarios administrar y consultar el inventario de medicamentos, visualizar el directorio de proveedores, gestionar sucursales y dar de alta a nuevos empleados. Todo el sistema opera del lado del cliente utilizando HTML, CSS y JavaScript puro ("Vanilla JS").

## ⚙️ ¿Cómo Funciona?

El sistema está dividido en varios módulos a los que se accede desde la página principal (`index.html`). No requiere un servidor backend para la demostración, ya que simula las bases de datos utilizando objetos y arreglos en memoria dentro de los archivos JavaScript.

### Campos y Archivos Importantes

1. **Módulo de Búsqueda (`js/busqueda.js`)**
   * **`baseDeDatos`**: Es un arreglo de objetos que simula el inventario. Cada medicamento tiene los campos `id`, `titulo`, `descripcion` y un `link` que redirige a la página de detalles.
   * **Evento `keyup`**: El script escucha cada vez que el usuario teclea en el buscador (`#formulario`) y filtra los medicamentos cuyo título coincida con el texto ingresado.
   * Si no hay coincidencias, inyecta un mensaje indicando que no se encontraron resultados.

2. **Detalles del Medicamento (`js/detalle_medicamento.js`)**
   * **Objeto `medicamentos`**: Actúa como una base de datos detallada utilizando el identificador del medicamento como clave (ej. `paracetamol`, `amoxicilina`). Los campos clave almacenados son: `nombre`, `concentracion`, `lote`, `caducidad` y `stock`.
   * **`URLSearchParams`**: El script lee el parámetro `?id=` de la URL para saber qué medicamento mostrar en la pantalla (ej. `detalle-medicamento.html?id=omeprazol`). 
   * **Actualización del DOM**: Cambia dinámicamente el título de la pestaña del navegador y reemplaza el contenido de texto en la página HTML para mostrar los detalles precisos.

3. **Sistema de Migas de Pan / Breadcrumbs (`js/breadcrumb.js`)**
   * **`rutasBreadcrumb`**: Es un diccionario (objeto) donde la clave es el nombre del archivo HTML actual (ej. `catalogo.html`) y el valor es un arreglo que define la jerarquía de navegación hasta llegar a esa página.
   * **`generarBreadcrumb()`**: Al cargar el DOM, esta función detecta en qué página se encuentra el usuario, busca su jerarquía en `rutasBreadcrumb` y genera dinámicamente una lista `<ul>` con los enlaces correspondientes. Luego, inyecta este HTML dentro del contenedor `<div id="breadcrumb-container">`.

---

## 📊 Diagramas de Arquitectura

### 1. Flujo de Búsqueda de Inventario
Muestra cómo interactúa el usuario con la barra de búsqueda en el inicio.
```mermaid
sequenceDiagram
    actor Usuario
    participant HTML as index.html
    participant JS as js/busqueda.js
<<<<<<< HEAD
    
    Usuario->>HTML: Escribe en el input #formulario
    HTML->>JS: Dispara evento 'keyup'
    JS->>JS: Lee el texto y lo pasa a minúsculas
    JS->>JS: Filtra el arreglo 'baseDeDatos' (include)
    JS-->>HTML: Inyecta etiquetas <li> con enlaces al DOM (#resultado)
    Usuario->>HTML: Hace clic en un resultado
    HTML->>Usuario: Redirige a detalle-medicamento.html?id=...
```

### 2. Lógica de "Migas de Pan" (Breadcrumbs)
Explica cómo el sistema sabe qué ruta de navegación mostrar en la parte superior de cada página.

```mermaid
flowchart TD
    A[Carga de Página / DOMContentLoaded] --> B[Obtener el nombre del archivo de la URL]
    B --> C{¿La ruta está vacía?}
    C -- Sí --> D[Asignar 'index.html']
    C -- No --> E[Buscar el archivo en rutasBreadcrumb]
    D --> E
    E --> F{¿Existe la jerarquía?}
    F -- Sí --> G[Recorrer el arreglo construyendo enlaces <a>]
    G --> H[El último elemento se marca como texto fuerte sin enlace]
    H --> I[Inyectar código en el #breadcrumb-container]
    F -- No --> J[Terminar ejecución]
```

### 3. Mapa del Sitio General
Estructura de cómo están conectadas las páginas principales del proyecto.

```mermaid
graph TD
    Inicio[Inicio - index.html] --> Inv[Inventario]
    Inicio --> Prov[Proveedores]
    Inicio --> Suc[Sucursales]
    Inicio --> Admin[Administración]

    Inv --> Cat[Catálogo de Medicamentos]
    Cat --> Det[Detalle del Medicamento]

    Prov --> Dir[Directorio de Proveedores]
    
    Suc --> LSuc[Lista de Sucursales]
    LSuc --> ISuc[Inventario por Sucursal]
    
    Admin --> Alta[Registro de Empleado]
```
=======
    participant JSON as js/catalogo.json
    
    Note over HTML,JSON: 1. Carga Inicial de la Página
    HTML->>JS: Carga el script busqueda.js
    JS->>JSON: fetch('../js/catalogo.json')
    JSON-->>JS: Retorna Array de medicamentos
    JS->>JS: Almacena datos en variable global 'baseDeDatos'
    
    Note over Usuario,JS: 2. Interacción del Usuario
    Usuario->>HTML: Escribe en #formulario
    HTML->>JS: Dispara evento 'keyup'
    JS->>JS: Convierte texto a minúsculas y limpia espacios
    JS->>JS: Filtra 'baseDeDatos' comparando con 'item.nombre'
    
    alt Hay coincidencias
        JS-->>HTML: Inyecta etiquetas <li> con enlaces <a> en #resultado
    else No hay coincidencias
        JS-->>HTML: Inyecta mensaje "No se encontraron resultados" en #resultado
    end
```

### 2. Generación Dinámica del Catálogo
Explica el algoritmo utilizado en `pages/catalogo.html` para construir la vista de cuadrícula (grid) leyendo el archivo JSON.

```mermaid
flowchart TD
    A[Carga de catalogo.html] --> B[Ejecutar fetch de catalogo.json]
    B --> C{¿Respuesta exitosa?}
    C -- No --> K[Imprimir error en consola]
    C -- Sí --> D[Limpiar contenedor principal #catalogo-completoA]
    D --> E[Iniciar iteración sobre medicamentos]
    
    E --> F{¿Índice % 3 === 0?}
    F -- Sí --> G[Crear nueva etiqueta section]
    G --> H[Adjuntar section al main]
    F -- No --> I[Usar el section actual]
    
    H --> J
    I --> J[Crear article.card-medicamentoA]
    J --> L[Inyectar nombre, descripción y botón]
    L --> M[Adjuntar article al section correspondiente]
    
    M --> N{¿Hay más medicamentos?}
    N -- Sí --> E
    N -- No --> O[Fin de la generación del catálogo]
```

### 3. Lógica del Modal e Inventario de Sucursales
Detalla cómo la página de sucursales genera un stock aleatorio en tiempo real al abrir la ventana modal.

```mermaid
sequenceDiagram
    actor Usuario
    participant HTML as sucursales.html
    participant JS as Script Integrado
    participant API as catalogo.json
    
    JS->>API: fetch('../js/catalogo.json')
    API-->>JS: Guarda catálogo en 'medicamentosCatalogo'
    JS->>HTML: Inyecta las tarjetas de sucursales
    
    Usuario->>HTML: Clic en "Ver Inventario"
    HTML->>JS: Captura evento clic (Lee data-id y nombre)
    JS->>HTML: Cambia el título del modal (#modal-titulo)
    
    loop Por cada medicamento
        JS->>JS: Genera número aleatorio (1-100)
        JS->>HTML: Crea <tr> con el Nombre y el Stock generado
    end
    
    JS->>HTML: Cambia estilo a display: block (Muestra modal)
    Usuario->>HTML: Clic en "X" o fuera del modal
    HTML->>JS: Cambia estilo a display: none (Oculta modal)
```

---

## 🚀 Guía de Instalación y Uso Local

Dado que esta rama del proyecto implementa la API `fetch` para consumir el archivo `catalogo.json`, **no es posible abrir los archivos HTML directamente dando doble clic** en el explorador de archivos (`file:///...`). Esto generaría un error de **CORS** (Cross-Origin Resource Sharing).

Para ejecutar el proyecto correctamente en tu computadora:

1. **Clonar o descargar el repositorio** y abrir la carpeta raíz en tu editor de código preferido (ej. Visual Studio Code).
2. **Instalar una extensión de servidor local**, por ejemplo, **Live Server** en VS Code.
3. Hacer clic derecho sobre el archivo `index.html` y seleccionar **"Open with Live Server"**.
4. El proyecto se abrirá automáticamente en tu navegador predeterminado bajo una dirección local (ej. `http://127.0.0.1:5500/index.html`), permitiendo que las peticiones asíncronas funcionen correctamente.

---

## 📂 Estructura de Carpetas

```text
farmacetica_proyecto/
├── index.html                 # Página principal y buscador
├── sitemap.xml                # Mapa del sitio para SEO
├── README.md                  # Documentación del proyecto
├── css/
│   ├── catalogo-style.css     # Estilos específicos del grid del catálogo
│   ├── main-style.css         # Estilos globales e inicio
│   ├── provedores-style.css   # Estilos de la tabla de proveedores
│   └── sucursales-style.css   # Estilos de tarjetas y modal de sucursales
├── js/
│   ├── busqueda.js            # Lógica del buscador asíncrono
│   └── catalogo.json          # Base de datos simulada
└── pages/
    ├── catalogo.html          # Vista dinámica del catálogo
    ├── proveedores.html       # Directorio de laboratorios
    ├── registro.html          # Formulario de alta de empleados
    ├── sucursales.html        # Gestión de sucursales y modal de stock
    └── medicamentos/          # Páginas individuales de cada fármaco
        ├── acido-ascorbico.html
        ├── omeprazol.html
        ├── paracetamol.html
        └── ...
```

## 🚀 Guía de Instalación y Uso Local

Dado que esta rama del proyecto (`debug`) implementa la API `fetch` para consumir el archivo `catalogo.json` de forma asíncrona, **no es posible abrir los archivos HTML directamente dando doble clic** en el explorador de archivos (`file:///...`). Esto generaría un error de **CORS** (Cross-Origin Resource Sharing) en el navegador debido a las políticas de seguridad.

Para ejecutar el proyecto correctamente en tu computadora local:

1. **Clonar o descargar el repositorio** y abrir la carpeta raíz en tu editor de código preferido (ej. Visual Studio Code).
2. **Instalar una extensión de servidor local**, por ejemplo, **Live Server** en VS Code.
3. Hacer clic derecho sobre el archivo `index.html` y seleccionar **"Open with Live Server"**.
4. El proyecto se abrirá automáticamente en tu navegador predeterminado bajo una dirección de localhost (ej. `http://127.0.0.1:5500/index.html`), permitiendo que las peticiones asíncronas hacia el JSON funcionen correctamente.

---

## 📂 Estructura de Carpetas

La arquitectura del proyecto está organizada de la siguiente manera para mantener la escalabilidad y la correcta separación de intereses:

```text
farmacetica_proyecto/
├── index.html                 # Página principal y buscador general
├── sitemap.xml                # Mapa del sitio para indexación SEO
├── README.md                  # Documentación del proyecto
├── css/
│   ├── catalogo-style.css     # Estilos específicos del grid dinámico del catálogo
│   ├── main-style.css         # Estilos globales y de la página de inicio
│   ├── provedores-style.css   # Estilos de la tabla del directorio de proveedores
│   └── sucursales-style.css   # Estilos de las tarjetas y la ventana modal
├── js/
│   ├── busqueda.js            # Lógica del buscador asíncrono y filtrado
│   └── catalogo.json          # Base de datos simulada (consumida vía fetch)
└── pages/
    ├── catalogo.html          # Vista dinámica del catálogo de medicamentos
    ├── proveedores.html       # Directorio de laboratorios y contactos
    ├── registro.html          # Formulario de alta para nuevos empleados
    ├── sucursales.html        # Gestión de sucursales e inventario aleatorio
    └── medicamentos/          # Páginas HTML individuales para mejorar el SEO
        ├── acido-ascorbico.html
        ├── atorvastatina.html
        ├── calcio.html
        ├── carvedilol.html
        ├── clonazepam.html
        ├── dexametasona.html
        ├── fluoxetina.html
        ├── furosemida.html
        ├── loratadina.html
        ├── losartan.html
        ├── metformina.html
        ├── metoclopramida.html
        ├── omeprazol.html
        ├── paracetamol.html
        ├── salbutamol.html
        ├── sertralina.html
        ├── simvastatina.html
        ├── styles.css         # Estilos compartidos para las páginas de detalles
        └── vitamina-d.html
```

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico**: Para una estructura accesible y optimizada para motores de búsqueda.
* **CSS3**: Diseño responsivo (Grid y Flexbox), variables de entorno y transiciones sin frameworks externos.
* **Vanilla JavaScript (ES6+)**: Lógica del cliente, manipulación del DOM, delegación de eventos y consumo de promesas (`async/await` y `fetch API`).
* **JSON**: Almacenamiento de datos estructurados para simular respuestas de un servidor real.
>>>>>>> debug
