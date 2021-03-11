import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base';
import { gql, useMutation } from '@apollo/client';

const ACTUALIZAR_TAREA = gql`
  mutation actualizarTarea($id: ID!, $input: TareaInput, $estado: boolean) {
    actualizarTarea(id: $id, input: $input, estado: $estado) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

const Tarea = ({ tarea }) => {

  // Apollo
  const [ actualizarTarea ] = useMutation(ACTUALIZAR_TAREA);

  const { id } = tarea;

  // cambiar estado de uns tarea a completa o incompleta
  const camabiarEstado = async () => {
     
    try {
      const { data } = await actualizarTarea({
        variables:
          id,
          input: {
            nombre: tarea.nombre
          },
          estado: !tarea.estado
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ListItem
        onPress={ () => camabiarEstado() }
      >
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