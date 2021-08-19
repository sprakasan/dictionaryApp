import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {Audio} from 'expo-av'
export default class PhonicSoundButton extends React.Component{
constructor(props){
  super (props)
  this.state={
    pressButtonIndex:""
  }
}
  playSound=async (soundChunk)=>{
    var soundLink='https://s3-whitehatjrcontent.whjr.online/phones/'+soundChunk+'.mp3'
await Audio.Sound.createAsync(
  {uri:soundLink},
  {shouldPlay:true}
)
}
  render(){
    return(
      <TouchableOpacity style={
        this.props.buttonIndex===this.state.pressButtonIndex?
        [styles.displayButton,{backgroundColor:"purple"}]:
        [styles.displayButton,{backgroundColor:"red"}]
      }
      onPress={()=>{
        this.setState({pressButtonIndex:this.props.buttonIndex})
        this.playSound(this.props.soundChunk)
      }}>
      <Text style={styles.displayChunk}> {this.props.wordChunk}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputbox: {
    borderWidth: 5,
    width: 330,
    height: 50,
    marginTop: 50,
    textAlign: 'center',
  },
  button: {
    borderWidth: 2,
    backgroundColor: 'red',
    marginLeft: 145,
    width: 40,
    height: 30,
  },
  imageicon: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },
  displayChunk: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
    color: 'white',
  },
  displayButton: {
    backgroundColor: 'red',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
  },
});
