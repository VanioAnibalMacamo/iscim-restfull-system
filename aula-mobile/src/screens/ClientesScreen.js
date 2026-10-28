import { useCallback, useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { cores, estilos } from '../theme';
import { listarClientes } from '../api';

export default function ClientesScreen({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState('');
  const [busca, setBusca] = useState('');

  async function carregar() {
    setErro('');
    try {
      setClientes(await listarClientes()); // GET /api/clientes
    } catch (e) {
      setErro(e.message);
    } finally {
      setACarregar(false);
    }
  }

  // Volta a carregar sempre que a tela aparece (ex.: depois de criar ou editar).
  useFocusEffect(useCallback(() => { carregar(); }, []));

  const filtrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.trim().toLowerCase()));

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={s.topo}>
        <Text style={estilos.titulo}>Clientes</Text>
        <Text style={estilos.subtitulo}>{clientes.length} registados na API</Text>
        <TextInput
          style={[estilos.input, { marginTop: 16 }]}
          placeholder="Procurar pelo nome..."
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {aCarregar ? (
        <ActivityIndicator size="large" color={cores.primaria} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={(c) => String(c.id)}
          contentContainerStyle={{ padding: 20, paddingTop: 4, paddingBottom: 100 }}
          refreshControl={<RefreshControl refreshing={false} onRefresh={carregar} />}
          ListHeaderComponent={erro ? <Text style={estilos.avisoErro}>{erro}</Text> : null}
          ListEmptyComponent={!erro && <Text style={s.vazio}>Nenhum cliente encontrado.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[estilos.cartao, s.linha]}
              onPress={() => navigation.navigate('Detalhe', { id: item.id })}
            >
              <View style={s.avatar}>
                <Text style={s.avatarTexto}>{iniciais(item.nome)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.nome}>{item.nome}</Text>
                <Text style={s.info}>{item.email || 'sem email'} · {item.telefone || 'sem telefone'}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={s.novo} onPress={() => navigation.navigate('Formulario')}>
        <Text style={estilos.botaoTexto}>+ Novo cliente</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// A função da Aula 0!
function iniciais(nome) {
  return nome.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const s = StyleSheet.create({
  topo: { padding: 20, paddingBottom: 8 },
  linha: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: cores.clara,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarTexto: { color: cores.primaria, fontWeight: 'bold' },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  info: { fontSize: 13, color: cores.cinza, marginTop: 2 },
  vazio: { textAlign: 'center', color: cores.cinza, marginTop: 30 },
  novo: {
    position: 'absolute', right: 20, bottom: 30, backgroundColor: cores.primaria,
    borderRadius: 30, paddingVertical: 14, paddingHorizontal: 22, elevation: 4,
  },
});
