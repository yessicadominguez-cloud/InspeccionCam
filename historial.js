// ── Historial de inspecciones, compartido entre index.html y supervisor.html ──
// Solo para el mockup: usa localStorage (mismo origen, así que ambas pantallas
// ven los mismos datos sin necesitar servidor). En producción esto lo reemplaza
// el registro que guarda deviceWISE EDGE por cada inspección.

const IV_HISTORIAL_KEY = 'iv_historial';
const IV_HISTORIAL_MAX = 40; // localStorage tiene límite (~5-10MB) y las imágenes pesan

function ivGuardarInspeccion(registro) {
  const lista = ivLeerHistorial();
  lista.unshift(registro);
  while (lista.length > IV_HISTORIAL_MAX) lista.pop();
  ivGuardarLista(lista);
}

function ivGuardarLista(lista) {
  try {
    localStorage.setItem(IV_HISTORIAL_KEY, JSON.stringify(lista));
  } catch (e) {
    // Cupo de localStorage excedido (demasiadas imágenes base64) — recorta y reintenta.
    if (lista.length > 1) {
      lista.pop();
      ivGuardarLista(lista);
    } else {
      console.warn('[Historial] No se pudo guardar: localStorage lleno.', e.message);
    }
  }
}

function ivLeerHistorial() {
  try { return JSON.parse(localStorage.getItem(IV_HISTORIAL_KEY)) ?? []; } catch { return []; }
}

function ivLimpiarHistorial() {
  localStorage.removeItem(IV_HISTORIAL_KEY);
}
