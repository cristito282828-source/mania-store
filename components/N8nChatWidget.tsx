"use client";

import { useEffect, useState } from "react";

export default function N8nChatWidget() {
  // URL del webhook de n8n (Chat Trigger node → Production URL)
  const chatUrl =
    process.env.NEXT_PUBLIC_N8N_CHAT_URL ||
    "https://n8n.neuralflow.space/webhook/aee75768-0aa3-4341-9294-870752820cbb/chat";

  const [visible, setVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Cerrar el chat con tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) {
        setVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  const toggleChat = () => setVisible((v) => !v);
  const closeChat = () => setVisible(false);

  return (
    <>
      {/* Botón flotante - Esquina inferior derecha */}
      <button
        onClick={toggleChat}
        aria-label={visible ? "Cerrar chat de asistencia" : "Abrir chat de asistencia"}
        aria-expanded={visible}
        className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 bg-black text-[#34efc2] hover:bg-neutral-900 hover:scale-105 rounded-full px-5 py-3 shadow-lg transition-all duration-300 border-2 border-[#34efc2] font-bold"
      >
        <span className="text-2xl" aria-hidden="true">
          {visible ? "✕" : "💬"}
        </span>
        <span className="text-sm uppercase tracking-wider">
          {visible ? "Cerrar" : "Asistente"}
        </span>
      </button>

      {/* Iframe del chatbot */}
      {visible && (
        <>
          {/* Overlay clickeable para cerrar (mobile-friendly) */}
          <div
            onClick={closeChat}
            className="fixed inset-0 z-[9997] bg-black/30 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-label="Chat de asistencia ManiaBot"
            className="fixed bottom-20 right-5 z-[9998] animate-in slide-in-from-bottom-4 duration-300"
          >
            {/* Header con botón cerrar (visible en desktop) */}
            <div className="hidden md:flex justify-end mb-2">
              <button
                onClick={closeChat}
                aria-label="Cerrar chat"
                className="bg-black/80 text-[#34efc2] hover:bg-neutral-900 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold border-2 border-[#34efc2] transition-all hover:scale-110"
              >
                ✕
              </button>
            </div>

            <iframe
              src={chatUrl}
              onLoad={() => setIframeLoaded(true)}
              onError={() => console.error("Error al cargar el iframe del chatbot")}
              title="Chat de asistencia ManiaBot"
              className="w-[350px] h-[500px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vh-7rem)] border-0 rounded-2xl shadow-2xl bg-black"
              style={{
                display: iframeLoaded ? "block" : "none",
              }}
            />

            {/* Loading state mientras carga el iframe */}
            {!iframeLoaded && (
              <div className="w-[350px] h-[500px] max-w-[calc(100vw-2.5rem)] border-2 border-[#34efc2] rounded-2xl bg-black flex flex-col items-center justify-center text-[#34efc2]">
                <div className="w-12 h-12 border-4 border-[#34efc2] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-bold uppercase tracking-wider">
                  Conectando con ManiaBot...
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
