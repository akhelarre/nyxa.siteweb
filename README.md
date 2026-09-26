# PAGES
about.astro: Define el título "About" y renderiza el componente AboutLayout con un subtítulo de bienvenida.   
blog.astro: Carga los posts usando import.meta.glob, los ordena de más reciente a más antiguo utilizando la propiedad pubDate, y los mapea en una lista utilizando el componente BlogPost.   
index.astro: Establece el portal principal con la bienvenida a Nyxa, describiendo la transición del doomscrolling y el paso a un portal web estático inspirado en los años 2000 al estilo Do It Yourself.   
rss.xml.js: Configura la generación del canal RSS utilizando los elementos globales de los archivos Markdown para el sitio.   

# COMPONENTS
Header.astro: Organiza la cabecera del sitio agrupando los componentes Menu y Navigation dentro de un contenedor flexible con estilos de alineación horizontal.   
Menu.astro: Renderiza un botón interactivo destinado a desplegar o contraer el menú en la interfaz.   
Navigation.astro: Agrupa los enlaces principales de navegación (Home, About, Blog, Tags) con estilos en línea de tipo flexbox.   
Social.astro: Genera un enlace dinámico hacia perfiles externos en plataformas como Instagram, GitHub o YouTube, aplicando estilos personalizados de fondo y color.   
BlogPost.astro: Estructura cada elemento individual de la lista de publicaciones del blog renderizándolos como elementos de lista (<li>) con su respectivo enlace.   
Footer.astro: Integra el pie de página instanciando el componente Social con los perfiles y nombres de usuario correspondientes de redes sociales.   
Greeting.jsx: Componente interactivo hecho con Preact que gestiona un saludo dinámico y aleatorio mediante un estado local y un botón de actualización.

# LAYOUT
AboutLayout.astro: Contiene de forma estática los datos de perfil personales de Nyxa (nombre, país, ocupación, pasatiempos), una lista de habilidades formateadas, y sentencias condicionales sobre su aprendizaje y metas en Astro.   
BlogLayout.astro: Funciona como una plantilla base para las páginas del blog, agregando elementos estandarizados de bienvenida en la parte inferior junto con la carga del menú y pie de página.   
BaseLayout.astro: Sirve como la estructura general y reutilizable del sitio web, integrando la cabecera, el título de página, el contenido dinámico mediante slots, y el script del menú interactivo.   
MarkdownPostLayout.astro: Extiende de BaseLayout para procesar el contenido de los artículos en Markdown, formateando de forma segura las fechas de publicación, autor, descripciones, imágenes opcionales y el listado interactivo de etiquetas con estilos 

# SCRIPTS
menu.js: Captura el evento de clic en el botón con la clase .menu, invierte su atributo aria-expanded y alterna la clase .expanded en el contenedor de los enlaces de navegación (.nav-links)

# STYLES 
global.css: Define la paleta de colores general del sitio, la tipografía base, los estilos responsive para la barra de navegación (ocultándola en pantallas pequeñas por defecto y mostrándola mediante flexbox cuando se expande, u ocultando el botón al superar los 636px de ancho).   