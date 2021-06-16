import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
  FlatList,
  View,
} from 'react-native';

import TaskItem from './components/TaskItem';


export default function App() {
  const [inputTask, setInputTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteTask = (itemIndex) => {
    console.log('index', itemIndex);
    setTasks((prevTask) =>
      prevTask.filter((item, index) => index !== itemIndex),
    );
  };

  return (
    <View style={styles.centeredView}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>new task</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((premodalVisible) => {
            return [...premodalVisible, modalVisible];
          });
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              placeholder={'タスクを入力してください'}
              onChangeText={(text) => {
                setInputTask(text);
              }}
              value={inputTask}
            />
            <View >
              <Pressable
                style={[styles.button, styles.buttonstyle]}
                onPress={() => {
                  setModalVisible(false);
                  setTasks((prevTask) => [...prevTask, inputTask]);
                  setInputTask('')
                }}>
                <Text style={styles.textStyle}>ok</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonstyle]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        style={styles.list}
        keyExtractor={(_item, index) => index.toString()}
        data={tasks}
        renderItem={({ item, index }) => (
          <TaskItem
            title={item}
            onDeleteTask={handleDeleteTask}
            index={index}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  list: { flex: 1, width: '80%', marginTop: 24 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "blue",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonstyle: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  
});
