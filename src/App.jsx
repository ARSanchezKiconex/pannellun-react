import { useRef, useEffect, useState } from 'react';
import PanoramaViewer from './components/PanoramaViewer';

function App() {
  const viewerRef = useRef();
  const [scene, setScene] = useState('escena1');

  useEffect(() => {
    let yaw = 0;
    const interval = setInterval(() => {
      yaw = (yaw + 30) % 360;
      viewerRef.current?.updateHotspot({
        id: "dinamico1",
        pitch: 0,
        yaw,
        text: `Yaw: ${yaw}`
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
