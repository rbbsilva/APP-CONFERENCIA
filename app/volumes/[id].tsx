import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVolumes } from '../../context/VolumesContext';

export default function VolumesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { pedidos, setPedidos } = useVolumes();

  const pedido = pedidos.find(p => p.id === id);
  if (!pedido) return <Text>Pedido não encontrado</Text>;

  const mostrarItens = (volumeId: string) => {
    const volume = pedido.volumes.find(v => v.id === volumeId);
    if (volume) Alert.alert(`Itens do Volume ${volumeId}`, volume.itens.join(', '));
  };

  const finalizarPedido = () => {
    const pendentes = pedido.volumes.filter(v => !v.conferido);
    if (pendentes.length > 0) {
      Alert.alert('Volumes Pendentes', `Faltam conferir os volumes: ${pendentes.map(v => v.id).join(', ')}`);
    } else {
      const novos = pedidos.map(p =>
        p.id === pedido.id ? { ...p, finalizado: true } : p
      );
      setPedidos(novos);
      Alert.alert('Pedido Finalizado', 'Todos os volumes foram conferidos.');
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volumes do Pedido #{pedido.id}</Text>
      <FlatList
        data={pedido.volumes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.volume, item.conferido && styles.volumeConferido]}
            onPress={() => mostrarItens(item.id)}
          >
            <Text style={styles.volumeText}>Volume {item.id}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={() => router.push(`/conferir/${pedido.id}`)}>
          <Text style={styles.buttonText}>Conferir Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={finalizarPedido}>
          <Text style={styles.buttonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  volume: {
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  volumeConferido: {
    backgroundColor: '#4caf50',
  },
  volumeText: { fontSize: 18, color: '#fff' },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
