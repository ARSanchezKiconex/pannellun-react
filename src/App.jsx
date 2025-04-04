import { useState } from 'react';
import PanoramaViewer from './components/PanoramaViewer';

function App() {
  const [scene, setScene] = useState('escena1');

  return (
    <div>
      <h1>Tour 360º React + Pannellum</h1>
      {/* <PanoramaViewer currentScene={scene} onSceneChange={setScene} /> */}
      <PanoramaViewer
        currentScene="escena1"
        onSceneChange={setScene}
      />

    </div>
  );
}

export default App;
