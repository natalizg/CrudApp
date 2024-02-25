
# Aplicación standalone CRUD (Create, Read, Update, Delete) en Angular.

- El frontend de la aplicación utiliza Angular Material. En este caso, se ha simplificado la estructura para que todo esté contenido en un único componente llamado "add.post", que maneja todas las operaciones relacionadas con los posts, como agregar, borrar y editar.

- El backend de la aplicación está representado por servicios que se comunican con el JSON Server utilizando el módulo HttpClient de Angular para realizar operaciones CRUD a través de solicitudes HTTP.


## Servicios de mi aplicación: 

- PostService: Se encarga de realizar operaciones relacionadas con los posts, como agregar, borrar o recuperar datos del archivo JSON db.json que actúa como base de datos simulada.

- ReloadService: Este servicio se utiliza para recargar la página cuando sea necesario, por ejemplo, después de agregar o borrar un post.

- DialogService: Utiliza el componente de diálogo de Angular Material para abrir y cerrar el formulario de agregar post, proporcionando una experiencia de usuario más intuitiva.

// El único problema que no consigo solucionar es como json server le da un id
a los post añadidos, no consigo que sea un dato number incremental.
Probé creando una interfaz para post que restringiera el id solo a number,
pero no funcionaba.



