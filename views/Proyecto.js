import React, { useState } from 'react';
import { Container, Button, Text, H2, Content, List, Form, Item, Input, Toast  } from 'native-base';
import globalStyles from '../styles/global';
import { gql, useMutation, useQuery } from '@apollo/client';

// crear nuevas tareas
const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

// consulta las tareas del proyecto
const OBTENER_TAREAS = gql`
  query obtenerTareas($input: ProyectoIDInput) {
    obtenerTareas(input: $input) {
      id
      nombre
      estado
    }
  }
`;

const Proyecto = ({ route }) => {
  // obtiene el id del proyecto
  const { id } = route.params;

  const [nombre, guardarNombre] = useState('');
  const [mensaje, guardarMensaje] = useState(null);
  
  // apollo obtener tareas
  const { data, loading, error } = useQuery(OBTENER_TAREAS, {
    variables: {
      input: {
        proyecto: id
      }
    }
  })

  // apollo crear tareas
  const [ nuevaTarea ] = useMutation(NUEVA_TAREA);

  const handleSubmit = async () => {
    if (nombre === '') {
      guardarMensaje('El nombre de la tarea es obligatorio');
      return;
    }

    // almacenar en base de datos
    try {
      const { data } = await nuevaTarea({
        variables: {
          input: {
            nombre,
            proyecto: id
          }
        }
      });
      guardarNombre('');
      guardarMensaje('Tarea creada correctamente');

      setTimeout(() => {
        guardarMensaje(null);
      }, 3000);
    } catch (error) {
      console.log(error)
    }
  }

  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000
    });
  }

  // si apollo esta consultando
  if (loading) return <Text>Cargando ...</Text>

  
  return (
   <Container style={[globalStyles.contenedor], { backgroundColor: '#e84347'}}>
     <Form style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
       <Item inlineLabel last style={globalStyles.input}>
         <Input
          placeholder="Nombre Tarea"
          value={nombre}
          onChangeText={ texto => guardarNombre(texto)}
         />
       </Item>

       <Button
        style={globalStyles.boton}
        square
        block
        onPress={() => handleSubmit()}
       >
         <Text>Crear Tarea</Text>
       </Button>
       {mensaje && mostrarAlerta()}
     </Form>
   </Container>
  );
}

export default Proyecto;