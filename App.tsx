import React, {useEffect, useState, HTMLProps} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import database from '@react-native-firebase/database';
import {flag} from './Image/idnex';
import HTML from 'react-native-render-html';
// import { HTMLProps } from 'react';
const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [option, setOption] = useState(Array);
  const [data, setData] = useState(Object);
  const [question, setQuestion] = useState(Array);
  const [right, setRight] = useState('');
  const [currentId, setCurrentId] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [length, setLength] = useState('');
  const [index, setIndex] = useState('');
  const [dataArray, setDataArray] = useState(Object);
  //  const [questionIndex, setQuestionIndex] = useState(Number)

  useEffect(() => {
    setOption(Array);
    setData(Object);
    setQuestion(Array);
    setRight('');
    setCurrentId(currentId);
    setAnswer('');
    setSelectedAnswer('');

    database()
      .ref(`question/`)
      .on('value', snapshot => {
        var responselist = Object.values(snapshot.val()); // Get value from te data-base
        setLength(responselist.length);
        setData(responselist[currentId]);

        setDataArray(responselist);
        var data = Object.values(snapshot.val());
        var dataArray = Object.values(data);
        delete dataArray[currentId].english; //Delete english value form the object
        delete dataArray[currentId].german; //Delete german value form the object
        delete dataArray[currentId].id; //Delete id value form the object

        var jsonData = dataArray[currentId];
        var question = responselist[currentId].german; // get german question
        setAnswer(jsonData.opt);
        // Set question in german language
        // setQuestion(
        //   question
        //     .replace(`${jsonData.opt}`, '________')
        //     .replace('.', ``)
        //     .split(' '),
        // );

        setQuestion(question.replace(`${jsonData.opt}`, '________'));
        const values = Object.values(jsonData);
        for (var i = values.length - 1; i > 0; i--) {
          // Generate random position of option
          var j = Math.floor(Math.random() * (i + 1));
          var temp = values[i];
          values[i] = values[j];
          values[j] = temp;
        }
        setOption(values);
      });
  }, [currentId]);

  // const __OnClick = async item => {
  //   if (right == '') setSelectedAnswer(item);
  //   var questions = question; // get german question

  //   var data = questions.replace('.', ``);
  //   let arr = data.split(' ');

  //   if (index == '') {
  //     await setIndex(questions.indexOf('________'));
  //   }

  //   // console.log(questions[index], '<>');
  //   questions[index] = `${item}`;
  //   // console.log(questions[index]);
  //   // console.log(item);

  //   var questionName = '';
  //   var allPlayers = arr.map(item => {
  //     questionName = questionName + ' ' + item;
  //     // console.log(item), 'ASDAS';
  //   });
  //   // setQuestion(question.replace('________', `${item}`).split(' '));
  //   setQuestion(questions.trim());

  //   console.log(questions, '<><>?<>');
  //   questioner(item);
  // };

  const __OnClick = item => {
    if (right == '') setSelectedAnswer(item);
    var arrayData = dataArray;
    // var jsonData = arrayData[currentId];
    var questions = question; // get german question

    var data = questions.replace('.', ``);
    let arr = data.split(' ');

    if (index == '') {
      // console.log('ASASAS');
      setIndex(arr.indexOf('________'));
    }

    arr[index] = `${item}`;
    // console.log(arr, 'After');
    var questionName = '';
    var allPlayers = arr.map(item1 => {
      questionName = questionName + ' ' + item1;
      // console.log(item1);
    });
    questioner(item);

    // setQuestion(questionName.trim());
    // setQuestion(questionName.trim());
  };

  function questioner(item) {
    console.log(item, ':::::::::::');
    console.log(question);
    // return `<div data-val-id="${question.questionNumber}"> ${question.questionText} </div>`;
  }

  function CONTENT(item: any) {
    `
  <h1>${question}</h1>
  `;
  }

  const __OnContinue = button => {
    if (button != 'Continue') {
      if (answer == selectedAnswer) {
        console.log('True');
        setRight('true');
      } else {
        console.log('False');
        setRight('false');
      }
      setSelectedAnswer('');
    } else {
      if (currentId < length - 1) {
        setCurrentId(currentId + 1);
      } else {
        setCurrentId(0);
      }
    }
  };
  return (
    //  <SafeAreaView style={backgroundStyle}>
    //    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <View
      style={{
        justifyContent: 'flex-end',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#76dafe',
      }}>
      <View
        style={{
          height: '85%',
          width: '100%',
          alignItems: 'center',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          backgroundColor: '#3d6d82',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              marginTop: '10%',
              marginBottom: 30,
              color: '#ffffff',
              fontSize: 18,
            }}>
            Fill in the missing word
          </Text>
          <Text
            style={{
              marginBottom: 30,
              color: '#ffffff',
              fontSize: 20,
              textDecorationLine: 'underline',
            }}>
            {data.english}
          </Text>
          <Text
            style={{
              marginBottom: 30,
              color: '#ffffff',
              fontSize: 20,
              borderBottomWidth: 1,
              borderStyle: 'dotted',
              borderColor: '#ffffff',
            }}>
            {/* {question} */}
            <HTML source={{html: CONTENT}} />
          </Text>
          {/* <View style={{flexDirection: 'row'}}>
            {question?.map((item: any, index: number) => {
              // console.log(item, 'ASSAADSADSADSADSADSADS');
              return item !== '________' ? (
                <Text style={{fontSize: 15, color: '#fff'}}>{item} </Text>
              ) : item == '________' ? (
                <Text style={{fontSize: 15, color: '#ff4500'}}>{item} </Text>
              ) : (
                <Text style={{fontSize: 15, color: '#ff4500'}}>{item} </Text>
              );
            })}
          </View> */}

          {/* {question.map((item, index) => {
            if (item != '________') {
              <Text>Hello</Text>;
            } else {
              <Text>world</Text>;
            }
            return (item);
          })} */}

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 50,
              flexWrap: 'wrap',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            {option.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => __OnClick(item)}
                  style={{
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    minWidth: '20%',
                    margin: 10,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 200,
              backgroundColor: right == 'true' ? '#50E3E8' : '#ff4500',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              zIndex: -50,
              position: 'absolute',
              right: 0,
              left: 0,
              opacity: right != '' ? 1 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: '#000',
                marginTop: 25,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  marginLeft: 40,
                  marginBottom: 20,
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}>
                {right == 'true' ? 'Great Job!' : `Answer: ${answer}`}
              </Text>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  marginRight: '5%',
                  tintColor: '#fff',
                  marginTop: 5,
                }}
                source={flag}
              />
            </View>
          </View>
          <TouchableOpacity
            // onPress={() => console.log('hello')}
            // disabled={
            //   selectedAnswer !== '' ? false : right !== 'true' ? false : true
            // }
            onPress={() =>
              __OnContinue(selectedAnswer != '' ? 'Check answer' : 'Continue')
            }
            style={{
              height: '25%',
              borderRadius: 50,
              width: '90%',

              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#6492A6',
              marginBottom: '10%',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 30,

                // color: this.state.right ? '#50E3E8' : '#F57A87',
                color: 'white',
              }}>
              {selectedAnswer != '' ? 'Check answer' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    //  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
