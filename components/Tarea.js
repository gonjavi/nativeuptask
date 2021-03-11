import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base';

const Tarea = ({ tarea }) => {
  return (
    <>
      <ListItem>
        <Left>
          <Text>{Tarea.nombre}</Text>
        </Left>
        <Right>
          { tarea.estado ? (
            <Icon
              style={[styles.icono, styles.completo]}
              name="ios-checkmark-circle"
            />
          ) : (
            <Icon
              style={[styles.icono, styles.incompleto]}
              name="ios-checkmark-circle"
            />
          )}
        </Right>
      </ListItem>
    </>
  );
}

const styles = StyleSheet.create({
  icono: {
    fontSize: 32
  },
  completo: {
    color: 'green'
  },
  incompleto: {
    color: '#e1e1e1'
  }
})

export default Tarea;