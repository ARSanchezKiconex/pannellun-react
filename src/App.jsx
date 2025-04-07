import { useRef, useEffect, useState } from 'react';
import PanoramaViewer from './components/PanoramaViewer';

function App() {
  const viewerRef = useRef();
  const [scene, setScene] = useState('escena1');

  useEffect(() => {
    let yaw = 0;
    const interval = setInterval(() => {
      const temp = (20 + Math.random() * 5).toFixed(1);
      viewerRef.current?.updateHotspot({
        id: "dinamico1",
        pitch: 10,
        yaw: 15,
        text: `Temperatura: ${temp}°C`
      });
    }, 2000);    

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Hotspot dinámico en tiempo real</h1>
      <PanoramaViewer ref={viewerRef} currentScene={scene} />
    </div>
  );
}

export default App;
