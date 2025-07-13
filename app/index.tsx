import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVolumes } from '../context/VolumesContext';

export default function HomeScreen() {
  const router = useRouter();
  const { pedidos } = useVolumes();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pedidos</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.pedido,
              item.finalizado && styles.pedidoFinalizado,
            ]}
            onPress={() => router.push(`/volumes/${item.id}`)}
          >
            <Text style={styles.pedidoText}>
              Pedido #{item.id} {item.finalizado ? '✅' : ''}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pedido: {
    padding: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
  },
  pedidoFinalizado: {
    backgroundColor: '#4caf50',
  },
  pedidoText: {
    fontSize: 18,
    color: '#fff',
  },
});
