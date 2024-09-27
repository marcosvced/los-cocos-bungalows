# Proyecto de Refactorización - THN

## Requisitos cumplidos

A continuación, se detalla cómo he abordado y cumplido los requisitos solicitados para la prueba técnica:

1. **Fechas de check-in y check-out:** Las fechas de check-in y check-out se configuran automáticamente para ser hoy y mañana, respectivamente.

```ts
 arrivalDate: useDate('today'),
 departureDate: useDate('tomorrow'),

 // useDate
 export function useDate(date: 'yesterday' | 'today' | 'tomorrow' | Date, config?: Config): DateTime {
  let dateTime: DateTime
  switch (date) {
    case 'today':
      dateTime = DateTime.local().startOf('day')
      break
    case 'tomorrow':
      dateTime = useDate('today').plus({ days: 1 })
      break
      ...
  }
  return dateTime
}
```

2. **Actualización del resumen:** Al hacer clic en el botón "Modificar" o al seleccionar una opción de hotel, se actualiza correctamente la información de la sección "Summary".

3. **Persistencia de datos:** La información se guarda localmente cuando se hace clic en "Save". Esto se ha implementado en la capa data de la feature booking, lo que permite una mayor escalabilidad y flexibilidad. Aunque actualmente los datos se almacenan en localStorage, esta implementación permite que en el futuro se pueda cambiar a IndexedDB o un servicio externo/API.

```ts
const useCase = new SaveCommand(new BookingData())
await useCase.execute(data)

// SavaCommand execute()
async execute(booking: BookingModel): Promise<void> {
    await this.repository.save(booking)
}

// Repository (BookingData)
async save(booking: Booking): Promise<void> {
    // Booking to DTO
    const dto = {...}
    localStorage.setItem(this.storageKey, JSON.stringify(dto))
}
get(): Promise<Booking> {
   const data: BookingDto = new BookingDto(JSON.parse(localStorage.getItem(this.storageKey) ?? '{}'))
   return Promise.resolve(data.toDomain())
}
```



4. **Descuento con `promo_code`**: Se implementó el descuento aplicable cuando el parámetro promo_code está presente en la URL. Por ejemplo, si ?promo_code=10 se aplica un 10% de descuento al precio total del resumen.
Al aplicarlo junto el patron BLoC permite de forma simple que en un funturo se añada un input (u otra forma) para añadir el código de descuento
   
 ```ts
   const route = useRoute()
   const { promo_code } = route.query
   
   const bloc = new BookingBloc()
   onMounted(async () => {
       ...
       if (Number.isInteger(Number.parseInt(promo_code as string))) {
         await bloc.dispatch(new ApplyDiscountAction(Number.parseInt(promo_code as string)))
       }
   })
```
   
   

5. **Optimización para dispositivos móviles**: La aplicación ha sido optimizada para dispositivos móviles, utilizando el framework TailwindCSS para gestionar los estilos de manera eficiente.

> Decidí no aplicar directamente las clases de utilidades de **Tailwind** en el HTML, ya que prefiero un enfoque más limpio y manejable utilizando `@apply`.
> 
> Esta refactorización es extensa, por lo que solo senté las bases sin aplicar la refactorización completa del HTML.
> 
> Ej: Antes
> 
> ```html
> <header class="sticky flex justify-between items-center z-50 top-0 bg-white w-full border-b-2 border-gray-light">...</header>
> ```
> 
> Ej: Después 
> 
> ```css
> header { 
>   @apply
>   sticky
>   flex
>   justify-between
>   items-center
>   z-50
>   top-0
>   bg-white
>   w-full
>   border-b-2
>   border-gray-light;
> }
> ```
> 
> ```html
> <header>...</header>
> ```



6. **Vue Router**
   Decidí incluir **Vue Router** para gestionar las diferentes páginas dentro de la aplicación. Esto mejora la navegación y la organización de las rutas.

7. **Node y Yarn con las últimas versiones**
   El archivo `package.json` originalmente especificaba las versiones de **Node** y **Yarn** mediante **Volta**, pero dado que no se mencionaban restricciones específicas, decidí eliminar las restricciones y utilizar las últimas versiones **LTS** de **Node** y **Yarn**.

8. **Gestión de versiones con Git y GitFlow**
   Para gestionar el control de versiones utilicé **Git** junto con el flujo de trabajo **GitFlow**, lo que permite una mejor organización del desarrollo, incluyendo ramas dedicadas para `feat`, `dev` y `main`.

9. **Arquitectura CLEAN**
   He aplicado una arquitectura **CLEAN** para mejorar la modularidad y escalabilidad del proyecto. La estructura del proyecto quedó organizada de la siguiente forma:
   
   * **src/core/common**: Módulos compartidos entre el core y las features.
   * **src/core/room**: Lógica específica de las habitaciones.
   * **src/feature/booking**: Módulo que gestiona todo el flujo de reservas.
   
   Cada módulo sigue esta estructura en carpetas:
   
   * **data/**: Acceso a datos (repositorios, DTOs, etc.).
   
   * **domain/**: Entidades y casos de uso.
     
     > Aquí se definen los casos de uso organizados como **command** y **query**.
   - **presentation/**: Gestión del estado de las vistas, implementado mediante el patrón **Bloc**

10. **Organización de elementos compartidos:**
* Los elementos compartidos del proyecto, como **assets**, hooks, y otros recursos comunes, se encuentran en la carpeta **lib/**.
* Los estilos los he organizado siguiendo los principios de **ITCSS** para garantizar una estructura clara y escalable. Los componentes de **Tailwind** no se importan directamente en el archivo `base.css`, sino en las secciones que les corresponden dentro de ITCSS. Por ejemplo, `tailwindcss/utilities` se encuentra en `tools/_utilities.css`, lo que proporciona mayor flexibilidad y control sobre los estilos.
11. **Componentes comunes y Atomic Design:**
* Los **componentes comunes** a todas las features, como el header, los selectores o botones, los he organizado en **lib/ui** siguiendo los principios de **Atomic Design**. Por ejemplo, el header está definido como un organismo (`ui/organisms/o-header.vue`), mientras que los botones se han implementado como átomos (`ui/atoms/a-button.vue`).
12. **Reglas de ESLint:**
* He decidido aplicar las reglas de **ESLint** definidas por el desarrollador **Anthony Fu**, ya que encajan muy bien con mi estilo de código y mejoran la consistencia y legibilidad del mismo. Para ello, simplemente añadí el paquete `@antfu/eslint-config` y lo apliqué en la configuración de **ESLint** del proyecto.
13. **SVGLoader**
    He añadido **SVGLoader**, lo que permite utilizar iconos en formato SVG directamente sin necesidad de cargar imágenes a través de etiquetas `img`. Esto mejora la flexibilidad y el rendimiento de la interfaz.
    
    ```html
    <AIcon :icon="double-bed" />
    ```
    
    

Mejoras pendientes
------------------

Aunque he aplicado diversas mejoras en la refactorización, hay ciertos aspectos que aún no he abordado completamente y que podrían mejorar la experiencia de usuario y la robustez del sistema:

1. **Manejo de carga y errores**

* **Estado de carga y manejo de errores en el BLoC:** Actualmente, los estados de cada **BLoC** manejan internamente la información sobre si se están cargando datos o si hay algún error, pero no existen componentes visuales que informen de esto al usuario.
  
  * **Posible mejora:** Se podría añadir un **skeleton loader** para indicar que los datos están cargándose y un sistema de alertas mediante **snackbars** o **toasts** para mostrar errores o el estado del proceso al usuario de forma visual.
  * **Manejo de excepciones:** Actualmente no se están controlando las excepciones. Se puede implementar un sistema de manejo de excepciones que, según el tipo de error, muestre diferentes mensajes al usuario. Por ejemplo, si la excepción es de conexión a la red, se podría mostrar un mensaje diferente a un error de validación.
    
    

2. **Mejora en el uso de imágenes y HTML interactivo**

* Actualmente hay ciertas secciones de la aplicación que utilizan imágenes estáticas, cuando deberían ser elementos interactivos en HTML. Un ejemplo de esto son los **links de redes sociales** o el **stepper**.
* **Posible mejora:** Estos elementos deberían ser refactorizados para ser componentes de **Vue** con los que el usuario pueda interactuar de manera directa, como botones o enlaces, mejorando la accesibilidad y funcionalidad de la aplicación.

3. **Indicación de la ruta activa**

* En el menú de navegación, actualmente se utilizan etiquetas `<a>` en lugar de **RouterLink**, por lo que no se indica al usuario qué ruta está activa en ese momento.

* **Posible mejora:** Implementar el componente **RouterLink** de **Vue Router**, que además de gestionar las rutas, permite destacar visualmente la ruta activa para mejorar la experiencia de navegación del usuario.

4. **Comprobación de la disponibilidad de datos guardados**

* En su estado actual, los datos guardados (como la habitación seleccionada) no se comprueban contra la realidad al recargar la página. Esto podría causar problemas si, por ejemplo, la habitación seleccionada ya no está disponible.

* **Posible mejora:** Se debería añadir una lógica que verifique si los datos guardados en `localStorage` siguen siendo válidos y coinciden con la información actual de la aplicación. Si la habitación ya no está disponible, se podría notificar al usuario y permitirle elegir otra opción.

5. **Otras mejoras potenciales**

* **Accesibilidad y optimización:** Se podría mejorar la accesibilidad de algunos elementos clave como formularios o botones, asegurándose de que sean completamente navegables y usables con teclados y lectores de pantalla, así como la utilización de formatos más adecuados para las imágenes como webp.
* **Pruebas unitarias y de integración:** Implementar un conjunto de pruebas unitarias e integración para asegurar la calidad y evitar futuras regresiones en el sistema.
