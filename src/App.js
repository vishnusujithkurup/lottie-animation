import './App.css';
import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

function App() {
  
  const [frame, setFrame] = useState(0);
  const [formVal, setFormVal] = useState(0);
  const [instance, setInstance] = useState(null);

  const handleChange = (e) => {
    let cur = e.target.value;
    if (isNaN(cur))
      cur = 0;
    cur = Math.max(cur, 0);
    cur = Math.min(cur, 20);
    setFormVal(cur);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.goToAndStop(formVal, true);
    setFormVal(0);
  };

  return (
    <div className="App">
      <h3> Current Frame: {frame} </h3>

      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={formVal} onChange={handleChange} />
        </label>
        <input type="submit" value="Set"/>
      </form>

      <button onClick={() => instance.play()}> Play </button>

      <Player
        lottieRef={instance => {
          setInstance(instance);
        }}
        onEvent={e => {
          if (e === 'frame') {
            setFrame(Math.round(instance.currentFrame));
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
