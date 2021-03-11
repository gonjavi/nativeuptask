import React from 'react';
import { StyleSheet, Alert } from 'react-native';
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

const ELIMINAR_TAREA = gql`
  mutation eliminarTarea($id: ID!) {
    eliminarTarea(id: $id)
  }
`;

const Tarea = ({ tarea }) => {

  // Apollo
  const [ actualizarTarea ] = useMutation(ACTUALIZAR_TAREA);
  const [ eliminarTarea ] = useMutation(ELIMINAR_TAREA);
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

  // Dialogo para eliminar o no una tarea
  const mostrarEliminar = () => {
    Alert.alert('Eliminar Tarea', '¿Deaseas eliminar la tarea?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Confirmar',
        onPress: () => eliminarTareaDB()
      }
    ])
  }

  // Eliminar tarea de base de datos
  const eliminarTareaDB = async () => {
    const { id } = tarea;

    try {
      const { data } = await eliminarTarea({
        variables: {
          id
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ListItem
        onPress={ () => camabiarEstado() }
        onLongPress={() => mostrarEliminar()}
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