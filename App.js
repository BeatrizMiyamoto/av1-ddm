import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState('');
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState(null);

  function buscarpokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`)
      .then(response => response.json())
      .then(res => {
        setPokemon(res.forms[0].name);
        setImagem(res.sprites.front_default); 
      })
      .catch(error => {
        console.error('Erro:', error);
        setPokemon('Pokémon não encontrado');
        setImagem(null);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite nome ou número"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.texto}>{pokemon}</Text>

      {imagem && (
        <Image
          source={{ uri: imagem }}
          style={styles.imagem}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={buscarpokemon}>
        <Text>Buscar Pokémon</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 8,
    marginBottom: 10,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#ddd',
    padding: 10,
  },
});
