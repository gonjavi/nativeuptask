import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import { gql, useMutation } from '@apollo/client';

  const NUEVA_CUENTA = gql`
    mutation crearUsuario($input: UsuarioInput) {
      crearUsuario(input:$input)
    }
  `;

const CrearCuenta = () => {
  const [nombre, guardarNombre] = useState('');
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');
  const [mensaje, guardarMensaje] = useState(null);

  const navigation = useNavigation();

  // mutation de apollo
  const [ crearUsuario ] = useMutation(NUEVA_CUENTA);

  // clear cuenta
  const handleSubmit = async () => {
    // validar
    if (nombre === '' || email === '' || password === '') {
      // Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');
      return;
    }

    // password 6 caracteres
    if (password.length < 6) {
      guardarMensaje('La contraseña debe tener minimo 6 caracteres');
      return;
    }

    // guardar usuario
    try {
      const { data } = await crearUsuario({
        variables: {
          input: {
            nombre,
            email,
            password
          }
        }
      });
      guardarMensaje(data.crearUsuario);
      navigation.navigate('Login');
    } catch (error) {
      guardarMensaje(error.message.replace('GraphQL error', ''));
    }

  }

  // muestra un mensaje toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000
    })
  }

  return (
    <Container style={[globalStyles.contenedor, { backgroundColor: '#E84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>UpTask</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre"
              onChangeText={ texto => guardarNombre(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Email"
              onChangeText={ texto => guardarEmail(texto)}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={ texto => guardarPassword(texto)}
            />
          </Item>

          <Button
            square
            block
            style={globalStyles.boton}
            onPress={() => handleSubmit() }
          >
            <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
          </Button>
          {mensaje && mostrarAlerta()}
        </Form>
      </View>
    </Container>
  );
}

export default CrearCuenta;