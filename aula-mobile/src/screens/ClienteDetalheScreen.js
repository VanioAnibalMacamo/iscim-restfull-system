import { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { cores, estilos } from '../theme';
import {
  buscarCliente, eliminarCliente, pedidosDoCliente, criarPedido, eliminarPedido,
} from '../api';

export default function ClienteDetalheScreen({ route, navigation }) {
  const { id } = route.params;
  const [cliente, setCliente] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      // Os dois pedidos ao mesmo tempo: GET /clientes/{id} e GET /pedidos/cliente/{id}
      const [c, p] = await Promise.all([buscarCliente(id), pedidosDoCliente(id)]);
      setCliente(c);
      setPedidos(p);
    } catch (e) {
      setErro(e.message);
    }
  }

  useFocusEffect(useCallback(() => { carregar(); }, [id]));

  async function adicionarPedido() {
    setErro('');
    try {
      await criarPedido(descricao, Number(valor.replace(',', '.')), id); // POST /pedidos
      setDescricao('');
      setValor('');
      carregar();
    } catch (e) {
      const mensagens = Object.values(e.campos ?? {});
      setErro(mensagens.length ? mensagens.join('\n') : e.message);
    }
  }

  function confirmarApagarCliente() {
    Alert.alert('Apagar cliente', `Apagar ${cliente.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar', style: 'destructive',
        onPress: async () => {
          try {
            await eliminarCliente(id); // DELETE /clientes/{id}
            navigation.goBack();
          } catch (e) {
            Alert.alert('Não foi possível', e.message); // 409: tem pedidos associados
          }
        },
      },
    ]);
  }

  function confirmarApagarPedido(p) {
    Alert.alert('Apagar pedido', p.descricao, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar', style: 'destructive', onPress: () => eliminarPedido(p.id).then(carregar) },
    ]);
  }

  if (!cliente) {
    return <Text style={{ padding: 20, color: erro ? cores.erro : cores.cinza }}>{erro || 'A carregar...'}</Text>;
  }

  // Manipular os dados no telemóvel: somar os valores dos pedidos.
  const total = pedidos.reduce((soma, p) => soma + p.valor, 0);

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={{ padding: 20 }}>
      <Text style={estilos.titulo}>{cliente.nome}</Text>
      <Text style={estilos.subtitulo}>{cliente.email || 'sem email'}</Text>
      <Text style={estilos.subtitulo}>{cliente.telefone || 'sem telefone'}</Text>

      <View style={s.botoes}>
        <TouchableOpacity style={[s.botaoLinha, { borderColor: cores.primaria }]}
          onPress={() => navigation.navigate('Formulario', { id })}>
          <Text style={{ color: cores.primaria, fontWeight: 'bold' }}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.botaoLinha, { borderColor: cores.erro }]} onPress={confirmarApagarCliente}>
          <Text style={{ color: cores.erro, fontWeight: 'bold' }}>Apagar</Text>
        </TouchableOpacity>
      </View>

      <View style={s.total}>
        <Text style={s.totalRotulo}>{pedidos.length} PEDIDOS · TOTAL</Text>
        <Text style={s.totalValor}>{formatarMT(total)}</Text>
      </View>

      {pedidos.map((p) => (
        <TouchableOpacity key={p.id} style={[estilos.cartao, s.pedido]} onLongPress={() => confirmarApagarPedido(p)}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', color: cores.texto }}>{p.descricao}</Text>
            <Text style={{ color: cores.cinza, fontSize: 13 }}>{new Date(p.data).toLocaleDateString('pt-PT')}</Text>
          </View>
          <Text style={{ fontWeight: 'bold', color: cores.texto }}>{formatarMT(p.valor)}</Text>
        </TouchableOpacity>
      ))}
      {pedidos.length > 0 && <Text style={s.dica}>Toque longo num pedido para o apagar.</Text>}

      <Text style={[estilos.titulo, { fontSize: 18, marginTop: 20, marginBottom: 10 }]}>Novo pedido</Text>
      {erro ? <Text style={estilos.avisoErro}>{erro}</Text> : null}
      <TextInput style={estilos.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <TextInput style={estilos.input} placeholder="Valor (MT)" value={valor} onChangeText={setValor}
        keyboardType="decimal-pad" />
      <TouchableOpacity style={estilos.botao} onPress={adicionarPedido}>
        <Text style={estilos.botaoTexto}>Adicionar pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function formatarMT(valor) {
  return valor.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' MT';
}

const s = StyleSheet.create({
  botoes: { flexDirection: 'row', gap: 10, marginTop: 16, marginBottom: 20 },
  botaoLinha: { flex: 1, borderWidth: 1.5, borderRadius: 12, padding: 12, alignItems: 'center' },
  total: { backgroundColor: cores.primaria, borderRadius: 16, padding: 20, marginBottom: 14 },
  totalRotulo: { color: cores.clara, fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  totalValor: { color: cores.branco, fontSize: 30, fontWeight: 'bold', marginTop: 4 },
  pedido: { flexDirection: 'row', alignItems: 'center' },
  dica: { color: cores.cinza, fontSize: 12, textAlign: 'center', marginBottom: 6 },
});
