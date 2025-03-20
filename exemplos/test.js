const uploadFile = require('nex-uploader'); 

const filePath = './package.json'; 


async function upload() {
  try {
    const result = await uploadFile(filePath);

    if (result.success) {
      console.log('✅ Upload realizado com sucesso!');
      console.log('🔗 Link do arquivo:', result.data.links[0].link);
    } else {
      console.error('❌ Erro ao realizar upload:', result.error);
    }

  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
  }
}

upload();
