import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const PanoramaViewer = forwardRef(({ currentScene, onSceneChange }, ref) => {
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
          hfov: 100,
          minHfov: 50,
          maxHfov: 120,
          minPitch: 0,
          maxPitch: 0,
          hotSpots: [
            {
              id: 'dinamico1',
              pitch: 10,
              yaw: 15,
              type: "info",
              text: 'Hotspot dinámico',
              URL: "https://google.com"
            },
            {
              pitch: 10,
              yaw: 0,
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
          hfov: 80,
          minHfov: 80,
          maxHfov: 80,
          minPitch: 0,
          maxPitch: 0,
          hotSpots: [
            {
              id: 'dinamico2',
              pitch: 10,
              yaw: 15,
              type: "info",
              text: 'Hotspot dinámico',
              URL: "https://www.kiconex.com/"
            },
            {
              pitch: 10,
              yaw: 0,
              type: "scene",
              text: "Volver a Escena 1",
              sceneId: "escena1"
            }
          ]
        }
      }
    });

    viewerInstance.current.on('scenechange', () => {
      const newScene = viewerInstance.current.getScene();
      onSceneChange?.(newScene);
    });

    return () => viewerInstance.current?.destroy();
  }, []);

  useEffect(() => {
    viewerInstance.current?.loadScene(currentScene);
  }, [currentScene]);

  useImperativeHandle(ref, () => ({
    updateHotspot({ id, pitch, yaw, text = "Actualizado" }) {
      try {
        viewerInstance.current.removeHotSpot(id);
      } catch (e) {
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
