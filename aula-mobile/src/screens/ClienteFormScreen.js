import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { estilos, cores } from '../theme';
import { buscarCliente, criarCliente, actualizarCliente } from '../api';

// A mesma tela serve para criar (sem id) e para editar (com id).
export default function ClienteFormScreen({ route, navigation }) {
  const id = route.params?.id;
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [campos, setCampos] = useState({}); // erros por campo, vindos da API (400)
  const [aGravar, setAGravar] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: id ? 'Editar cliente' : 'Novo cliente' });
    if (id) {
      buscarCliente(id).then((c) => { // GET /api/clientes/{id}
        setNome(c.nome);
        setEmail(c.email ?? '');
        setTelefone(c.telefone ?? '');
      });
    }
  }, [id]);

  async function gravar() {
    setCampos({});
    setAGravar(true);
    const cliente = { nome, email: email.trim() || null, telefone };
    try {
      if (id) await actualizarCliente(id, cliente); // PUT
      else await criarCliente(cliente);             // POST
      Alert.alert('Sucesso', id ? 'Cliente actualizado.' : 'Cliente criado.');
      navigation.goBack();
    } catch (e) {
      setCampos(e.campos ?? {});
      if (!e.campos || Object.keys(e.campos).length === 0) Alert.alert('Erro', e.message);
    } finally {
      setAGravar(false);
    }
  }

  return (
    <ScrollView style={estilos.tela} contentContainerStyle={{ padding: 20 }}>
      <Campo rotulo="Nome *" valor={nome} mudar={setNome} erro={campos.nome} />
      <Campo rotulo="Email" valor={email} mudar={setEmail} erro={campos.email}
        teclado="email-address" />
      <Campo rotulo="Telefone" valor={telefone} mudar={setTelefone} erro={campos.telefone}
        teclado="phone-pad" />

      <TouchableOpacity style={estilos.botao} onPress={gravar} disabled={aGravar}>
        {aGravar
          ? <ActivityIndicator color={cores.branco} />
          : <Text style={estilos.botaoTexto}>Gravar</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

function Campo({ rotulo, valor, mudar, erro, teclado = 'default' }) {
  return (
    <>
      <Text style={{ color: cores.cinza, marginBottom: 6 }}>{rotulo}</Text>
      <TextInput
        style={[estilos.input, erro && estilos.inputErro]}
        value={valor}
        onChangeText={mudar}
        keyboardType={teclado}
        autoCapitalize={teclado === 'default' ? 'words' : 'none'}
      />
      {erro ? <Text style={estilos.erroCampo}>{erro}</Text> : <Text style={{ marginBottom: 8 }} />}
    </>
  );
}
