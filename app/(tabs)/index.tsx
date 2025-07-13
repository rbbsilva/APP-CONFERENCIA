import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const pedidos = [
  { id: '101', numero: 'Pedido 101' },
  { id: '102', numero: 'Pedido 102' },
  { id: '103', numero: 'Pedido 103' },
];

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um Pedido</Text>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.pedido}
            onPress={() => router.push(`/volumes/${item.id}`)}
          >
            <Text style={styles.pedidoText}>{item.numero}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  pedido: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  pedidoText: { fontSize: 18 },
});
