let carrinhoItens = [];

const carrinhoElement = document.getElementById('carrinho');
const listaElement = document.getElementById('lista');
const totalElement = document.getElementById('total');
const cartCountElement = document.getElementById('cartCount');
const cartToggleElement = document.getElementById('carToggle');

function addCarrinho(nome, preco, quantidade) {
    const qtd = parseInt(quantidade) || 1;
    if (qtd <= 0) return;

    const itemExistente = carrinhoItens.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += qtd;
    } else {
        carrinhoItens.push({
            nome: nome,
            preco: preco,
            quantidade: qtd
        });
    }

    renderizarCarrinho();
    carrinhoElement.classList.add('carrinho--aberto');
}

function removerItem(index) {
    if (index >= 0 && index < carrinhoItens.length) {
        carrinhoItens.splice(index, 1);
        renderizarCarrinho();
    }
}

function calcularTotal() {
    return carrinhoItens.reduce((total, item) => {
        const subtotal = item.preco * item.quantidade;
        return total + subtotal;
    }, 0);
}

function renderizarCarrinho() {
    listaElement.innerHTML = '';

    carrinhoItens.forEach((item, index) => {
        const li = document.createElement('li');
        const subtotal = (item.preco * item.quantidade).toFixed(2);

        li.innerHTML = `
            ${item.nome} (${item.quantidade} m²) - R$ ${subtotal.replace('.', ',')}
            <button class="remover-item" onclick="removerItem(${index})">
                &times;
            </button>
        `;
        listaElement.appendChild(li);
    });

    const total = calcularTotal();
    const totalFormatado = total.toFixed(2).replace('.', ',');
    totalElement.textContent = totalFormatado;

    const totalItens = carrinhoItens.reduce((count, item) => count + item.quantidade, 0);
    cartCountElement.textContent = totalItens;

    if (carrinhoItens.length > 0) {
        cartCountElement.classList.add('cart-count--active');
    } else {
        cartCountElement.classList.remove('cart-count--active');
        carrinhoElement.classList.remove('carrinho--aberto');
    }
}

function toggleCarrinho() {
    carrinhoElement.classList.toggle('carrinho--aberto');
}

function fecharCarrinho(event) {
    if (!carrinhoElement.contains(event.target) && !cartToggleElement.contains(event.target)) {
        carrinhoElement.classList.remove('carrinho--aberto');
    }

    if (event.type === 'keyup' && event.key === 'Escape') {
        carrinhoElement.classList.remove('carrinho--aberto');
    }
}

function inicializar() {
    cartToggleElement.addEventListener('click', toggleCarrinho);
    document.addEventListener('click', fecharCarrinho);
    document.addEventListener('keyup', fecharCarrinho);

    renderizarCarrinho();

    window.addCarrinho = addCarrinho;
    window.removerItem = removerItem;
}

document.addEventListener('DOMContentLoaded', inicializar);