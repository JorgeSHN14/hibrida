# Híbrida - code base

Debido a una nueva versión del módulo de @angular/cli, en este repositorio he colocado los archivos de configuración para un proyecto de @ionic/angular:^8.0.0 + @angular/cli:^18.0.0.

## Instrucciones:

1. Clone este repositorio en su sistema local.
2. Copie la carpeta src de su proyecto anterior.
3. En la carpeta del nuevo proyecto, abra una terminal e instale las dependencia con: `npm i`
4. Ejecute el servidor, con: `ionic serve`

## Observaciones generales

* Todos los componentes deben ser **Standalone**, es decir en el decorador de la clase debe aparecer la entrada **standalone: true**, p.e.:

  ```
  ...
  @Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  styleUrls: ['tab1.page.scss'],
  imports: [ ... ],
  })

  export class Tab1Page { ... }
  ```
  
* Utilice sus credenciales dentro de la carpeta src.
