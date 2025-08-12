# ✒️ Pluma Digital

> **Tu asistente inteligente de escritura potenciado por IA local**

![Chrome](https://img.shields.io/badge/Chrome-Required-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square)](https://isa-bos-dev.github.io/Pluma-Digital/)


> ### [**Ver Demo en Vivo 🚀**](https://isa-bos-dev.github.io/Pluma-Digital/)

## 📋 Tabla de Contenidos

- [🎯 Descripción](#-descripción)
- [✨ Características](#-características)
- [🔧 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📋 Requisitos del Sistema](#-requisitos-del-sistema)
- [⚙️ Configuración del Navegador](#️-configuración-del-navegador)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [📱 Funcionalidades](#-funcionalidades)
- [🎨 Interfaz de Usuario](#-interfaz-de-usuario)
- [🔒 Privacidad y Seguridad](#-privacidad-y-seguridad)
- [🐛 Solución de Problemas](#-solución-de-problemas)
- [📖 Documentación Técnica](#-documentación-técnica)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)

## 🎯 Descripción

**Pluma Digital** es una aplicación web innovadora que aprovecha las capacidades de inteligencia artificial integradas en Google Chrome para ofrecer asistencia de escritura avanzada. Utilizando la **Chrome Writer API**, la aplicación procesa el texto localmente en tu dispositivo, garantizando privacidad total y rendimiento óptimo.

### 🔥 ¿Por qué Pluma Digital?

- **🛡️ Privacidad Total**: Todo el procesamiento ocurre localmente, sin envío de datos a servidores externos
- **⚡ Rendimiento Superior**: Respuestas instantáneas sin latencia de red
- **🎯 Personalización Avanzada**: Control granular sobre tono y longitud del contenido
- **🌐 Sin Conexión**: Funciona completamente offline una vez descargado el modelo
- **💰 Completamente Gratuito**: Sin suscripciones ni límites de uso

## ✨ Características

### 🎨 **Generación de Texto Inteligente**
- **Tono Configurable**: Neutral, Formal, Casual
- **Longitud Personalizable**: Corto, Medio, Largo
- **Contexto Inteligente**: Mantiene coherencia temática
- **Multiidioma**: Responde en el mismo idioma que el input

### 📋 **Funcionalidades de Productividad**
- **Copia Instantánea**: Un clic para copiar al portapapeles
- **Interfaz Responsive**: Optimizada para desktop y móvil
- **Feedback Visual**: Indicadores de estado en tiempo real
- **Compatibilidad de Navegadores**: Detección automática y alertas

### 🔧 **Características Técnicas**
- **API Moderna**: Utiliza Chrome Writer API nativa
- **Fallbacks Robustos**: Compatibilidad con métodos de copia legacy
- **Progressive Enhancement**: Funciona incluso con JavaScript limitado
- **Arquitectura Modular**: Código limpio y mantenible

## 🔧 Tecnologías Utilizadas

### 📱 **Frontend**
- **HTML5**: Estructura semántica moderna
- **CSS3**: Variables CSS, Flexbox, Grid, Animaciones
- **JavaScript ES6+**: Async/await, Módulos, APIs modernas

### 🤖 **APIs de IA**
- **Chrome Writer API**: Generación de texto con IA local
- **Clipboard API**: Copia moderna al portapapeles
- **Navigator API**: Detección de navegador y capacidades

> 📚 **Documentación oficial**:
-  [Chrome Writer API](https://developer.chrome.com/docs/ai/writer-api?hl=es-419)
-  [Chrome Rewriter API](https://developer.chrome.com/docs/ai/rewriter-api?hl=es-419)

### 🎨 **Diseño**
- **Responsive Design**: Mobile-first approach
- **CSS Custom Properties**: Sistema de variables unificado
- **Modern Typography**: Fuentes del sistema optimizadas

## 📋 Requisitos del Sistema

### 🌐 **Navegador Requerido**
- **Google Chrome**: Versión **127.0** o superior ⭐
- **Chrome Canary**: Versión **129.0** o superior (recomendado para desarrollo)

### 💻 **Compatibilidad de Sistemas Operativos**
- ✅ **Windows 10/11** (x64)
- ✅ **macOS 11** Big Sur o superior
- ✅ **Linux** (Ubuntu 20.04+ / distribuciones equivalentes)

### 🔧 **Especificaciones Mínimas**
- **RAM**: 4GB mínimo, 8GB recomendado
- **Almacenamiento**: 2GB libres para modelo de IA
- **Conexión**: Requerida solo para descarga inicial del modelo

## ⚙️ Configuración del Navegador

### 🚩 **Flags de Chrome Necesarios**

Para habilitar la Writer API, debes activar los siguientes flags experimentales:

#### 📋 **Pasos Detallados:**

1. **Acceder a Chrome Flags**:
   ```
   chrome://flags
   ```

2. **Buscar y Habilitar los siguientes flags** (el nombre puede variar ligeramente entre versiones):

   **🔹 Enables optimization guide on device**
      ```
      chrome://flags/#optimization-guide-on-device-model
      ```
      ➡️ Cambiar de `Default` a `Enabled`

   **🔹 Prompt API for Gemini Nano**
   ```
   chrome://flags/#prompt-api-for-gemini-nano
   ```
   ➡️ Cambiar de `Default` a `Enabled`

   **🔹 Writer API**
   ```
   chrome://flags/#writer-api
   ```
   ➡️ Cambiar de `Default` a `Enabled`
   
     **🔹 Rewriter API**
   ```
   chrome://flags/#rewriter-api
   ```
   ➡️ Cambiar de `Default` a `Enabled`
   

   **🔹 Summarization API (Opcional pero recomendado)**
   ```
   chrome://flags/#summarization-api-for-gemini-nano
   ```
   ➡️ Cambiar de `Default` a `Enabled`

3. **Reiniciar Chrome**:
   - Hacer clic en el botón azul **"Relaunch"**
   - O cerrar completamente Chrome y volver a abrirlo

### 🔍 **Verificar Configuración**

Para confirmar que todo está configurado correctamente:

1. Abrir **DevTools** (F12)
2. Ir a la pestaña **Console**
3. Ejecutar:
   ```javascript
   console.log('Writer API disponible:', 'ai' in window && 'writer' in window.ai);
   ```
4. Debería mostrar: `Writer API disponible: true`

> ℹ️ Alternativa más robusta y a prueba de futuro
    >    ```javascript
    >    console.log('Writer API disponible:', 'ai' in window && typeof 
    >    window.ai.canCreateTextSession === 'function');
    >   ```

### 📱 **Configuración Alternativa (Chrome Canary)**

Si usas Chrome Canary, algunos flags pueden tener nombres ligeramente diferentes:

```
chrome://flags/#optimization-guide-on-device-model
chrome://flags/#gemini-nano-api
```

## 🚀 Instalación y Uso

### 📥 **Descarga e Instalación**

1. **Clonar o descargar** los archivos del proyecto:
   ```bash
   git clone https://github.com/isa-bos-dev/Pluma-Digital.git
   cd pluma-digital
   ```

2. **Estructura de archivos**:
   ```
   pluma-digital/
   ├── index.html      # Página principal
   ├── styles.css      # Estilos de la aplicación
   ├── main.js         # Lógica de la aplicación
   ├── favicon.svg     # Icono de la aplicación
   └── README.md       # Este archivo
   ```

### 🌐 **Métodos de Ejecución**

#### **Método 1: Servidor Local (Recomendado)**
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con Live Server (VS Code)
# Extensión Live Server + Click derecho + "Open with Live Server"
```

#### **Método 2: Archivo Local**
- Abrir directamente `index.html` en Chrome
- ⚠️ **Nota**: Algunas funciones pueden tener limitaciones por políticas CORS

### ▶️ **Primera Ejecución**

1. **Abrir la aplicación** en Chrome
2. **Verificar compatibilidad**: La app detectará automáticamente si tu navegador es compatible
3. **Descarga automática**: En el primer uso, el modelo de IA se descargará automáticamente (~100MB)
4. **¡Listo para usar!**: Una vez descargado, la aplicación funcionará offline

## 📱 Funcionalidades

### 🔘 **Selector de Modo**
La interfaz cuenta con un selector en la parte superior que te permite cambiar instantáneamente entre los modos **"Escribir"** y **"Reescribir"**. La aplicación adaptará dinámicamente las etiquetas, opciones y el comportamiento del botón principal.

### ✍️ **Cómo Usar el Modo "Escribir"**
1.  **Selecciona el modo "Escribir"**.
2.  **Escribe tu idea**: En el área de texto principal (ej: "Un poema sobre la programación").
3.  **Configura el Tono y la Longitud** deseados (Neutral/Formal/Casual, Corto/Medio/Largo).
4.  Haz clic en **"Generar texto"**.

### 🔄 **Cómo Usar el Modo "Reescribir"**
1.  **Selecciona el modo "Reescribir"**.
2.  **Pega tu texto**: En el área de texto principal.
3.  **Elige una acción de Tono y Longitud**:
    - **Tono**: "Como está", "Más Formal", "Más Casual".
    - **Longitud**: "Como está", "Más Corto", "Más Largo".
4.  Haz clic en **"Reescribir texto"**.

### 📋 **Copiado de Resultados**
En ambos modos, una vez generado el texto, puedes copiarlo al portapapeles con un solo clic en el icono 📋 en la esquina del área de resultados.


### ✍️ **Generación de Texto**

#### **📝 Proceso de Uso**:
1. **Escribir la idea**: En el área de texto principal
   ```
   Ejemplo: "Redactar un email profesional para solicitar una reunión"
   ```

2. **Seleccionar tono**:
   - 🎭 **Neutral**: Equilibrado y versátil
   - 🎩 **Formal**: Para contextos profesionales
   - 😊 **Casual**: Relajado y amigable

3. **Elegir longitud**:
   - 📏 **Corto**: 1-2 párrafos (~50-100 palabras)
   - 📄 **Medio**: 3-4 párrafos (~100-200 palabras)
   - 📃 **Largo**: 5+ párrafos (~200+ palabras)

4. **Hacer clic en "Generar texto"**

5. **Copiar resultado** con un clic en el botón 📋

### 🎯 **Casos de Uso Recomendados**

- **📧 Emails profesionales**: Solicitudes, respuestas, comunicaciones formales
- **📝 Contenido web**: Descripciones de productos, textos de marketing
- **📄 Documentos**: Informes, propuestas, presentaciones
- **💬 Comunicación**: Posts de redes sociales, mensajes personalizados
- **📚 Educativo**: Ensayos, explicaciones, resúmenes

## 🎨 Interfaz de Usuario

### 🎨 **Diseño Responsive**

#### **🖥️ Pantallas Grandes (>768px)**:
- Layout en dos columnas para selectores de tono y longitud
- Área de texto amplia para comodidad de escritura
- Botón de copia posicionado estratégicamente

#### **📱 Dispositivos Móviles (<768px)**:
- Layout en una columna para mejor legibilidad
- Botones optimizados para toque
- Tipografía escalable

### 🎨 **Sistema de Colores**

```css
/* Paleta principal */
--primary: #047ba6        /* Color corporativo */
--primary-hover: #064953  /* Color corporativo oscuro */
--bgcolor: #f2f8f9       /* Fondo suave */
--text-color: #001218    /* Negro suave */
```

### 🔄 **Estados de la Aplicación**

| Estado | Icono | Descripción |
|--------|-------|-------------|
| ⌛ | Cargando | Verificando disponibilidad |
| 📥 | Descargando | Modelo de IA descargándose |
| ✍️ | Generando | Creando contenido |
| 📋 | Listo | Preparado para copiar |
| ✅ | Copiado | Texto en portapapeles |
| ❌ | Error | Sin contenido para copiar |

## 🔒 Privacidad y Seguridad

### 🛡️ **Procesamiento Local**

- **Sin envío de datos**: Todo el procesamiento ocurre en tu dispositivo
- **Sin servidores externos**: No hay comunicación con APIs remotas
- **Sin almacenamiento persistente**: Los textos generados no se guardan automáticamente
- **Sin tracking**: No se recopila información de uso

### 🔐 **Seguridad**

- **APIs modernas**: Utiliza únicamente APIs nativas del navegador
- **Validación de entrada**: Sanitización automática de inputs
- **CSP Ready**: Compatible con Content Security Policies estrictas
- **HTTPS Friendly**: Funciona perfectamente en conexiones seguras

### 📊 **Transparencia**

- **Código abierto**: Todo el código fuente está disponible para inspección
- **Sin minificación**: Código legible para auditoría
- **Documentación completa**: Funcionalidad completamente documentada

## 🐛 Solución de Problemas

### ❌ **Problemas Comunes**

#### **"❌ Esta versión de tu navegador no admite la API de Writer"**

**Causas posibles**:
- Chrome versión anterior a 127.0
- Flags no habilitados correctamente
- Navegador no compatible (Edge, Firefox, Safari)

**Soluciones**:
1. Actualizar Chrome a la versión más reciente
2. Verificar y habilitar flags necesarios
3. Reiniciar completamente el navegador

#### **"🚧 El API de Writer no está disponible ahora"**

**Causas posibles**:
- Modelo de IA no descargado
- Conexión a internet interrumpida durante descarga
- Espacio insuficiente en disco

**Soluciones**:
1. Verificar conexión a internet
2. Liberar al menos 2GB de espacio en disco
3. Intentar en una pestaña de incógnito
4. Limpiar caché del navegador

#### **El botón copiar no funciona**

**Causas posibles**:
- Permisos de portapapeles no otorgados
- Sitio web no está en HTTPS
- Extensiones de navegador interfiriendo

**Soluciones**:
1. Permitir acceso al portapapeles cuando se solicite
2. Usar HTTPS o localhost
3. Probar en modo incógnito
4. El fallback automático debería funcionar

### 🔧 **Diagnóstico Avanzado**

#### **Verificar Estado de APIs**:

```javascript
// Ejecutar en Console de DevTools
console.log('APIs disponibles:');
console.log('- Writer API:', 'ai' in window && 'writer' in window.ai);
console.log('- Clipboard API:', 'clipboard' in navigator);
console.log('- Chrome:', /Chrome/.test(navigator.userAgent));
```

#### **Verificar Descarga de Modelo**:

```javascript
// Verificar disponibilidad del modelo
(async () => {
  try {
    const availability = await ai.writer.availability();
    console.log('Estado del modelo:', availability);
  } catch (error) {
    console.error('Error:', error);
  }
})();
```

### 📞 **Obtener Ayuda**

Si los problemas persisten:

1. **Verificar requisitos**: Asegurar que cumples todos los requisitos mínimos
2. **Consultar documentación**: Revisar las secciones relevantes de este README
3. **Buscar issues**: Verificar si es un problema conocido en GitHub
4. **Reportar bug**: Crear un issue con detalles específicos

## 📖 Documentación Técnica

### 🏗️ **Arquitectura de la Aplicación**

graph TD
    A[Usuario] --> B[Interface HTML]
    B --> C{Selecciona Modo}
    C -->|Escribir| D[Writer API]
    C -->|Reescribir| E[Rewriter API]
    D --> F[Modelo IA Local]
    E --> F
    F --> G[Texto Generado]
    G --> H[Mostrar en Output]
    H --> I[Clipboard API]
    I --> J[Portapapeles]

### 📁 **Estructura del Código**

#### **HTML (index.html)**:
- **Estructura semántica** con elementos apropiados
- **Modal system** para advertencias de compatibilidad
- **Form controls** optimizados para accesibilidad
- **Progressive enhancement** ready

#### **CSS (styles.css)**:
- **CSS Custom Properties** para theming consistente
- **Mobile-first** responsive design
- **Modern layout** con Flexbox y Grid
- **Smooth animations** y transiciones

#### **JavaScript (main.js)**:
- **Modern ES6+ syntax** con async/await
- **Modular architecture** con funciones especializadas
- **Error handling** robusto con fallbacks
- **Browser compatibility** detection

### 🔌 **APIs Utilizadas**

#### **Chrome Writer API**:
```javascript
// Crear instancia del modo Escritor
const writer = await ai.writer.create({
  tone: 'formal',
  length: 'medium'
});
// Generar texto
const result = await writer.write(prompt, { context });

```

#### **Chrome Rewriter API**:
```javascript
// Crear instancia del modo Reescribir
const rewriter = await ai.rewriter.create({
  tone: 'more-formal',
  length: 'shorter'
});
// Reescribir texto
const result = await rewriter.rewrite(previousText, { context });
```

#### **Clipboard API**:
```javascript
// Método moderno
await navigator.clipboard.writeText(text);

// Fallback para navegadores antiguos
const textArea = document.createElement('textarea');
textArea.value = text;
document.body.appendChild(textArea);
textArea.select();
document.execCommand('copy');
document.body.removeChild(textArea);
```

### ⚡ **Optimizaciones de Rendimiento**

- **Lazy loading** del modelo de IA
- **Caching** de instancias Writer
- **Debounced events** para mejor UX
- **Minimal DOM manipulation** para fluidez

## 🤝 Contribuciones

### 🔧 **Cómo Contribuir**

1. **Fork** el repositorio
2. **Crear** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** tus cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Crear** un Pull Request

### 📝 **Guías de Desarrollo**

#### **Estilo de Código**:
- **JavaScript**: ES6+, camelCase, comentarios JSDoc
- **CSS**: BEM methodology, mobile-first
- **HTML**: Semantic markup, accessibility first

#### **Commit Messages**:
```
feat: añadir nueva funcionalidad de export
fix: corregir bug en detección de navegador
docs: actualizar documentación de API
style: mejorar estilos del modal
refactor: optimizar función de copia
```

### 🧪 **Testing**

Para probar cambios localmente:

1. **Verificar** en múltiples resoluciones
2. **Probar** en Chrome Canary y Chrome stable
3. **Validar** accesibilidad con herramientas DevTools
4. **Confirmar** funcionamiento offline

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

### 📋 **Resumen de la Licencia**:

✅ **Puedes**:
- Usar comercialmente
- Modificar el código
- Distribuir
- Uso privado

❌ **No puedes**:
- Responsabilizar a los autores
- Usar marcas comerciales sin permiso

📄 **Debes**:
- Incluir el copyright original
- Incluir la licencia MIT

---

## 🌟 **¡Gracias por usar Pluma Digital!**

Si encuentras útil esta aplicación, considera:

- ⭐ **Dar una estrella** al repositorio
- 🐛 **Reportar bugs** que encuentres
- 💡 **Sugerir mejoras** nuevas
- 🤝 **Contribuir** con código

### 📞 **Contacto**

- **GitHub Issues**: Para bugs y features
- **Documentación**: Este README para referencia
- **Código fuente**: Disponible para inspección y mejora

**¡Disfruta creando contenido increíble con IA local! ✨**

---

*Última actualización: Agosto 2025*
*Versión de la aplicación: 1.0.0*
*Versión mínima de Chrome: 127.0*
