const express = require('express');

const server = express();

server.use(express.json());

const notas = [];
//let id = 1;

function verfyData(req, res, next) {
    const { titulo, conteudo, data, hora } = req.body;

    if (!titulo) {
        return res.json({
            error: 'Titulo é obrigatorio'
        });
    } else if (!conteudo) {
        return res.json({
            error: 'Conteúdo é obrigatorio'
        });
    } else if (!data) {
        return res.json({
            error: 'Data é obrigatorio'
        });
    } else if (!hora) {
        return res.json({
            error: 'Hora é obrigatorio'
        });
    }
    next();
}


server.get('/', (req, res) => {
    return res.json({
        result: 'Teste Bloco de Notas!'
    });
});

server.get('/notas', (req, res) => {
    return res.json({ notas });
});

server.get('/notas/:id', (req, res) => {
    const { id } = req.params;

    return res.json({
        result: 'Nota encontrada com sucesso',
        nota: notas[id]
    });
});

server.post('/notas', verfyData, (req, res) => {
    const { titulo, conteudo, data, hora } = req.body;

    const nota = {
        titulo,
        conteudo,
        data,
        hora
    };

    notas.push(nota);

    return res.json({ nota });
});

server.put('/notas/:id', verfyData, (req, res) => {
    const { titulo, conteudo, data, hora } = req.body;
    const { id } = req.params;

    const nota = {
        titulo,
        conteudo,
        data,
        hora
    };

    notas[id] = nota;

    return res.json({
        result: 'Nota atualizada com sucesso',
        nota: nota
    })
})

server.delete('/notas/:id', (req, res) => {
    const { id } = req.params;
    return res.json({
        result: 'Nota apagada com sucesso',
        nota: id
    })
})

server.listen(3000);