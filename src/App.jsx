import React, { useRef, useEffect, useState } from "react";
import PanoramaViewer from "./components/PanoramaViewer";

const App = () => {
  const viewerRef = useRef();
  const [scene, setScene] = useState("escena1");
  const [hotspotText, setHotspotText] = useState("");

  const handleUpdateHotspot = () => {
    const hotspotConfig = {
      escena1: {
        id: "dinamico1",
        pitch: 10,
        yaw: 15
      },
      escena2: {
        id: "dinamico2",
        pitch: 10,
        yaw: 15
      }
    };

    const hotspot = hotspotConfig[scene];
    if (!hotspot) return;

    viewerRef.current.updateHotspot({
      ...hotspot,
      text: hotspotText || "Texto por defecto"
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const horaActual = now.toLocaleTimeString();

      if (scene === "escena1") {
        viewerRef.current?.updateHotspot({
          id: "dinamico1",
          pitch: 10,
          yaw: 15,
          text: `Hora actual: ${horaActual}`
        });
      } else if (scene === "escena2") {
        viewerRef.current?.updateHotspot({
          id: "dinamico2",
          pitch: 10,
          yaw: 15,
          text: `Hora actual: ${horaActual}`
        });
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [scene]);

  return (
    <div>
      <h2>Editor de Hotspot</h2>

      <input
        type="text"
        value={hotspotText}
        onChange={(e) => setHotspotText(e.target.value)}
        placeholder="Escribe el nuevo texto"
        style={{ width: "60%", marginRight: "1rem" }}
      />
      <button onClick={handleUpdateHotspot}>Actualizar Hotspot</button>

      <p>Escena actual: <strong>{scene}</strong></p>

      <div style={{width: '1000px'}}>
        <PanoramaViewer
          ref={viewerRef}
          currentScene={scene}
          onSceneChange={(newScene) => setScene(newScene)}
        />
      </div>
    </div>
  );
}

export default App;
