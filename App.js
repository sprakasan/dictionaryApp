import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchedPressed :'false',
      word: "Loading ...",
      lexicalCatergory: '',
      defination:''
    };
  }
  getWord=(word)=>{
    var search = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"
    return fetch (url)
    .then ((data)=>{
      if (data.status===200)
      {
        return data.json()
      }
      else 
      {return null}    
    })
    .then ((response)=>{
      var responseObject = response
      if (responseObject){
        var wordData = responseObject.definitions[0]
        var definition=wordData.description
        var lexicalCatergory=wordData.wordType
        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCatergory":lexicalCatergory
        })
      }
      else{
        this.setState({
          "word":this.state.text,
          "definition":"Not Found"
        })
      }
    }
    )
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'black'}
            centerComponent={{
              text: 'DICTIONARY APP',
              style: { color: 'red', fontSize: 20 },
            }}
          />

          <Image
            style={styles.imageicon}
            source={require("./assets/reading.jpg")}
          />

          <TextInput
            style={styles.inputbox}
            placeholder={'Type here :)'}
            onChangeText={(text) => {
              this.setState({ text: text,
              isSearchedPressed:false,
              word:"Loading...",
              lexicalCatergory:'',
              examples:[],
              defination:"" });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={()=> {
              this.setState({isSearchedPressed:true});
this.getWord(this.state.text)
            }}>
            <Text>Go</Text>
          </TouchableOpacity>
          <View>
          <Text> {this.state.isSearchedPressed&&this.state.word==="Loading..."?this.state.word:""}
          </Text>{ this.state.word!=="Loading..."?
          (<Text> word:{""}
          </Text>
          <Text> {this.state.word}
          </Text>
          <Text> definition:{""}
          </Text>
          <Text> {this.state.definition}
          </Text>
          </View>
          </View>
      </SafeAreaProvider>
    );
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
    width: 200,
    height: 200,
    marginLeft: 50,
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
