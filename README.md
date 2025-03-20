# NexUploader

**NexUploader** é um módulo para Node.js que facilita o envio de arquivos com controle de **tamanho máximo (60MB)** e **limitação de uploads (6 por minuto)**.

## Instalação

Instale o módulo no seu projeto:

```bash
npm install nex-uploader
```

## Como Usar

### Exemplo de Código

```javascript
const uploadFile = require('nex-uploader');

const filePath = './path/to/your/file.txt'; // Caminho do arquivo

async function upload() {
  try {
    const result = await uploadFile(filePath); // Faz o upload

    if (result.success) {
      console.log('✅ Upload realizado com sucesso!');
      console.log('🔗 Link do arquivo:', result.data.links[0].link);
    } else {
      console.error('❌ Erro:', result.error);
    }

  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
  }
}

upload(); // Chama a função para enviar o arquivo
```

## Funcionalidades

- **Limite de Tamanho**: Arquivos maiores que **60MB** serão rejeitados.
- **Limite de Uploads**: Apenas **6 uploads por minuto** são permitidos.

## Respostas

### Sucesso

```json
{
  "success": true,
  "data": {
    "links": [
      {
        "originalName": "file.txt",
        "link": "https://storage.nexfuture.com.br/1/abc123xyz.txt",
        "size": "10 KB",
        "uploadDate": "2025-03-20T19:20:00.000Z",
        "isMedia": false
      }
    ]
  }
}
```

### Erro

Se o arquivo for grande demais ou o limite de uploads for atingido:

```json
{
  "success": false,
  "error": "❌ Erro: Arquivo grande demais ou limite de uploads atingido."
}
```

## Licença

MIT License.
