# HolisticFlow Studio Backend

Backend Node.js para Firebase App Hosting.

## 📦 Estrutura do Projeto

```
holisticflow-studio/
├── app/
│   └── index.js          # Servidor HTTP principal
├── src/
│   └── components/       # Componentes (existentes)
├── firebase.json         # Configuração Firebase
├── apphosting.yaml       # Configuração App Hosting
├── package.json          # Dependências e scripts
└── .gitignore            # Ficheiros a ignorar
```

## 🚀 Deployment no Firebase

### 1. Instalar Dependências Localmente

```bash
npm install
```

### 2. Testar Localmente

```bash
npm start
# Servidor irá iniciar na porta 8080
# Testar: http://localhost:8080/api/test
```

### 3. Fazer Commit e Push para GitHub

```bash
git add .
git commit -m "Estrutura backend completa"
git push origin main
```

### 4. Forçar Deploy no Firebase

O Firebase App Hosting está conectado ao GitHub. Qualquer push para `main` irá automaticamente:

1. Detetar `package.json`
2. Executar `npm install`
3. Executar `npm start`
4. Servir na porta definida em `process.env.PORT`

**OU forçar manualmente:**

```bash
# No Firebase Console -> App Hosting -> Forçar novo deployment
```

## 📍 Endpoints Disponíveis

### `GET /`
Retorna informação sobre a API.

### `GET /api/test`
Endpoint de teste.

**Resposta:**
```json
{
  "ok": true,
  "message": "HolisticFlow backend ativo",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "environment": "production"
}
```

## ⚙️ Variáveis de Ambiente

Definidas em `apphosting.yaml`:

- `NODE_ENV`: production
- `PORT`: Definido automaticamente pelo Firebase

## 📝 Como Adicionar Novos Endpoints

Editar `app/index.js`:

```javascript
if (req.method === 'GET' && req.url === '/api/novo-endpoint') {
  const response = { ok: true, data: 'Teus dados aqui' };
  res.writeHead(200);
  res.end(JSON.stringify(response));
  return;
}
```

## 🔧 Tecnologias

- **Node.js 20**
- **Firebase App Hosting**
- **HTTP nativo** (sem frameworks adicionais)

## 📊 Logs

Ver logs no Firebase Console:
```
Firebase Console -> App Hosting -> Logs
```
