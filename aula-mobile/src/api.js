// Todas as conversas com a API ficam aqui. As telas só chamam estas funções.

// IP do computador onde corre o Docker (no cmd: ipconfig → "Endereço IPv4").
// No telemóvel NÃO use localhost: localhost seria o próprio telemóvel.
export const API_URL = 'http://10.100.10.46:8080/api';

// Faz o pedido, converte a resposta de JSON e trata os erros num só sítio.
async function pedido(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(API_URL + caminho, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    });
  } catch {
    throw new Error('Sem ligação à API. O Docker está a correr? O IP está certo?');
  }

  if (resposta.status === 204) return null; // apagado com sucesso, sem corpo

  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const erro = new Error(dados?.erro ?? 'Verifique os campos assinalados.');
    erro.campos = dados?.erro ? {} : dados ?? {}; // 400: { nome: "O nome é obrigatório" }
    throw erro;
  }
  return dados;
}

// ─── Clientes ───────────────────────────────────────────────
export const listarClientes = () => pedido('/clientes');
export const buscarCliente = (id) => pedido(`/clientes/${id}`);
export const criarCliente = (cliente) =>
  pedido('/clientes', { method: 'POST', body: JSON.stringify(cliente) });
export const actualizarCliente = (id, cliente) =>
  pedido(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(cliente) });
export const eliminarCliente = (id) => pedido(`/clientes/${id}`, { method: 'DELETE' });

// ─── Pedidos ────────────────────────────────────────────────
export const pedidosDoCliente = (clienteId) => pedido(`/pedidos/cliente/${clienteId}`);
export const criarPedido = (descricao, valor, clienteId) =>
  pedido('/pedidos', { method: 'POST', body: JSON.stringify({ descricao, valor, clienteId }) });
export const eliminarPedido = (id) => pedido(`/pedidos/${id}`, { method: 'DELETE' });
