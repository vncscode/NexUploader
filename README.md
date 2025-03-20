`# NexUploader

O **NexUploader** é um módulo para Node.js que facilita o envio de arquivos para o servidor de armazenamento, com funcionalidades de limitação de tamanho de arquivo (60MB) e controle de número de uploads (6 uploads por minuto). Esse módulo foi criado para ser simples e eficiente para integrações em projetos que requerem upload de arquivos de maneira controlada.

## 📦 Instalação

### 1. Instalação via npm

Para instalar o **NexUploader** em seu projeto, execute o seguinte comando:

\`\`\`bash
npm install nex-uploader
\`\`\`

## 🚀 Como Usar

### 1. Importação do módulo

No seu código JavaScript, importe o **NexUploader**:

\`\`\`javascript
const uploadFile = require('nex-uploader');
\`\`\`

### 2. Exemplo Completo de Uso

Aqui está um exemplo completo de como usar o **NexUploader** para fazer o upload de um arquivo:

\`\`\`javascript
const uploadFile = require('nex-uploader'); // Importa o módulo NexUploader

const filePath = './path/to/your/file.txt'; // Caminho do arquivo a ser enviado

// Função para fazer o upload
async function upload() {
  try {
    // Realiza o upload do arquivo
    const result = await uploadFile(filePath); 

    if (result.success) {
      console.log('✅ Upload realizado com sucesso!');
      console.log('🔗 Link do arquivo:', result.data.links[0].link); // Acessa o link do arquivo enviado
    } else {
      console.error('❌ Erro ao realizar upload:', result.error); // Exibe o erro em caso de falha
    }

  } catch (err) {
    console.error('❌ Erro inesperado:', err.message); // Exibe erros inesperados
  }
}

upload(); // Chama a função para fazer o upload do arquivo
\`\`\`

### Parâmetros do Método \`uploadFile\`

- **filePath**: O caminho completo para o arquivo que será enviado. Certifique-se de que o caminho está correto.

## ⚙️ Funcionalidades

### 1. Limitação de Tamanho de Arquivo

- O módulo garante que o arquivo não ultrapasse o tamanho de **60MB**. Caso o arquivo seja maior, o upload será rejeitado e retornará um erro.

### 2. Limitação de Uploads por Minuto

- O módulo também aplica um limite de **6 uploads por minuto**. Caso o limite de uploads seja atingido, você receberá um erro informando que o número máximo de uploads foi excedido e que você deve aguardar antes de tentar novamente.

### 3. Respostas

#### Sucesso

Em caso de sucesso no upload, a resposta será:

\`\`\`json
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
\`\`\`

#### Erro de Tamanho de Arquivo

Se o arquivo for maior que 60MB, a resposta será:

\`\`\`json
{
  "success": false,
  "error": "❌ O arquivo excede o limite de 60MB. Tamanho: 70.12MB"
}
\`\`\`

#### Erro de Limite de Uploads

Se o limite de uploads por minuto for atingido, a resposta será:

\`\`\`json
{
  "success": false,
  "error": "❌ Limite de 6 uploads por minuto atingido. Tente novamente depois."
}
\`\`\`

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
`