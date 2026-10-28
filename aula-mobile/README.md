# aula-mobile — App que consome a API

App em React Native + Expo (Aula 1) que lê e altera os dados da API `aula-spring`.

| Tela | Pedidos à API |
|---|---|
| **Clientes** — lista, pesquisa, puxar para actualizar | `GET /api/clientes` |
| **Detalhe** — dados, pedidos e total em MT | `GET /api/clientes/{id}`, `GET /api/pedidos/cliente/{id}`, `POST /api/pedidos`, `DELETE /api/pedidos/{id}`, `DELETE /api/clientes/{id}` |
| **Formulário** — criar e editar, com os erros da API em cada campo | `GET /api/clientes/{id}`, `POST /api/clientes`, `PUT /api/clientes/{id}` |

## Como correr

1. **API a correr** (na pasta `aula-spring`):
   ```
   docker compose up -d --build
   ```
   Teste no navegador do telemóvel: `http://IP-DO-PC:8080/api/clientes` (com `http`, não `https`).

2. **Mudar o IP** em `src/api.js` para o IP do computador onde corre o Docker (`ipconfig` → Endereço IPv4):
   ```js
   export const API_URL = 'http://IP-DO-PC:8080/api';
   ```
   No telemóvel não se usa `localhost`: seria o próprio telemóvel.

3. **Instalar e arrancar**:
   ```
   npm install
   npx expo start
   ```
   Ler o QR code com o **Expo Go**. Telemóvel e PC na mesma rede (Wi-Fi ou hotspot).

## Estrutura

```
App.js                          navegação (3 telas)
src/api.js                      todos os pedidos à API (fetch)
src/theme.js                    cores e estilos
src/screens/ClientesScreen.js
src/screens/ClienteDetalheScreen.js
src/screens/ClienteFormScreen.js
```
