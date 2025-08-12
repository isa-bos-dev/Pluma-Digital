/* ===================================================================
   PLUMA DIGITAL - APLICACIÓN DE ESCRITURA CON IA (v3.0)
   ===================================================================
   
   Suite de herramientas con tres modos:
   1. Writer: Genera texto desde una idea.
   2. Rewriter: Reformula un texto existente.
   3. Summarizer: Condensa textos largos.
   
   =================================================================== */

// ===================================================================
// ESTADO GLOBAL Y SELECTORES DEL DOM
// ===================================================================

let currentMode = 'writer'; // Modo inicial: 'writer', 'rewriter', o 'summarizer'
let apiInstance; // Almacenará la instancia de la API (Writer , Rewriter , Summarizer)

const actionBtn = document.querySelector("#action-btn");
const copyBtn = document.querySelector("#copy-btn");
const modeSelector = document.querySelector(".mode-selector");

// ===================================================================
// DATOS Y CONFIGURACIÓN DE LOS MODOS
// ===================================================================

const modeOptions = {
    writer: {
        label: "💡 ¿Qué quieres que la IA te escriba?",
        placeholder: "Ejemplo: Redactar un email para aplicar a una oferta de trabajo...",
        buttonText: "✏️ Generar texto",
        api: self.Writer,
        apiName: "Writer",
        showSelectors: true, // Mostrar selectores de tono y longitud
        context: "Eres un asistente de escritura. Responde siempre en el mismo idioma en el que el usuario te escribe, basándote en la idea que te proporciona.",
        toneOptions: [
            { value: 'neutral', text: 'Neutral' },
            { value: 'formal', text: 'Formal' },
            { value: 'casual', text: 'Casual' }
        ],
        lengthOptions: [
            { value: 'short', text: 'Corto' },
            { value: 'medium', text: 'Medio' },
            { value: 'long', text: 'Largo' }
        ]
    },
    rewriter: {
        label: "📝 ¿Qué texto quieres reescribir?",
        placeholder: "Pega aquí el texto que deseas mejorar o reformular...",
        buttonText: "📝 Reescribir texto",
        api: self.Rewriter,
        apiName: "Rewriter",
        showSelectors: true, // Mostrar selectores
        context: "Mejora el texto del usuario evitando lenguaje tóxico o maleducado, mejorando la comprensión y corrigiendo faltas de ortografía. Responde siempre en el mismo idioma del texto introducido.",
        toneOptions: [
            { value: 'as-is', text: 'Como está' },
            { value: 'more-formal', text: 'Más Formal' },
            { value: 'more-casual', text: 'Más Casual' }
        ],
        lengthOptions: [
            { value: 'as-is', text: 'Como está' },
            { value: 'shorter', text: 'Más Corto' },
            { value: 'longer', text: 'Más Largo' }
        ]
    },
    summarizer: {
        label: "📄 ¿Qué texto quieres resumir?",
        placeholder: "Pega aquí el artículo, ensayo o texto largo que quieras condensar...",
        buttonText: "📄 Resumir texto",
        api: self.Summarizer,
        apiName: "Summarizer",
        showSelectors: false, // ¡No mostrar selectores para el resumidor!
        context: "Crea un resumen conciso y claro del texto proporcionado. Mantén el mismo idioma del texto original.",
    }
};

// ===================================================================
// FUNCIONES DE LA INTERFAZ DE USUARIO (UI)
// ===================================================================

/**
 * Actualiza la UI (labels, placeholders, opciones de select) según el modo seleccionado.
 * @param {string} mode - El modo actual ('writer', 'rewriter', 'summarizer').
 */
function updateUIForMode(mode) {
    const options = modeOptions[mode];
    const formRow = document.querySelector(".form-row");

    document.querySelector('label[for="text-input"]').textContent = options.label;
    document.querySelector("#text-input").placeholder = options.placeholder;
    actionBtn.innerHTML = options.buttonText;

    // Mostrar u ocultar los selectores de tono y longitud
    if (options.showSelectors) {
        formRow.classList.remove('hidden');
        const populateSelect = (selectId, optionList) => {
            const selectElement = document.querySelector(selectId);
            selectElement.innerHTML = '';
            optionList.forEach(opt => {
                const optionElement = document.createElement('option');
                optionElement.value = opt.value;
                optionElement.textContent = opt.text;
                selectElement.appendChild(optionElement);
            });
        };
        populateSelect("#tone", options.toneOptions);
        populateSelect("#length", options.lengthOptions);
    } else {
        formRow.classList.add('hidden');
    }
}

// ===================================================================
// LÓGICA PRINCIPAL DE LA APLICACIÓN
// ===================================================================

/**
 * Event listener principal para el botón de acción (Generar/Reescribir)
 */
actionBtn.addEventListener("click", async () => {
    const textInput = document.querySelector("#text-input").value.trim();
    const output = document.querySelector("#output");
    const currentOptions = modeOptions[currentMode];

    if (!textInput) {
        output.textContent = `⚠️ Por favor, introduce el texto que quieres ${currentMode === 'writer' ? 'generar' : (currentMode === 'rewriter' ? 'reescribir' : 'resumir')}.`;
        return;
    }

    output.textContent = "⌛ Comprobando disponibilidad...";
    
    const Api = currentOptions.api;

    if (!Api) {
        output.textContent = `❌ Tu navegador no admite la API de ${currentOptions.apiName}. Por favor, usa Google Chrome actualizado y habilita las flags correspondientes.`;
        return;
    }

    const availability = await Api.availability();

    if (availability === "unavailable") {
        output.textContent = `🚧 La API de ${currentOptions.apiName} no está disponible ahora.`;
        return;
    }
    
    let apiConfig = {};
    if (currentMode === 'summarizer') {
        apiConfig = { type: 'tldr', length: 'medium' }; 
    } else {
        apiConfig = { 
            tone: document.querySelector("#tone").value, 
            length: document.querySelector("#length").value 
        };
    }

    if (availability === "available") {
        apiInstance = await Api.create(apiConfig);
    } else {
        apiInstance = await Api.create(apiConfig, {
            monitor: (m) => {
                m.addEventListener("downloadprogress", e => {
                    const percentage = Math.round(e.progress * 100);
                    output.textContent = `📥 Descargando modelo de IA local: ${percentage}%`;
                });
            }
        });
    }

    output.textContent = `✍️ ${currentMode === 'writer' ? 'Generando' : (currentMode === 'rewriter' ? 'Reescribiendo' : 'Resumiendo')} texto...`;
    
    let result;
    try {
        switch (currentMode) {
            case 'writer':
                result = await apiInstance.write(textInput, { context: currentOptions.context });
                output.textContent = result;
                break;
            case 'rewriter':
                result = await apiInstance.rewrite(textInput, { context: currentOptions.context });
                output.textContent = result;
                break;
            case 'summarizer':
                // Normalmente Summarizer nos devuelve el texto en ingles, poir lo que usaremos la API writer para traducirlo
                // Obtener el resumen (probablemente en inglés)
                output.textContent = "✍️ Creando resumen...";
                const englishSummary = await apiInstance.summarize(textInput);

                // Usar la API Writer para traducir el resumen
                output.textContent = "🌍 Traduciendo resumen al español...";
                
                // Creamos una instancia temporal de Writer específicamente para traducir
                const translator = await self.Writer.create(); 
                const spanishSummary = await translator.write(
                    `Traduce el siguiente texto al español: "${englishSummary}"`
                );

                output.textContent = spanishSummary;
                break;
        }
    } catch (error) {
        console.error("Error durante la operación de IA:", error);
        output.textContent = `❌ Ocurrió un error: ${error.message}`;
    }
});

// ===================================================================
// MANEJADORES DE EVENTOS ADICIONALES
// ===================================================================

// Event listener para el cambio de modo
modeSelector.addEventListener('change', (e) => {
    currentMode = e.target.value;
    updateUIForMode(currentMode);
    document.querySelector("#text-input").value = '';
    document.querySelector("#output").textContent = 'Aquí se mostrará el texto generado con IA ...';
});

/**
 * Event listener para el botón de copiar texto
 */
copyBtn.addEventListener("click", async () => {
    const output = document.querySelector("#output");
    const textToCopy = output.textContent.trim();
    
    if (!textToCopy || textToCopy.startsWith("Aquí se mostrará")) {
        copyBtn.textContent = "❌";
        setTimeout(() => { copyBtn.textContent = "📋"; }, 1500);
        return;
    }
    
    try {
        await navigator.clipboard.writeText(textToCopy);
        copyBtn.textContent = "✅";
        setTimeout(() => { copyBtn.textContent = "📋"; }, 1500);
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copyBtn.textContent = "✅";
        setTimeout(() => { copyBtn.textContent = "📋"; }, 1500);
    }
});

// ===================================================================
// COMPATIBILIDAD DEL NAVEGADOR
// ===================================================================

/**
 * Verifica si el navegador actual es Google Chrome genuino
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
 */
function showBrowserWarning() {
    const modal = document.getElementById('browser-modal');
    const closeBtn = document.getElementById('close-modal');
    
    modal.style.display = 'flex';
    
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Ejecutar comprobación de navegador y UI inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (!isChrome()) {
        showBrowserWarning();
    }
    updateUIForMode(currentMode);
});