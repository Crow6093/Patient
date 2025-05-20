# Proyecto React Native con WebView - Patient App

Esta aplicación React Native muestra el contenido de `https://www.patient.dr2u.es` utilizando un componente WebView.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

* Node.js (versión LTS recomendada)
* NPM o Yarn
* JDK (Java Development Kit) (versión 11 o superior recomendada para React Native)
* Android Studio (para el SDK de Android y herramientas de compilación)
    * Asegúrate de tener configuradas las variables de entorno `ANDROID_HOME` y que las herramientas de plataforma (`platform-tools`) estén en tu PATH.
* Un emulador de Android configurado o un dispositivo físico con depuración USB habilitada.
* React Native CLI: `npm install -g react-native-cli` (si no lo tienes globalmente)

## Configuración del Proyecto

1.  **Clona el repositorio (si aplica):**
    ```bash
    git clone <url-de-tu-repositorio>
    cd Patient # o el nombre de la carpeta de tu proyecto
    ```

2.  **Instala las dependencias del proyecto:**
    Desde la raíz de la carpeta del proyecto (`Patient`), ejecuta:
    ```bash
    npm install --legacy-peer-deps
    ```
    *Nota: Se usa `--legacy-peer-deps` para resolver posibles conflictos de dependencias que puedan surgir, como se vio durante el desarrollo.*

3.  **Asegúrate de que `react-native-webview` esté instalado:**
    Si el paso anterior no lo instaló correctamente, ejecútalo específicamente:
    ```bash
    npm install react-native-webview --legacy-peer-deps
    ```

4.  **Configura el archivo `index.js`:**
    Asegúrate de que el archivo `index.js` en la raíz de tu proyecto esté configurado para cargar tu componente principal `App.tsx` (que contiene el WebView). Debería verse así:
    ```javascript
    // index.js
    import {AppRegistry} from 'react-native';
    import App from './App'; // Asumiendo que App.tsx está en la raíz
    import {name as appName} from './app.json';

    AppRegistry.registerComponent(appName, () => App);
    ```

## Ejecutar la Aplicación en Modo Desarrollo

1.  **Inicia el Metro Bundler:**
    En una terminal, desde la raíz del proyecto, ejecuta:
    ```bash
    npx react-native start --reset-cache
    ```
    Mantén esta terminal abierta.

2.  **Ejecuta la aplicación en Android:**
    En otra terminal, desde la raíz del proyecto, ejecuta:
    ```bash
    npx react-native run-android
    ```
    Esto instalará la aplicación en tu emulador o dispositivo conectado y la iniciará.

## Generar un Build de Producción (APK para Android)

Sigue estos pasos para generar un archivo APK firmado que puedas distribuir o subir a tiendas de aplicaciones.

1.  **Limpia el proyecto de Android (opcional pero recomendado):**
    Navega a la carpeta `android` y ejecuta:
    ```bash
    cd android
    gradlew clean
    cd ..
    ```
    *Nota: En Windows PowerShell, si `./gradlew` no funciona, usa `gradlew clean`.*

2.  **Genera el bundle de JavaScript para producción:**
    Desde la raíz del proyecto, ejecuta:
    ```bash
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
    ```
    * Asegúrate de que la carpeta `android/app/src/main/assets/` exista. Si no, créala antes de ejecutar este comando.

3.  **Navega a la carpeta `android`:**
    ```bash
    cd android
    ```

4.  **Genera el APK de Release:**
    ```bash
    gradlew assembleRelease
    ```
    * Si no has configurado la firma de tu aplicación, este comando generará un APK sin firmar o podría fallar si la configuración de firma es obligatoria en tu `build.gradle`.
    * Para un APK firmado, necesitarás configurar tu archivo `android/app/build.gradle` con la información de tu keystore y seguir la [guía oficial de React Native para firmar APKs](https://reactnative.dev/docs/signed-apk-android).

5.  **Encuentra tu APK:**
    El APK generado (por ejemplo, `app-release.apk` o `app-release-unsigned.apk`) se encontrará usualmente en:
    `android/app/build/outputs/apk/release/`

## Solución de Problemas Comunes

* **Error "Unable to load script":**
    * Asegúrate de que Metro Bundler esté corriendo para builds de desarrollo.
    * Para builds de release, verifica que el comando `npx react-native bundle...` se haya ejecutado correctamente y el archivo `index.android.bundle` esté en `android/app/src/main/assets/`.
* **Error "Unable to resolve module ...":**
    * Asegúrate de que la dependencia esté instalada (`npm install <nombre-del-modulo> --legacy-peer-deps`).
    * Intenta eliminar `node_modules`, `package-lock.json`, limpiar caché (`npm cache clean --force`) y reinstalar todo (`npm install --legacy-peer-deps`).
    * Reinicia Metro Bundler con `--reset-cache`.
* **Conflictos de dependencias (`ERESOLVE`):**
    * Usa la bandera `--legacy-peer-deps` durante la instalación: `npm install --legacy-peer-deps` o `npm install <paquete> --legacy-peer-deps`.

