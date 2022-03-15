import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

var timer = null;
var ss = 0;
var mm = 0;
var hh = 0;

export default function App() {

  const [numero, setNumero] = useState(0);
  const [button, setButton] = useState('COMEÇAR');
  const [save, setSave]     = useState(0);

  function handleStart(){
    if(timer != null){

      clearInterval(timer);
      timer = null;
      setButton('CONTINUAR');

    }else{

      timer = setInterval(()=>{
        ss++;

        if(ss == 60){
          ss = 0;
          mm++
        }

        if(mm == 60){
          mm = 0;
          hh++
        }

        let timeFormat = 
          (hh < 10 ? '0' + hh : hh)   + ' : ' 
          + (mm < 10 ? '0' + mm : mm) + ' : ' 
          + (ss < 10 ? '0' + ss : ss);

        setNumero(timeFormat);

        setButton('PAUSAR');

      }, 1000);
    }
  }

  function handleStop(){
    setSave(numero);
    if(timer != null){
      clearInterval(timer);
      timer = null;
    }

    ss = 0;
    mm = 0;
    hh = 0;

    setNumero(0);
    setButton('COMEÇAR');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.tempo} >{numero == 0 ? '00 : 00 : 00' : numero}</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleStart} >
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStop} >
          <Text style={styles.buttonText}>ZERAR</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.ultimoTempo} >{ save != 0 ? `Seu ultimo tempo foi ${save}` : '' }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c7aed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempo:{
    color: '#FFF',
    fontSize: 80,
    fontWeight: 'bold'
  },
  content:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    backgroundColor: '#FFF',
    width: '40%',
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  buttonText:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2c7aed'
  },
  ultimoTempo:{
    color: '#FFF',
    marginTop: 20,
    fontSize: 16
  }
});
