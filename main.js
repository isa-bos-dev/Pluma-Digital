/* ===================================================================
   PLUMA DIGITAL - APLICACIÓN DE ESCRITURA CON IA
   =================================================================== */

// ===================================================================
// ESTADO GLOBAL Y SELECTORES DEL DOM
// ===================================================================

let currentMode = 'writer'; // Modo inicial: 'writer' o 'rewriter'
let apiInstance; // Almacenará la instancia de la API (Writer o Rewriter)

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
        context: "Mejora el texto del usuario evitando lenguaje tóxico o maleducado, mejorando la comprensión y corrigiendo faltas de ortografía. Responde siempre en el mismo idioma esta el texto introducido.",
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
    }
};

// ===================================================================
// FUNCIONES DE LA INTERFAZ DE USUARIO (UI)
// ===================================================================

/**
 * Actualiza la UI (labels, placeholders, opciones de select) según el modo seleccionado.
 * @param {string} mode - El modo actual ('writer' o 'rewriter').
 */
function updateUIForMode(mode) {
    const options = modeOptions[mode];

    document.querySelector('label[for="text-input"]').textContent = options.label;
    document.querySelector("#text-input").placeholder = options.placeholder;
    actionBtn.innerHTML = options.buttonText;

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
}

// ===================================================================
// LÓGICA PRINCIPAL DE LA APLICACIÓN
// ===================================================================

/**
 * Event listener principal para el botón de acción (Generar/Reescribir)
 */
actionBtn.addEventListener("click", async () => {
    const textInput = document.querySelector("#text-input").value.trim();
    const tone = document.querySelector("#tone").value;
    const length = document.querySelector("#length").value;
    const output = document.querySelector("#output");

    const currentOptions = modeOptions[currentMode];

    if (!textInput) {
        output.textContent = `⚠️ Por favor, introduce el texto que quieres ${currentMode === 'writer' ? 'generar' : 'reescribir'}.`;
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
    
    const apiConfig = { tone, length };

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

    output.textContent = `✍️ ${currentMode === 'writer' ? 'Generando' : 'Reescribiendo'} texto...`;
    
    let result;
    if (currentMode === 'writer') {
        result = await apiInstance.write(textInput, { context: currentOptions.context });
    } else {
        result = await apiInstance.rewrite(textInput, { context: currentOptions.context });
    }

    output.textContent = result;
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