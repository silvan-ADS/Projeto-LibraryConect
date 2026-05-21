const supabase = require("../config/supabase");

const adicionarUsuarios = async (req, res) => {
    const{data, error} = await supabase
        .from("usuarios")
        .select("*");

    if(error) {
        return res.status(500).json({
            erro: error.message
        });
    }

    res.json(data);
};

const criarUsuario = async (req, res) => {
    const {
        nome, 
        email, 
        telefone, 
        matricula
    } = req.body;

    if(!nome || !email) {
        return res.status(400).json({
            erro: "Nome e email são obrigatórios!"
        })
    };

    const novoUsuario = {
        nome,
        email,
        telefone,
        matricula
    }

    const {data, error} = await supabase
        .from("usuarios")
        .insert([novoUsuario])
        .select();

    if (error) {
        return res.status(500).json({
            erro: error.message
        });
    };

    res.status(201).json({
        mensagem: "Úsuario cadastrado com sucesso!",
        usuario: data
    });
};

module.exports = {
    criarUsuario,
    adicionarUsuarios
}