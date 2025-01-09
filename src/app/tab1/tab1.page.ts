import { Component, signal } from '@angular/core';
import {
  /* Importe los componentes de la UI */
  IonFab, IonFabButton, IonIcon, IonCard,
  IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';

/* Importe la función y el ícono */
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [

    /* Registre los componentes de la UI */
    IonFab, IonFabButton, IonIcon, IonCard, 
    IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
  ],
})
export class Tab1Page {

  imageReady = signal(false)
  imageUrl = signal("")

  constructor() {
    /* Registre el ícono */
    addIcons({ cloudUploadOutline });
  }

  /* El método onSubmit para enviar los datos del formulario mediante el servicio */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        // Convertir el archivo a una URL base64 para mostrarlo en el html
        reader.onload = () => {
          this.imageUrl.set(reader.result as string)
          this.imageReady.set(true)
        };

        reader.readAsDataURL(file); // Leer el archivo como base64
    }
  }
}
