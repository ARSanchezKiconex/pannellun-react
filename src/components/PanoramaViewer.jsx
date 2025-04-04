import { useEffect, useRef } from 'react';

const PanoramaViewer = ({ currentScene, onSceneChange }) => {
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
          panorama: "https://pannellum.org/images/cerro-toco-0.jpg",
          hotSpots: [
            {
              pitch: 2,
              yaw: 120,
              type: "info",
              text: "Punto informativo en escena 1",
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
          panorama: "https://pannellum.org/images/alma.jpg",
          hotSpots: [
            {
              pitch: 2,
              yaw: 200,
              type: "info",
              text: "Punto informativo en escena 2",
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
    // Cambiar de escena cuando currentScene cambie
    if (viewerInstance.current) {
      viewerInstance.current.loadScene(currentScene);
    }
  }, [currentScene]);

  return <div ref={viewerRef} style={{ width: "100%", height: "500px" }} />;
};

export default PanoramaViewer;
