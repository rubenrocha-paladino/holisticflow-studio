const http = require('http');

// Porta configurada pelo Firebase App Hosting (ou 8080 por defeito)
const PORT = process.env.PORT || 8080;

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  // Configurar CORS para permitir requests de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handler para OPTIONS (preflight CORS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Endpoint de teste: GET /api/test
  if (req.method === 'GET' && req.url === '/api/test') {
    const response = {
      ok: true,
      message: 'HolisticFlow backend ativo',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    };
    res.writeHead(200);
    res.end(JSON.stringify(response, null, 2));
    return;
  }

  // Endpoint raiz: GET /
  if (req.method === 'GET' && req.url === '/') {
    const response = {
      ok: true,
      message: 'HolisticFlow Studio API',
      version: '1.0.0',
      endpoints: [
        { path: '/api/test', method: 'GET', description: 'Endpoint de teste' }
      ]
    };
    res.writeHead(200);
    res.end(JSON.stringify(response, null, 2));
    return;
  }

  
  
    // Endpoint para sincronizar missions do GoHighLevel
    if (req.method === 'GET' && req.url === '/api/ghl/appointments') {
          const token = process.env.GHL_TOKEN;
          const locationId = process.env.GHL_LOCATION_ID;
      
          if (!token || !locationId) {
                  res.writeHead(500);
                  res.end(JSON.stringify({ ok: false, error: 'GHL_TOKEN ou GHL_LOCATION_ID não configurado' }));
                  return;
                }
      
          // Chamar API do GoHighLevel para obter appointments
          const https = require('https');
          const apiUrl = `https://services.leadconnectorhq.com/calendars/events?locationId=${locationId}`;
      
          const options = {
                  headers: {
                            'Authorization': `Bearer ${token}`,
                            'Version': '2021-07-28'
                                    }
                        };
      
          https.get(apiUrl, options, (apiRes) => {
                  let data = '';
            
                  apiRes.on('data', (chunk) => {
                            data += chunk;
                          });
            
                  apiRes.on('end', () => {
                            try {
                                        const appointments = JSON.parse(data);
                                        res.writeHead(200);
                                        res.end(JSON.stringify({ ok: true, appointments }));
                                      } catch (error) {
                                        res.writeHead(500);
                                        res.end(JSON.stringify({ ok: false, error: 'Erro ao processar resposta da API' }));
                                      }
                          });
                }).on('error', (error) => {
                  res.writeHead(500);
                  res.end(JSON.stringify({ ok: false, error: error.message }));
                });
      
          return;
        }// 404 para rotas não encontradas
  res.writeHead(404);
  res.end(JSON.stringify({ ok: false, error: 'Rota não encontrada' }));
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 HolisticFlow backend a correr na porta ${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
});
