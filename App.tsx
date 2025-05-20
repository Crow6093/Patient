// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://www.patient.dr2u.es' }}
        style={{ flex: 1 }}
        originWhitelist={['*']} // Permite todas las URLs, considera restringirlo por seguridad
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // onShouldStartLoadWithRequest es útil si necesitas lógica más compleja
        // para decidir si una URL debe cargarse o no.
        // Para simplemente cargar todo dentro del WebView, no es estrictamente necesario
        // si originWhitelist es suficientemente permisivo.
        onShouldStartLoadWithRequest={(request) => {
          // Siempre retorna true para permitir la carga de cualquier URL dentro del WebView
          return true;
        }}
        // Para mejorar la experiencia móvil, puedes añadir:
        userAgent="Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36" // Simula un user agent móvil
        scalesPageToFit={true} // Android
        viewportProps={{ // iOS
          width: 'device-width',
          initialScale: 1.0,
          maximumScale: 1.0,
          userScalable: false,
        }}
        automaticallyAdjustContentInsets={false} // iOS
        allowsInlineMediaPlayback={true} // Permite la reproducción de video inline
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;