import React from 'react';
import smallBowl from './small-bowl.wav';
import harmonyBell from './harmonyBell.wav';

function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

export default class Home extends React.Component {
    state = {
      selectedTrack: null,
      player: "stopped",
      time: 0,
      duration: null,
    };

    componentDidMount() {
      this.player.addEventListener("timeupdate" , e => {
        this.setState({
          currentTime: e.target.currentTime,
          duration: e.target.duration
        })
      })
    }


    componentDidUnmount () {
      this.player.removeEventListener("timeupdate", () => {})
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state)
        if(this.state.selectedTrack !== prevState.selectedTrack || this.state.duration === this.state.currentTime ) {
          let track;
          switch(this.state.selectedTrack) {
            case "Small Bowl":
              track = smallBowl
            break;
            case "Harmony Bell":
              track = harmonyBell
            break;
            default:
            break;
          }
          if(track) {
            this.player.src = track;
            this.player.play();
            this.setState({player: "playing", duration: this.player.duration});
          }
        }
      }
  
    render() {
      const duration = getTime(this.state.duration)
      const list = [{ id: 1, title: "Small Bowl" }, {id: 2, title: "Harmony Bell"}].map(item => {
        return (
          <div>
          <li
            key={item.id}
            onClick={() => this.setState({ selectedTrack: item.title })}
          >
          {item.title}
          </li>
        </div>
        );
      });
  
      return (
        <>
          <h1>Choose your bell sound</h1>
          <ul>{list}</ul>
          <audio ref={ref => this.player = ref} />
          <div>
            {duration}
           </div>
        </>
      );
    }
  }