const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

// regex do exercício: /\((https?):\/\/([^\s$.?#].[^\/\s]*\/)/gm

function extraiLinks(texto) {
    
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResultados = [];
    
    let temp;
    while((temp = regex.exec(texto)) !== null) {
        arrayResultados.push({ [temp[1]] : temp[2] })
    }

    return arrayResultados.length === 0 ? 'Não há links no arquivo' : arrayResultados;
}

function trataErro(erro) {
    throw new Error(erro.code, 'Não há arquivo no caminho especificado');
}

async function pegaArquivo(caminhoDoArquivo) {
    
    const encoding = 'utf-8';
    
    try {
        
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
        
    } catch(erro) {
        
        trataErro(erro);
        
    } finally {
        console.log(chalk.blue('operação concluída'))
    }
    
}

module.exports = pegaArquivo;

/*
async function pegaArquivo(caminho) {
    
    const caminhoAbsoluto = path.join(__dirname, '..', caminho);
    
    const encoding = 'utf-8';
    
    try {
        
        const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
        
        const resultado = await Promise.all(arquivos.map(async (arquivo) => {
            
            const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
            const texto = await fs.promises.readFile(localArquivo, encoding);
            return extraiLinks(texto);
            
        }));
        
        return resultado;
        
    } catch(erro) {
        
        trataErro(erro);
        
    } finally {
        console.log(chalk.blue('operação concluída'))
    }
    
}
*/

/* promises usando .then() e .catch():

function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';

    fs.promises
    .readFile(caminhoDoArquivo, encoding)
        .then((texto) => console.log(chalk.green(texto)))
            .catch((erro) => console.log(chalk.red(trataErro(erro))))
}

*/

/*  sem usar promises:

function pegaArquivo(caminhoDoArquivo) {
    
    const encoding = 'utf-8';
    
    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        
        if(erro) {
            trataErro(erro);
        };

        console.log(chalk.green(texto));
    });
};
*/
