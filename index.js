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
  boxShadow: '3px 3px 5px black'
};

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
};

function App() { 
  const [volume, setVolume] = React.useState(0.5);
  const [record, setRecord] = React.useState("");
  const [recordStatus, setRecordStatus] = React.useState(false);  

  const changeVolume = (e) => {
    setVolume(e.target.value);
  }

  const playRecord = () =>{
    const sounds = record.split("");
    for(let i=0; i < sounds.length; i++){
      setTimeout( () => {
        const audioTag = document.getElementById(sounds[i]);
        console.log(audioTag);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
      }, i * 350);
    }
  }

  const clearRecord = () => {
    setRecord("");
  }

  const recordToggler = () => {
    setRecordStatus(!recordStatus);
  }

  return (
    <div className="bg-info text-white min-vh-100">
      <div className="text-center">
        <h1>Drum Machine</h1>
        {audioClips.map(clip => (
          <Pad            
            recordStatus={recordStatus}
            key={clip.id} 
            clip={clip} 
            volume={volume} 
            record={record} 
            setRecord={setRecord}/>
        ))}
        <br/>
        <div id="display"></div>
        <br/>
        <div>
          <h3>Volume</h3>
          <input 
            min="0"
            max="1"
            step="0.01"
            type="range" 
            value={volume}
            onChange={changeVolume}
          ></input>
          <div>{Math.round(volume*100) + "%"}</div>
          <div>
            <div className="btn bg-white m-2" onClick={recordToggler}><i className="fas fa-record-vinyl"></i></div>
            <div className="btn bg-white m-2" onClick={playRecord}><i className="white fas fa-play"></i></div>
            <div className="btn bg-white m-2" onClick={clearRecord}><i className="far fa-trash-alt"></i></div>
          </div>
          <div>{record}</div>
        </div>
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
      <div onClick={playSound} className="btn p-4 m-4" style={padStyle}
      >
        <audio      
          className="clip"
          id={props.clip.keyTrigger}
          src={props.clip.url}
        />
        {props.clip.keyTrigger}
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))