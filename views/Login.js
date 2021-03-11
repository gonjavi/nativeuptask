import React, { useState } from 'react';
import { View } from 'react-native';
import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-community/async-storage';

import { gql, useMutation } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;
 
const Login = () => {
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');
  const [mensaje, guardarMensaje] = useState(null);

  const navigation = useNavigation();

  const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

  const handleSubmit = async () => {
    // validar
    if (email === '' || password === '') {
      // Mostrar un error
      guardarMensaje(' campos son obligatorios');
      return;
    }

    // login
    try {
      const { data } = await autenticarUsuario({
        variables: {
          input: {
            email,
            password
          }
        }
      })
      
      const { autenticarUsuario: { token } } = data;
       console.log(token)

      // colocar token en async storage
      await AsyncStorage.setItem('token', token);

      // Redireccionar a proyectos

      navigation.navigate("Proyectos");
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
              autoCompleteType="email"
              placeholder="Email"
              onChangeText={texto => guardarEmail(texto.toLowerCase())}
              value={email}
            />
          </Item>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              ChangeText={texto => guardarPassword(texto)}
            />
          </Item>

          <Button
            square
            block
            style={globalStyles.boton}
            onPress={() => handleSubmit()}
          >
            <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
          </Button>

          <Text  
            onPress={() => navigation.navigate("CrearCuenta")}
            style={globalStyles.enlace}
          >
            Crear Cuenta
          </Text>
          {mensaje && mostrarAlerta()}
        </Form>
      </View>
    </Container>
  );
}

export default Login;