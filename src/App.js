import './App.css';
import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

function App() {
  
  const [frame, setFrame] = useState(0);
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(0);
  const [instance, setInstance] = useState(null);

  const getValidFrame = (e) => {
    let cur = e.target.value;
    if (isNaN(cur))
      cur = 0;
    cur = Math.max(cur, 0);
    cur = Math.min(cur, 20);
    return cur;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startFrame >= endFrame) {
      alert('Invalid sequence!');
      return;
    }

    instance.playSegments([startFrame, endFrame], true);
    setStartFrame(0);
    setEndFrame(0);
  };

  return (
    <div className="App">
      <h3> Current Frame: {frame} </h3>

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={startFrame} onChange={(e) => setStartFrame(getValidFrame(e))} />
          <input type="text" value={endFrame} onChange={(e) => setEndFrame(getValidFrame(e))} />
        </label>
        <input type="submit" value="Set"/>
      </form>

      <button onClick={() => instance.playSegments([0, 20], true)}> Play </button>

      <Player
        lottieRef={instance => {
          setInstance(instance);
        }}
        onEvent={e => {
          if (e === 'frame') {
            setFrame(Math.round(instance.currentRawFrame));
          }
        }}
        autoplay={true}
        loop={true}
        controls={true}
        src={require('./assets/yoga.json')}
        style={{height: '400px', width: '400px'}}
      >
      </Player>

      <button onClick={() => instance.setSpeed(0.25)}> 0.25x </button>
      <button onClick={() => instance.setSpeed(1.00)}> 1.00x </button>
      <button onClick={() => instance.setSpeed(2.00)}> 2.00x </button>
    </div>
  );
}

export default App;
