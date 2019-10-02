import React, {Component} from 'react';
import smallBowl from './small-bowl.wav';
import harmonyBell from './harmonyBell.wav';
import meditationGuru from './assets/meditationGuru.png'


export default class ListOfBells extends Component {
    state = {
        player: "paused",
        selectedTrack: null,
    }
   render() {
    const list = [{ id: 1, title: "Small Bowl", selected: false }, {id: 2, title: "Harmony Bell", selected: false}].map(item => {
        return (
          <div>
          <li style = {styles.listOfBellsItem}
            key={item.id}
            onClick={() => this.setState({ selectedTrack: item.title })}>
            <div>
          <img alt="bell" src={meditationGuru}/>
          <div>{item.title} </div>
          </div>
          </li>
        </div>
        );
      });
      return (
        <>
          <h1>Choose your bell sound</h1>
          <ul style={styles.listOfBells}>{list}</ul>
          <audio ref={ref => this.player = ref} />
        </>
      );
    }
}

    const styles = {
        listOfBells: {
          display: 'flex',
          justifyContent: 'space-evenly',
          listStyleImage: `url(${meditationGuru})`,
          width: '100%',
        }
    }
