const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const defaultStyle = {
  backgroundColor: 'white',
};

const activeStyle = {
  backgroundColor: 'yellow',
};

function App() { 
  const [volume, setVolume] = React.useState(0.5);
  const [speed, setSpeed] = React.useState(1);
  const [record, setRecord] = React.useState("");
  const [recordStatus, setRecordStatus] = React.useState(false);
  const [playStatus, setPlayStatus] = React.useState(false);

  const changeVolume = (e) => {
    setVolume(e.target.value);
  }

  const changeSpeed = (e) => {
    setSpeed(e.target.value);
  }

  const playRecord = () =>{
    const sounds = record.split("");
    for(let i=0; i < sounds.length; i++){
      setTimeout( () => {
        const audioTag = document.getElementById(sounds[i]);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setPlayStatus(true);
      }, i * (1/speed) * 300);
    }    
    setTimeout( () => {
      setPlayStatus(false);
    }, sounds.length * (1/speed) * 300)
  }

  const clearRecord = () => {
    const clearBtn = document.getElementById("clear-btn");
    clearBtn.style.backgroundColor = "yellow";
    setRecord("");
    setTimeout( () => {clearBtn.style.backgroundColor = "white"},300)
  }

  const recordToggler = () => {
    setRecordStatus(!recordStatus);
  }

  return (
    <div id="drum-machine">
      <h1>Drum Machine</h1>
      <div id="functional-components">
        <div id="pad-panel">
          {audioClips.map(clip => (
          <Pad            
            recordStatus={recordStatus}
            key={clip.id} 
            clip={clip} 
            volume={volume} 
            record={record} 
            setRecord={setRecord}/>
          ))}
        </div>
        <div id="control-panel">
          <div id="display"></div>
          <div id="volume-bar" className="control-bars">
            <p>Volume</p>
            <input 
              min="0"
              max="1"
              step="0.01"
              type="range" 
              value={volume}
              onChange={changeVolume}
            ></input>
            <div>{Math.round(volume*100) + "%"}</div>
          </div>
          <div id="speed-bar" className="control-bars">
            <p>Speed</p>
            <input 
              min="0.1"
              max="5"
              step="0.1"
              type="range" 
              value={speed}
              onChange={changeSpeed}
            ></input>
            <div>{speed}x</div>
            </div>
          <div id="control-buttons">
            <button
              onClick={recordToggler} 
              style={recordStatus ? {backgroundColor: "red"}:{backgroundColor: "white"}}
            >
              <i className="fas fa-record-vinyl"></i></button>
            <button    
              onClick={playRecord}
              style={playStatus ? {backgroundColor: "green"}:{backgroundColor: "white"}}
            ><i className="white fas fa-play"></i></button>
            <button
              id="stop-btn"
              style={{backgroundColor: 'white'}}
            ><i className="fas fa-stop"></i></button>
            <button
              id="clear-btn"
              style={{backgroundColor: 'white'}}
              onClick={clearRecord}
            ><i className="far fa-trash-alt" ></i></button> 
          </div>
        </div>
      </div>
      <div className="footer"><a id="footer" target="_blank" href="https://github.com/SemenovDeveloper"><i className="fab fa-github-square"></i>by SemenovDeveloper</a>
      </div>
    </div>
  )
}

function Pad(props) {
    const [padStyle, setPadStyle] = React.useState(defaultStyle)

    React.useEffect( () => {
      document.addEventListener("keydown", playByKeyPress);
      return () => {
        document.removeEventListener("keydown", playByKeyPress);
      }
    });

    const displayClipId = () => {
      const display = document.getElementById("display");
      display.innerHTML = props.clip.id;
    }

        const playByKeyPress = (e) => {
      if(e.keyCode === props.clip.keyCode) {
        playSound();
      }
    }

    const playSound = () => {
      const audioTag = document.getElementById(props.clip.keyTrigger);
      audioTag.volume = props.volume;
      audioTag.currentTime = 0;
      audioTag.play();
      displayClipId();
      setPadStyle(activeStyle);
      setTimeout( () => {setPadStyle(defaultStyle)},200)
      if (props.recordStatus) {
        props.setRecord(record => record + props.clip.keyTrigger);
      }
    }


    return (
      <div onClick={playSound} className="drum-pad btn" style={padStyle}>
        <audio      
          className="clip"
          id={props.clip.keyTrigger}
          src={props.clip.url}
        />
        <div>{props.clip.keyTrigger}</div>
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))