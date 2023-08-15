import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';

type Todo = {
    text: string;
    key: string;
};

function App(): JSX.Element {
    const [todos, setTodos] = useState<Todo[]>([
        { text: 'buy coffee', key: '1' },
        { text: 'create an app', key: '2' },
        { text: 'play on the switch', key: '3' },
    ]);

    const pressHandler = (key: string): void => {
        setTodos((prevTodos: Todo[]) => {
            return prevTodos.filter((todo: Todo) => todo.key !== key);
        });
    };

    const submitHandler = (text: string): void => {
        if (text.length > 3) {
            setTodos((prevTodos: Todo[]) => {
                return [{ text, key: Math.random().toString() }, ...prevTodos];
            });
        } else {
            Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
                {
                    text: 'Understood',
                    onPress: () => console.log('alert closed'),
                },
            ]);
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                    <AddTodo submitHandler={submitHandler} />
                    <View style={styles.list}>
                        <FlatList
                            data={todos}
                            renderItem={({ item }) => (
                                <TodoItem
                                    item={item}
                                    pressHandler={pressHandler}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 40,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});

export default App;
