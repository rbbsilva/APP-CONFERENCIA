import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVolumes } from '../../context/VolumesContext';

export default function ConferirScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { volumes, setVolumes } = useVolumes();
  const [codigo, setCodigo] = useState('');
  const inputRef = useRef<TextInput>(null);

  const conferirVolume = () => {
    const index = volumes.findIndex(v => v.id === codigo);
    if (index !== -1 && !volumes[index].conferido) {
      const novos = [...volumes];
      novos[index].conferido = true;
      setVolumes(novos);
    } else {
      alert('Código inválido ou já conferido.');
    }
    setCodigo('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conferência do Pedido #{id}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Digite o código de barras (ex: 1, 2, 3)"
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
        onSubmitEditing={conferirVolume}
      />
      <TouchableOpacity onPress={conferirVolume} style={styles.button}>
        <Text style={styles.buttonText}>Conferir</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Volumes Conferidos</Text>
      <FlatList
        data={volumes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.volume, { backgroundColor: item.conferido ? '#4caf50' : '#ccc' }]}>
            <Text style={styles.volumeText}>
              Volume {item.id} {item.conferido ? '✅' : ''}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <TouchableOpacity onPress={() => router.back()} style={styles.voltarBtn}>
        <Text style={styles.voltarText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  volume: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  volumeText: { fontSize: 16, color: '#fff' },
  voltarBtn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#555',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  voltarText: { color: '#fff', fontSize: 16 },
});
