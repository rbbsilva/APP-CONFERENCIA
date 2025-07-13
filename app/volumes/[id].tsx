import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const volumesMock = [
  { id: '1', itens: ['Pizza', 'Coca-Cola'], conferido: false },
  { id: '2', itens: ['Hambúrguer', 'Suco'], conferido: false },
  { id: '3', itens: ['Salgados', 'Água'], conferido: false },
];

export default function VolumesScreen() {
  const { id } = useLocalSearchParams(); // ID do pedido
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [volumeSelecionado, setVolumeSelecionado] = useState<number | null>(null);
  const [volumes, setVolumes] = useState(volumesMock);

  const abrirPopup = (index: number) => {
    setVolumeSelecionado(index);
    setModalVisible(true);
  };

  const fecharPopup = () => {
    setModalVisible(false);
    setVolumeSelecionado(null);
  };

  const finalizarPedido = () => {
    const pendentes = volumes.filter((v) => !v.conferido).map((v) => v.id);
    if (pendentes.length > 0) {
      Alert.alert('Faltando Conferência', `Volumes pendentes: ${pendentes.join(', ')}`);
    } else {
      Alert.alert('Sucesso', 'Todos os volumes foram conferidos!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volumes do Pedido #{id}</Text>

      <FlatList
        data={volumes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.volumeButton, item.conferido && styles.volumeFinalizado]}
            onPress={() => abrirPopup(index)}
          >
            <Text style={styles.volumeText}>Volume {item.id}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => router.push(`/conferir/${id}`)}
      >
        <Text style={styles.buttonText}>Conferir Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={finalizarPedido}>
        <Text style={styles.buttonText}>Finalizar Pedido</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Itens do Volume</Text>
            {volumeSelecionado !== null &&
              volumes[volumeSelecionado].itens.map((item, i) => (
                <Text key={i} style={styles.modalItem}>
                  • {item}
                </Text>
              ))}
            <TouchableOpacity onPress={fecharPopup} style={styles.fecharBtn}>
              <Text style={styles.fecharText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  volumeButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  volumeFinalizado: {
    backgroundColor: '#4caf50',
  },
  volumeText: { fontSize: 18, color: '#fff', textAlign: 'center' },
  buttonPrimary: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalItem: { fontSize: 16, marginBottom: 5 },
  fecharBtn: {
    marginTop: 20,
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  fecharText: { color: '#fff', fontSize: 16 },
});
