import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const PanoramaViewer = forwardRef(({ currentScene }, ref) => {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!window.pannellum) return;

    viewerInstance.current = pannellum.viewer(viewerRef.current, {
      default: {
        firstScene: currentScene,
        sceneFadeDuration: 1000,
        autoLoad: true,
      },
      scenes: {
        escena1: {
          title: "Escena 1",
          type: "equirectangular",
          panorama: "/panoramica-oficina1.jpg",
          hfov: 70,          // <-- Zoom por defecto
          //minHfov: 70,     // no puede alejarse más
          maxHfov: 70,     // no puede acercarse más tampoco
          minPitch: 0,
          maxPitch: 0, // <- Bloqueo vertical
          hotSpots: [
            {
              id: 'dinamico1',
              pitch: 2,
              yaw: 120,
              type: "info",
              text: 'Hotspot dinámico',
              URL: "https://google.com"
            },
            {
              pitch: 0,
              yaw: -160,
              type: "scene",
              text: "Ir a Escena 2",
              sceneId: "escena2"
            }
          ]
        },
        escena2: {
          title: "Escena 2",
          type: "equirectangular",
          panorama: "/panoramica1.jpg",
          hfov: 80,          // <-- Zoom por defecto
          minHfov: 80,     // no puede alejarse más
          maxHfov: 80,     // no puede acercarse más tampoco
          minPitch: 0,
          maxPitch: 0, // <- Bloqueo vertical
          hotSpots: [
            {
              id: 'dinamico2',
              pitch: 2,
              yaw: 200,
              type: "info",
              text: 'Hotspot dinámico',
              URL: "https://www.kiconex.com/"
            },
            {
              pitch: 0,
              yaw: 90,
              type: "scene",
              text: "Volver a Escena 1",
              sceneId: "escena1"
            }
          ]
        }
      }
    });

    return () => viewerInstance.current?.destroy();
  }, []);

  useEffect(() => {
    viewerInstance.current?.loadScene(currentScene);
  }, [currentScene]);

  // ⚡ Exponer método para actualizar hotspot
  useImperativeHandle(ref, () => ({
    updateHotspot({ id, pitch, yaw, text = "Actualizado" }) {
      try {
        viewerInstance.current.removeHotSpot(id);
      } catch (e) {
        // no pasa nada si no existe aún
      }
      viewerInstance.current.addHotSpot({
        id,
        pitch,
        yaw,
        type: "info",
        text
      });
    }
  }));

  return <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />;
});

export default PanoramaViewer;
