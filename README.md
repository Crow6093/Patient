# Proyecto React Native con WebView - Patient App

Esta aplicación React Native muestra el contenido de `https://www.patient.dr2u.es` utilizando un componente WebView.

## 🎯 Requisitos Previos

Antes de empezar, asegúrate de tener instalado en tu ordenador:

* **Node.js**: Ve a [nodejs.org](https://nodejs.org/) para descargar la versión LTS (Recomendada).
* **NPM** (viene con Node.js) o **Yarn**.
* **JDK (Java Development Kit)**: Versión 11 o superior. Puedes descargarlo desde [AdoptOpenJDK](https://adoptium.net/) o [Oracle Java SE Development Kit](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
* **Android Studio**:
    * Descárgalo desde [developer.android.com/studio](https://developer.android.com/studio).
    * Instala el SDK de Android y las herramientas de compilación necesarias a través del SDK Manager en Android Studio.
    * Configura la variable de entorno `ANDROID_HOME` apuntando a la ruta de tu SDK de Android (ej: `C:\Users\TuUsuario\AppData\Local\Android\Sdk`).
    * Añade las herramientas de plataforma (`platform-tools`) a tu variable de entorno PATH (ej: `C:\Users\TuUsuario\AppData\Local\Android\Sdk\platform-tools`).
* **Emulador de Android** (configurado en Android Studio) o un **dispositivo Android físico** con la depuración USB habilitada.
* **(Opcional) React Native CLI global**: `npm install -g react-native-cli`

## 🛠️ Configuración Inicial del Proyecto

Sigue estos pasos si es la primera vez que trabajas con este proyecto:

1.  **Clona el Repositorio (si aún no lo tienes):**
    ```bash
    git clone <url-de-tu-repositorio>
    cd Patient # O el nombre de la carpeta de tu proyecto
    ```

2.  **Abre una Terminal en la Carpeta del Proyecto:**
    Navega con tu terminal (CMD, PowerShell, Git Bash, etc.) hasta la carpeta raíz del proyecto (donde está el archivo `package.json`). Por ejemplo: `C:\Users\Cuervo\Desktop\app\Patient`.

3.  **Instala Todas las Dependencias Necesarias:**
    En la terminal, ejecuta el siguiente comando. Este comando descarga todas las librerías que el proyecto necesita para funcionar.
    ```bash
    npm install --legacy-peer-deps
    ```
    *Usamos `--legacy-peer-deps` para evitar problemas con versiones de librerías que podrían no ser perfectamente compatibles entre sí.*

4.  **Verifica la Instalación de `react-native-webview`:**
    Esta librería es crucial para mostrar la página web. Si el comando anterior no la instaló o dio algún error específico con ella, puedes intentar instalarla directamente:
    ```bash
    npm install react-native-webview --legacy-peer-deps
    ```

5.  **Revisa el Archivo `index.js` (Corazón de la App):**
    Este archivo, ubicado en la raíz de tu proyecto, le dice a React Native qué componente cargar primero. Debe estar así para que cargue tu `App.tsx` (que tiene el WebView):
    ```javascript
    // index.js
    import {AppRegistry} from 'react-native';
    import App from './App'; // Carga tu archivo App.tsx
    import {name as appName} from './app.json';

    AppRegistry.registerComponent(appName, () => App);
    ```

## 🚀 Ejecutar la App en Modo Desarrollo (Para Probar Cambios)

Esto te permite ver la app en tu emulador o teléfono mientras desarrollas.

1.  **Inicia el Servidor de Desarrollo (Metro Bundler):**
    En una terminal (desde la raíz del proyecto), ejecuta:
    ```bash
    npx react-native start --reset-cache
    ```
    Verás un mensaje indicando que el servidor está corriendo. ¡No cierres esta terminal!

2.  **Lanza la Aplicación en tu Emulador/Dispositivo Android:**
    Abre OTRA terminal nueva (también desde la raíz del proyecto). Ejecuta:
    ```bash
    npx react-native run-android
    ```
    La app se compilará y se instalará. Podrás ver los cambios que hagas en el código reflejados casi al instante.

## 🎨 Personalizar Nombre e Icono de la App (Android)

### Cambiar el Nombre de la Aplicación

El nombre que se muestra debajo del icono de la app en el dispositivo se define en el archivo de strings de Android.

1.  **Abre el archivo `strings.xml`:**
    Navega a `android/app/src/main/res/values/strings.xml`.
2.  **Modifica el valor de `app_name`:**
    Busca la línea que se parece a esto:
    ```xml
    <string name="app_name">NombreActualDeTuApp</string>
    ```
    Cambia `NombreActualDeTuApp` por el nombre que deseas. Por ejemplo:
    ```xml
    <string name="app_name">Patient DR2U</string>
    ```
3.  **Guarda el archivo.** La próxima vez que compiles la aplicación, el nuevo nombre debería aparecer.

### Cambiar el Icono de la Aplicación

Para cambiar el icono, necesitarás reemplazar los archivos de imagen existentes en las carpetas `mipmap` de Android. Es importante proporcionar iconos en diferentes densidades para asegurar que se vean bien en todos los dispositivos.

1.  **Prepara tus nuevos iconos:**
    * Necesitarás versiones de tu icono en diferentes tamaños (generalmente PNG). Las carpetas `mipmap` comunes y sus tamaños típicos son:
        * `mipmap-mdpi`: 48x48 px
        * `mipmap-hdpi`: 72x72 px
        * `mipmap-xhdpi`: 96x96 px
        * `mipmap-xxhdpi`: 144x144 px
        * `mipmap-xxxhdpi`: 192x192 px
    * También es recomendable crear iconos adaptativos para Android 8.0 (API nivel 26) y superior. Esto implica proporcionar un icono de primer plano (foreground) y uno de fondo (background). Android Studio tiene una herramienta para generar esto fácilmente.

2.  **Usando Android Studio (Recomendado para iconos adaptativos):**
    * Abre la carpeta `android` de tu proyecto React Native con Android Studio (selecciona "Open an existing Android Studio project" y elige la carpeta `android`).
    * En el panel de proyecto de Android Studio (vista "Android"), haz clic derecho en la carpeta `app` o `res`.
    * Selecciona `New` > `Image Asset`.
    * En la ventana "Configure Image Asset":
        * **Icon type**: Selecciona `Launcher Icons (Adaptive and Legacy)`.
        * **Name**: Puedes dejarlo como `ic_launcher`.
        * **Foreground Layer**: Elige tu imagen de primer plano (por ejemplo, tu logo sin fondo).
        * **Background Layer**: Elige un color de fondo o una imagen de fondo.
        * Ajusta el tamaño y la forma si es necesario.
        * Haz clic en `Next` y luego en `Finish`. Esto generará y reemplazará los iconos en todas las carpetas `mipmap` necesarias.

3.  **Manualmente (Si no usas iconos adaptativos o quieres reemplazar directamente):**
    * Navega a la carpeta `android/app/src/main/res/`.
    * Encontrarás varias carpetas `mipmap-*` (ej: `mipmap-hdpi`, `mipmap-mdpi`, etc.).
    * Dentro de cada una de estas carpetas, verás archivos de iconos como `ic_launcher.png` y `ic_launcher_round.png`.
    * Reemplaza estos archivos con tus propios iconos del mismo nombre y tamaño correspondiente a cada densidad.

4.  **Limpia y Reconstruye:**
    Después de cambiar el nombre o los iconos, es una buena idea limpiar el proyecto y reconstruirlo:
    ```bash
    cd android
    ./gradlew clean
    cd ..
    npx react-native run-android 
    ```
    O si vas a generar un APK de release, sigue los pasos de la sección de abajo.

## 📦 Generar el Archivo APK para Producción (Paso a Paso)

Este es el proceso para crear el archivo `.apk` que puedes instalar directamente en dispositivos Android o subir a tiendas.

**Paso 0: Preparativos (Solo una vez si no lo has hecho)**

* **Firma de la App (IMPORTANTE para Release):** Para distribuir una app oficialmente, necesita estar firmada digitalmente. Esto implica generar una "llave" (keystore).
    * Sigue la [Guía Oficial de React Native para generar una clave de carga](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key).
    * Una vez generada tu clave (archivo `.keystore`), debes configurar tu archivo `android/app/build.gradle` y `android/gradle.properties` para que Gradle la use al firmar el APK. Esta parte es crucial y detallada en la guía oficial. Si omites esto, obtendrás un APK de "debug" o sin firmar, no apto para la Play Store.

**Paso 1: Limpiar Builds Anteriores (Opcional, pero buena práctica)**

Esto elimina archivos de compilaciones previas para evitar posibles conflictos.
* Abre tu terminal y navega a la carpeta `android` dentro de tu proyecto:
    ```bash
    cd android
    ```
* Ejecuta el comando de limpieza:
    * En Windows (CMD o PowerShell):
        ```bash
        gradlew clean
        ```
    * En macOS/Linux (o Git Bash en Windows):
        ```bash
        ./gradlew clean
        ```
* Vuelve a la carpeta raíz del proyecto:
    ```bash
    cd ..
    ```

**Paso 2: Crear la Carpeta `assets` (Si no existe)**

El "bundle" de JavaScript (tu código de la app empaquetado) se guardará aquí.
* Verifica si existe la carpeta: `android/app/src/main/assets`.
* Si no existe, créala manualmente desde tu explorador de archivos.

**Paso 3: Generar el "Bundle" de JavaScript para Android** ⚙️

Este comando toma todo tu código JavaScript/TypeScript y lo empaqueta en un solo archivo optimizado que Android puede entender.
* Asegúrate de estar en la **carpeta raíz** de tu proyecto (`Patient`).
* Ejecuta en la terminal:
    ```bash
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
    ```
    * `--platform android`: Especifica que es para Android.
    * `--dev false`: Indica que es un bundle de producción (optimizado).
    * `--entry-file index.js`: Tu archivo de entrada principal.
    * `--bundle-output ...`: Dónde guardar el bundle generado.
    * `--assets-dest ...`: Dónde copiar otros assets (imágenes, fuentes).

    Deberías ver un mensaje de éxito si todo va bien.

**Paso 4: Navegar a la Carpeta `android`** 📂

Todos los comandos de Gradle para construir el APK se ejecutan desde aquí.
* En tu terminal, ve a la carpeta `android`:
    ```bash
    cd android
    ```

**Paso 5: Ensamblar el APK de "Release" (¡El Momento de la Verdad!)** ✨

Este comando le dice a Gradle que construya el APK final usando el bundle y las configuraciones de release (incluyendo la firma, si la configuraste).
* Ejecuta en la terminal (estando dentro de la carpeta `android`):
    * En Windows (CMD o PowerShell):
        ```bash
        gradlew assembleRelease
        ```
    * En macOS/Linux (o Git Bash en Windows):
        ```bash
        ./gradlew assembleRelease
        ```
    Este proceso puede tardar unos minutos. Verás mucho output en la consola. Si todo va bien, terminará con un mensaje como `BUILD SUCCESSFUL`.

**Paso 6: ¡Encuentra tu APK!** 🎉

¡Felicidades! Tu archivo APK está listo.
* Lo encontrarás en la siguiente ruta dentro de tu proyecto:
    `android/app/build/outputs/apk/release/`
* El archivo se llamará algo como `app-release.apk` (si está firmado) o `app-release-unsigned.apk` (si no configuraste la firma).

Ahora puedes copiar este archivo `.apk` a un dispositivo Android para instalarlo o proceder a subirlo a la Google Play Store (si está correctamente firmado y cumple con sus requisitos).

## 🚑 Solución de Problemas Comunes

* **Error "Unable to load script":**
    * **Desarrollo:** Asegúrate de que Metro Bundler (`npx react-native start`) esté corriendo.
    * **Producción (APK):** Revisa que el Paso 3 (generar el bundle) se haya completado sin errores y que el archivo `index.android.bundle` esté en `android/app/src/main/assets/`.
* **Error "Unable to resolve module [nombre-del-modulo]":**
    * Significa que falta una librería. Instálala con: `npm install <nombre-del-modulo> --legacy-peer-deps`.
    * Si persiste:
        1.  Detén Metro.
        2.  Elimina la carpeta `node_modules`.
        3.  Elimina `package-lock.json`.
        4.  Limpia caché: `npm cache clean --force`.
        5.  Reinstala todo: `npm install --legacy-peer-deps`.
        6.  Reinicia Metro: `npx react-native start --reset-cache`.
* **Conflictos de Dependencias (`ERESOLVE` durante `npm install`):**
    * La solución más común es usar la bandera `--legacy-peer-deps` con tus comandos `npm install`.

