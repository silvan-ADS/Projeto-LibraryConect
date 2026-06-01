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

const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioId = Number(id);

    if (!id || Number.isNaN(usuarioId)) {
        return res.status(400).json({
            erro: "Atenção: ID do usuário inválido.",
        });
    }

    const { data: usuarioExistente, error: erroBusca } = await supabase
        .from("usuarios")
        .select("id")
        .eq("id", usuarioId)
        .maybeSingle();

    if (erroBusca) {
        return res.status(500).json({
            erro: erroBusca.message,
        });
    }

    if (!usuarioExistente) {
        return res.status(404).json({
            erro: "Usuário não encontrado.",
        });
    }

    const { error } = await supabase
        .from("usuarios")
        .delete()
        .eq("id", usuarioId);

    if (error) {
        return res.status(500).json({
            erro: error.message,
        });
    }

    res.json({
        mensagem: "Usuário excluído com sucesso!",
    });
};

module.exports = {
    criarUsuario,
    adicionarUsuarios,
    deletarUsuario
}