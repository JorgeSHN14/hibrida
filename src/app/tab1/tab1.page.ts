import { ViewChild, ElementRef, Component, signal } from '@angular/core';

/* Importe el pipe */
import { PercentPipe } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

import {
  /* Importe los componentes de la UI */
  IonCardContent, IonButton, IonList, IonItem, IonLabel,
  IonFab, IonFabButton, IonIcon, IonCard,
  IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/angular/standalone';

/* Importe el servicio */
import { TeachablemachineService } from '../services/teachablemachine.service';

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
    
    /* Registre el pipe */
    PercentPipe,

    CommonModule,
    FormsModule,
    IonicModule,

    /* Registre los componentes de la UI */
    IonCardContent, IonButton, IonList, IonItem, IonLabel,
    IonFab, IonFabButton, IonIcon, IonCard, 
    IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent
  ],
})
export class Tab1Page {

  /* Declare la referencia al elemento con el id image */
  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  imageUrlInput: string = '';
  priceInput: number | null = null;

  imageReady = signal(false)
  imageUrl = signal("")

  /* Declare los atributos para almacenar el modelo y la lista de clases */
  modelLoaded = signal(false);
  classLabels: string[] = [];

  /* Lista de predicciones */
  predictions: any[] = [];

  /* Registre el servicio en el constructor */
  constructor(private teachablemachine: TeachablemachineService) {
    /* Registre el ícono */
    addIcons({ cloudUploadOutline });
  }

  /* Método ngOnInit para cargar el modelo y las clases */
  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
  }

  onSubmit(): void {
    if (this.imageUrlInput) {
      this.imageUrl.set(this.imageUrlInput);
      this.imageReady.set(true);
    }
    // JORGE!!!!! Aquí manejas el precio si es necesario
    console.log('Precio ingresado:', this.priceInput);
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

  /* Método para obtener la predicción a partir de la imagen */
  async predict() {
      try {
          const image = this.imageElement.nativeElement;
          this.predictions = await this.teachablemachine.predict(image);
      } catch (error) {
          console.error(error);
          alert('Error al realizar la predicción.');
      }
  }
}
