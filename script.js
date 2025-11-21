let carrinho = [];
let total = 0;

function addCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

function removerItem(index) {
    total -= carrinho[index].preco;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    total = 0;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const totalEl = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerItem(${index})" style="margin-left:10px; background:red; color:white; border:none; padding:4px 8px; border-radius:5px; cursor:pointer;">
                X
            </button>
        `;
        lista.appendChild(li);
    });

    totalEl.textContent = total.toFixed(2);
}

function finalizarPedido() {
    const entrega = document.getElementById("tipoEntrega").value;
    const pagamento = document.getElementById("pagamento").value;

    const nome = document.getElementById("nomeCliente").value;
    const endereco = document.getElementById("enderecoCliente").value;
    const obs = document.getElementById("obsCliente").value;

    let mensagem = ` Pedido Oliver Pisos* \n\n`;

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    });

    mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n`;
    mensagem += `*Entrega:* ${entrega}\n`;
    mensagem += `*Pagamento:* ${pagamento}\n\n`;
    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📍 *Endereço:* ${endereco}\n`;
    mensagem += `📝 *Observações:* ${obs}\n`;

    const url = `https://wa.me/553196511118?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}
