/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuário a partir do seu Id
 2 Obter o endereco do usuario pelo Id
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)
//Padrao: callback(erro, sucesso)
//Callback como parâmetro será a função chamada ao término do setTimeout
function obterUsuario() {
    //Se der tudo certo, RESOLVE
    //Se der erro, REJECT(ERRO)
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function () {
            return resolve( {
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)    
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: 1129000333,
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 1000)
}

main()
async function main() {
    try {
        console.time('medidor-promise')
        const usuario = await obterUsuario()

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: Rua ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medidor-promise')
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

// const usuarioPromise = obterUsuario()
// //para manipular sucesso, usamos .then()
// //para manipular erros, usamos .catch()
// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//                 .then(function resolverTelefone(result) {
//                     return {
//                         usuario: {
//                             nome: usuario.nome,
//                             id: usuario.id
//                         },
//                         telefone: result
//                     }
//                 })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome},
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone},
//             Endereço: Rua ${resultado.endereco.rua}, ${resultado.endereco.numero}
//         `)
//     })
//     .then(function (resultado) {
//         console.log('resultado', resultado)
//     })
//     .catch(function (error) {
//         console.error('DEU RUIM', error)
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('DEU RUIM em TELEFONE', error1)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('DEU RUIM em ENDERECO', error2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereco: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })