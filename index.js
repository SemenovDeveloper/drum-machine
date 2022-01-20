const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

function App() { 
  const [volume, setVolume] = React.useState(0.5);
  const [record, setRecord] = React.useState("");
  

  const changeVolume = (e) => {
    setVolume(e.target.value);
  }

  const playRecord = () =>{
    const sounds = record.split(" ");
    for(let i=0; i < sounds.length; i++){
      setTimeout( () => {
        const audioTag = document.getElementById(sounds[i]);
        console.log(audioTag);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
      }, i * 500, i);
    }
  }

  const clearRecord = () => {
    setRecord("");
  }

  return (
    <div className="bg-info text-white min-vh-100">
      <div className="text-center">
        <h1>Drum Machine</h1>
        {audioClips.map(clip => (
          <Pad 
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
            <div className="btn bg-white m-2">rec</div>
            <div className="btn bg-white m-2" onClick={playRecord}>play</div>
            <div className="btn bg-white m-2" onClick={clearRecord}>clear</div>
          </div>
          <div>{record}</div>
        </div>
      </div>
    </div>
  )
}

function Pad(props) {
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
      props.setRecord(record => record + props.clip.keyTrigger + " ");
      ;
    }


    return (
      <div onClick={playSound} className="btn bg-light p-4 m-4">
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