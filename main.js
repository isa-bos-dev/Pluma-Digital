/* ===================================================================
   PLUMA DIGITAL - APLICACIÓN DE ESCRITURA CON IA
   ===================================================================
   
   Aplicación que utiliza la Chrome Writer API para generar texto usando
   inteligencia artificial local. Requiere Google Chrome para funcionar.
   
   Características:
   - Detección automática del navegador
   - Generación de texto con parámetros configurables  
   - Función de copiado al portapapeles con fallback
   - Modal de advertencia para navegadores incompatibles
   
   =================================================================== */

/* Variables globales */
let writer;
let generateBtn = document.querySelector("#generate-btn");
let copyBtn = document.querySelector("#copy-btn");

/**
 * Verifica si el navegador actual es Google Chrome genuino
 * Distingue Chrome de otros navegadores basados en Chromium
 */
function isChrome() {
    const userAgent = navigator.userAgent;
    const isChromium = userAgent.includes('Chrome');
    const isEdge = userAgent.includes('Edg');
    const isOpera = userAgent.includes('OPR') || userAgent.includes('Opera');
    const isBrave = navigator.brave !== undefined;
    
    return isChromium && !isEdge && !isOpera && !isBrave;
}

/**
 * Muestra el modal de advertencia cuando el navegador no es Chrome
 * Configura eventos de cierre del modal
 */
function showBrowserWarning() {
    const modal = document.getElementById('browser-modal');
    const closeBtn = document.getElementById('close-modal');
    
    modal.style.display = 'flex';
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/* Verificar navegador al cargar la página */
document.addEventListener('DOMContentLoaded', () => {
    if (!isChrome()) {
        showBrowserWarning();
    }
});

/**
 * Event listener principal para el botón de generar texto
 * Maneja todo el flujo de generación: validación, verificación de API,
 * inicialización del modelo Writer y generación del texto
 */
generateBtn.addEventListener("click", async () => {
    // Obtener valores del formulario
    const idea = document.querySelector("#idea").value.trim();
    const tone = document.querySelector("#tone").value;
    const length = document.querySelector("#length").value;
    const output = document.querySelector("#output");

    // Validación: verificar que el usuario haya ingresado una idea
    if (!idea) {
        output.textContent = "⚠️ Por favor, ¿qué quieres que la IA te escriba?";
        return;
    }

    // Mostrar mensaje de estado
    output.textContent = "⌛ comprobando disponibilidad...";

    // Verificar si el navegador soporta la Writer API
    if (!('Writer' in self)) {
        output.textContent = "❌ Esta versión de tu navegador no admite la API de Writer.\n\n" +
            "Si usas Chrome, verifica que:\n" +
            "• Tengas Chrome 127.0 o superior\n" +
            "• Hayas habilitado las siguientes flags en chrome://flags/:\n" +
            "  - Enables optimization guide on device\n" +
            "  - Prompt API for Gemini Nano\n" +
            "  - Writer API for Gemini Nano\n\n" +
            "Más información: https://developer.chrome.com/docs/ai/writer-api?hl=es-419";
        return;
    }

    // Comprobar el estado actual del modelo de IA
    const availability = await Writer.availability();

    if (availability === "unavailable") {
        output.textContent = "🚧 El API de Writer no está disponible ahora.";
        return;
    }

    // Opciones para personalizar el comportamiento del modelo Writer
    const options = {
        tone: tone,
        length: length,
        format: "plain-text",
        sharedContext: "Contenido generado desde una idea inicial del usuario"
    };

    // Crear instancia del modelo basado en la disponibilidad
    if (availability === "available") {
        writer = await Writer.create(options);
    } else {
        // Si el modelo necesita descargarse, monitoreamos el progreso
        writer = await Writer.create({
            ...options,
            monitor: (m) => {
                m.addEventListener("downloadprogress", e => {
                    const percentage = Math.round(e.progress * 100);
                    output.textContent = `📥 Descargando modelo de IA local: ${percentage}%`;
                });
            }
        });
    }

    // Generar y mostrar el texto
    output.textContent = "✍️ Generando texto...";
    const result = await writer.write(idea, {
        context: "Eres un asistente de escritura. Responde siempre en el mismo idioma en el que el usuario te escribe, basándote en la idea que te proporciona el usuario."
    });
    output.textContent = result;
});

/**
 * Event listener para el botón de copiar texto
 * Implementa copiado con Clipboard API moderna y fallback para navegadores antiguos
 */
copyBtn.addEventListener("click", async () => {
    const output = document.querySelector("#output");
    const textToCopy = output.textContent.trim();
    
    // Verificar si hay texto válido para copiar
    if (!textToCopy || textToCopy === "Aquí se mostrará el texto generado con IA ...") {
        copyBtn.textContent = "❌";
        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);
        return;
    }
    
    try {
        // Usar la moderna Clipboard API (requiere HTTPS o localhost)
        await navigator.clipboard.writeText(textToCopy);
        
        copyBtn.textContent = "✅";
        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);
        
    } catch (err) {
        // Método fallback para navegadores más antiguos
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyBtn.textContent = "✅";
        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);
    }
});