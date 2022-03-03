const pegaArquivo = require('../index.js');

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('pegaArquivo::', () => {
    
    it('deve ser uma função', () => {
        expect(typeof pegaArquivo)
            .toBe('function')
    });

    it('deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('test/mocks/texto_com_link.md');
        expect(resultado)
            .toEqual(arrayResult)
    });

    it('deve retornar mensagem "Não há links no arquivo"', async () => {
        const resultado = await pegaArquivo('test/mocks/texto_sem_link.md');
        expect(resultado)
            .toBe('Não há links no arquivo');
    });

    it('deve retornar mensagem "Não há arquivo no caminho especificado"', () => {
        async function capturaErro() {
            await pegaArquivo('test/mocks')
            expect(capturaErro).toThrowError(/Não há arquivo no caminho especificado/);
        }
    })
});