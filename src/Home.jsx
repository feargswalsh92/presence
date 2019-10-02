import React, {Component} from 'react';
import smallBowl from './small-bowl.wav';
import harmonyBell from './harmonyBell.wav';
import meditationGuru from './assets/meditationGuru.png'


function getTime(time) {
  if(!isNaN(time)) {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }
}

export default class Home extends Component {

    state = {
      selectedTrack: null,
      player: "paused",
      selectedTime: 2,
      delay: 5000,
      activeListId: null,
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

    componentWillUnmount () {
      clearInterval(this.state.intervalId);
    }


    componentDidUpdate(prevProps, prevState) {
        const { selectedTrack, delay } = this.state;
        if(selectedTrack !== prevState.selectedTrack ) {
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
            console.log('componentDiUpdate');
           this.player.play()
           this.setState({player: "playing"});
          }
        }
    }
      
    renderTimes() {
      const {times} = this.props;
      return times.map(time => {
       return (
       <li style = {styles.listOfTimesItem} key={time.id}>
          <div>{time.label} </div>
      </li>
       );
      });
    }

    handlePlayButtonPress = (interval) => {
      const { player, delay } = this.state;
      switch(player) {
        case "playing":
          this.setState({player: "paused"}, () => console.log('this.state', this.state))
          this.player.pause()
          clearInterval(this.state.intervalId);
        break;
        case "paused":
          this.player.play();
          let intervalId = setInterval( () =>  this.player.play(), delay);
          this.setState({player: "playing", intervalId: intervalId},  () => console.log('this.state', this.state));
        break;
        default:
        break;
      }
    }

    setOpenIndex = item => this.setState({selectedTrack: item.title, activeListId: item.id})

  
    render() {
      const { activeListId } = this.state;
      const borderStyle = {border: '1px solid #021a40'}
      const list = [{ id: 1, title: "Small Bowl", selected: false }, {id: 2, title: "Harmony Bell", selected: false}].map(item => {
        return (
          <div
          onClick={() => this.setOpenIndex(item)}>
          <li
          key={item.id}>
          <div>
          <img alt="bell" src={meditationGuru} style={ item.id === activeListId ? borderStyle : {} }/>
          <div>{item.title} </div>
          </div>
          </li>
        </div>
        );
      });

      const times = [{id: 8, label: "2 mins", value: 2000}, {id: 9, label: "5 mins", value: 5000, default: true}, {id: 10, label: "10 mins", value: 10000} ].map(time => {
        return ( 
        <li 
        style = {styles.listOfTimesItem}
        key={time.id}
        onClick={() => this.setState({ delay: time.value })}>
       <div>{time.label} </div>
       </li>
        );
       });
      return (
        <>
          <h1>Choose your bell sound</h1>
          <ul style={styles.listOfBells}>{list}</ul>
          <button onClick={this.handlePlayButtonPress} >{this.state.player} </button>
          <ul>{times}</ul>
          <audio ref={ref => this.player = ref} />
        </>
      );
    }
  }

  const styles = {
    listOfBells: {
      display: 'flex',
      justifyContent: 'space-evenly',
      // listStyleImage: `url(${meditationGuru})`,
      listStyleType: 'none',
      width: '100%',
      border: '1px',
      borderColor: 'red',
      borderRadius: '100%',
      height: '1em',
      padding: '0.25em',
      lineHeight: '1.0',
      marginRight: '0.5em',
    },
    listOfBellsItem: {
        display: 'block',
        // listStyleImage: `url(${meditationGuru})`,
    },
    selectedListOfBellsItem: {
      display: 'block',
      // listStyleImage: `url(${meditationGuru})`,
      border: '1px',
      borderColor: 'red',
      borderRadius: '100%',
      width: '1em',
      height: '1em',
      padding: '0.25em',
      lineHeight: '1.0',
      marginRight: '0.5em',
  },
  unselectedListOfBellsItem: {
    border: 'none',
  },
    listOfTimesItem: {
      display: 'block',
    },
  }

