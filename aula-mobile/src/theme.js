import { StyleSheet } from 'react-native';

export const cores = {
  primaria: '#E44E23',
  clara: '#FFE8E0',
  fundo: '#F7F4F2',
  texto: '#1C1917',
  cinza: '#78716C',
  borda: '#E4DEDA',
  branco: '#FFFFFF',
  erro: '#B91C1C',
};

export const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  titulo: { fontSize: 26, fontWeight: 'bold', color: cores.texto },
  subtitulo: { fontSize: 15, color: cores.cinza, marginTop: 4 },
  input: {
    backgroundColor: cores.branco, borderWidth: 1, borderColor: cores.borda,
    borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 6,
  },
  inputErro: { borderColor: cores.erro },
  erroCampo: { color: cores.erro, fontSize: 13, marginBottom: 8 },
  botao: {
    backgroundColor: cores.primaria, borderRadius: 12,
    padding: 16, alignItems: 'center', marginTop: 8,
  },
  botaoTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
  cartao: {
    backgroundColor: cores.branco, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: cores.borda, marginBottom: 10,
  },
  avisoErro: {
    backgroundColor: '#FEE2E2', color: cores.erro, padding: 12,
    borderRadius: 10, marginBottom: 12, fontSize: 14,
  },
});
