/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaMinus, FaPlus, FaRegCreditCard, FaBarcode } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import OfferList from '../../components/lists/OfferList';
import './cart.scss';
import {
    adicionarProdutoCarrinho,
    apagarCarrinho,
    listarCarrinho,
    removerProdutoCarrinho,
} from '../../services/UsuarioProdutoService';
import { verificarCep } from '../../services/EnderecoService';
import { getProdutoById } from '../../services/ProdutoService';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../services/AuthService';
import Loading from '../../components/loading/Loading';
import { setFreteInfo } from '../../store/actions/freteActions';
import { useNavigation } from '../../NavigationProvider';

const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export default function Cart() {
    const navigate = useNavigate();
    const { setIsNavigatingToPayment } = useNavigation();
    const [cep, setCep] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const cepInputRef = useRef(null);
    const cartRef = useRef(null);
    const [carrinho, setCarrinho] = useState([]);
    const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const frete = useSelector((state) => state.frete);

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
    const [localDeliveryCost, setLocalDeliveryCost] = useState('');
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');

    async function fetchCarrinho() {
        try {
            if (AuthService.isLoggedIn()) {
                const response = await listarCarrinho();
                if (response.length === 0) {
                    setCarrinho([]);
                    setCep('');
                    return;
                }
                const carrinhoDetalhado = await Promise.all(
                    response.produtos.map(async (produto) => {
                        const detalhesProduto = await getProdutoById(
                            produto.id
                        );
                        return { ...produto, ...detalhesProduto };
                    })
                );
                carrinhoDetalhado.sort((a, b) => {
                    const nomeA = a.nome.toUpperCase();
                    const nomeB = b.nome.toUpperCase();
                    if (nomeA < nomeB) return -1;
                    if (nomeA > nomeB) return 1;
                    return 0;
                });
                setCarrinho(
                    Array.isArray(carrinhoDetalhado) ? carrinhoDetalhado : []
                );
                setValorTotalCarrinho(response.valorTotal);
            }
        } catch (error) {
            console.error('Erro ao obter itens do carrinho:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCarrinho();
    }, []);

    const addDaysToDate = (days) => {
        const result = new Date();
        result.setDate(result.getDate() + days);
        const day = String(result.getDate()).padStart(2, '0');
        const month = String(result.getMonth() + 1).padStart(2, '0');
        const year = result.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDeliveryOptionChange = (option, price, term) => {
        const estimatedDeliveryDate = addDaysToDate(term);
        dispatch(
            setFreteInfo({
                metodo: option,
                custo: price,
                dataEstimadaEnvio: estimatedDeliveryDate,
                prazoEntrega: term,
            })
        );

        setSelectedDeliveryOption(option);
        setLocalDeliveryCost(price);
        setEstimatedDeliveryDate(estimatedDeliveryDate);
    };

    const handleCepChange = (event) => {
        let formattedCep = event.target.value.replace(/\D/g, '');
        if (formattedCep.length > 5) {
            formattedCep = formattedCep.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        setCep(formattedCep);
        if (cep.length !== 10) {
            setShowOptions(false);
        }
    };

    const handleCalculateDelivery = async () => {
        if (cep.length === 9 && cep.match(/^\d{5}-\d{3}$/)) {
            try {
                const cepValido = await verificarCep(cep);
                if (cepValido) {
                    setShowOptions(true);
                } else {
                    toast.error('CEP não existente.');
                    setShowOptions(false);
                }
            } catch (error) {
                toast.error('Erro ao verificar o CEP.');
                setShowOptions(false);
            }
        } else if (cep.length === 0) {
            toast.warning('Por favor, adicione o seu CEP para calcularmos.');
            cepInputRef.current.focus();
            setShowOptions(false);
        } else if (cep.length !== 9) {
            toast.warning(
                'Por favor, adicione o seu CEP completo para calcularmos.'
            );
            cepInputRef.current.focus();
            setShowOptions(false);
        }
    };

    const calcularSubTotal = () => {
        return carrinho.reduce(
            (total, produto) =>
                total + produto.qntdProduto * produto.valorComDesconto,
            0
        );
    };

    const calcularTotal = () => {
        return calcularSubTotal() + localDeliveryCost;
    };

    const diminuirQuantidadeCarrinho = async (produtoId) => {
        try {
            await removerProdutoCarrinho({ id: produtoId }, 1);
            await fetchCarrinho();
        } catch (error) {
            console.error('Erro ao diminuir produto do carrinho:', error);
        }
    };

    const aumentarQuantidadeCarrinho = async (produtoId) => {
        try {
            const produto = carrinho.find((item) => item.id === produtoId);
            if (produto) {
                await adicionarProdutoCarrinho(
                    { id: produtoId },
                    produto.quantidade + 1
                );
                await fetchCarrinho();
            }
        } catch (error) {
            console.error('Erro ao aumentar quantidade do produto:', error);
        }
    };

    const removerProdutoCarrinhoAPI = async (produtoId, produto) => {
        try {
            await removerProdutoCarrinho(
                { id: produtoId },
                produto.qntdProduto
            );
            await fetchCarrinho();
        } catch (error) {
            console.error('Erro ao remover produto do carrinho:', error);
        }
    };

    const handleCleanCart = async () => {
        setIsLoading(true);
        try {
            await apagarCarrinho();
            await fetchCarrinho();
        } catch (error) {
            console.error('Erro ao apagar carrinho:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const finalizarPedido = async () => {
        setIsLoading(true);
        try {
            if (carrinho.length === 0) {
                toast.warning('Por favor, adicione algum item no carrinho.');
                cartRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (cep.length !== 9) {
                toast.warning('Por favor, adicione o seu CEP para prosseguir.');
                cepInputRef.current.focus();
            } else if (selectedDeliveryOption === '') {
                toast.warning('Por favor, selecione uma opção de entrega.');
                cepInputRef.current.scrollIntoView({ behavior: 'smooth' });
            } else {
                setShowOptions(false);
                setIsNavigatingToPayment(true);
                navigate('/payment');
            }
        } catch (error) {
            console.error('Erro ao continuar pedido:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            <div className="title" ref={cartRef}>
                <hr className="hrTitle" />
                <h2>Meu Carrinho</h2>
                <hr className="hrTitle" />
            </div>
            <section className="containerMain">
                <div className="containerCart">
                    {isLoading ? (
                        <Loading />
                    ) : carrinho.length === 0 ? (
                        <div className="emptyCartMessage">
                            <h2 className="textEmpty">
                                O seu carrinho está vazio.
                            </h2>
                            <button
                                className="btnBackBuy"
                                onClick={() => navigate('/productFilter')}
                            >
                                Voltar para às compras
                            </button>
                        </div>
                    ) : (
                        <ul className="listCart">
                            {Array.isArray(carrinho) &&
                                carrinho.map((produto) => (
                                    <li key={produto.id} className="order">
                                        <div className="labels">
                                            <p>Produto</p>
                                            <div className="labelsNumber">
                                                <p>Quantidade</p>
                                                <p>Valor</p>
                                            </div>
                                        </div>
                                        <hr className="hrLabels" />
                                        <div className="productDesc">
                                            <img
                                                src={produto.imagemPrincipal}
                                                alt={produto.nome}
                                            />
                                            <h4 className="nameProduct">
                                                {produto.nome}
                                            </h4>
                                            <p className="amount">
                                                <button
                                                    type="button"
                                                    className="buttonQtd"
                                                    id="minusQtd"
                                                    onClick={() =>
                                                        diminuirQuantidadeCarrinho(
                                                            produto.id
                                                        )
                                                    }
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span id="qtdNumber">
                                                    {produto.qntdProduto}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="buttonQtd"
                                                    id="plusQtd"
                                                    onClick={() =>
                                                        aumentarQuantidadeCarrinho(
                                                            produto.id
                                                        )
                                                    }
                                                >
                                                    <FaPlus />
                                                </button>
                                            </p>
                                            <h4 className="priceProduct">
                                                {BRL.format(
                                                    produto.qntdProduto *
                                                        produto.valorComDesconto
                                                )}
                                            </h4>
                                            <p>
                                                <button
                                                    className="btnRemove"
                                                    onClick={() =>
                                                        removerProdutoCarrinhoAPI(
                                                            produto.id,
                                                            produto
                                                        )
                                                    }
                                                >
                                                    <TiDeleteOutline />
                                                </button>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    )}

                    <button
                        type="button"
                        className="cleanCart"
                        onClick={handleCleanCart}
                    >
                        Limpar Carrinho
                        <MdDelete className="icon" />
                    </button>
                </div>

                <div className="resume">
                    <div className={`resumeBuy ${isLoading ? 'loading' : ''}`}>
                        <h3>Resumo</h3>
                        <hr className="hrResume" />
                        <div className="values">
                            <p>SubTotal:</p>
                            <p>{BRL.format(calcularSubTotal())}</p>
                        </div>
                        <div className="values">
                            <p>Entrega:</p>
                            {selectedDeliveryOption ? (
                                <p>{BRL.format(localDeliveryCost)}</p>
                            ) : (
                                <p>{BRL.format(0)}</p>
                            )}
                        </div>
                        <hr className="hrTotal" />
                        <div className="values">
                            <p>Total:</p>
                            <strong>{BRL.format(calcularTotal())}</strong>
                        </div>
                        <hr className="hrOptions" />
                        <div className="paymentOptions">
                            <div className="options">
                                <FaRegCreditCard className="icon" />
                                <p>
                                    <strong>
                                        {BRL.format(calcularTotal())}
                                    </strong>{' '}
                                    <br />
                                    em 12x de{' '}
                                    <span>
                                        {BRL.format(calcularTotal() / 12)}
                                    </span>{' '}
                                    s/ juros
                                </p>
                            </div>
                            <div className="options">
                                <FaBarcode className="icon" />
                                <p>
                                    <strong>
                                        {BRL.format(
                                            calcularSubTotal() -
                                                (calcularSubTotal() / 100) *
                                                    15 +
                                                frete.custo
                                        )}
                                    </strong>{' '}
                                    <br />
                                    com desconto à vista no boleto ou pix
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="endOrder"
                            onClick={() => finalizarPedido()}
                        >
                            Ir para o Pagamento
                        </button>
                    </div>

                    <div className="delivery">
                        <h4>Calcular Entrega</h4>
                        <hr className="hrDelivery" />
                        <div className="inputCep">
                            <input
                                type="text"
                                placeholder="Digite seu CEP"
                                value={cep}
                                onChange={handleCepChange}
                                maxLength={9}
                                inputMode="numeric"
                                pattern="\d{5}-?\d{3}"
                                ref={cepInputRef}
                            />
                            <button
                                type="button"
                                className="calcDelivery"
                                onClick={handleCalculateDelivery}
                            >
                                Calcular
                                <TbTruckDelivery className="icon" />
                            </button>
                            <a
                                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="SearchCep"
                            >
                                Não sei meu CEP
                            </a>
                        </div>
                        {showOptions && (
                            <div>
                                <div className="optionsDelivery">
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name="optionsDel"
                                            id="rbSedex"
                                            className="rbDelivery"
                                            onClick={() =>
                                                handleDeliveryOptionChange(
                                                    'Sedex',
                                                    26.99,
                                                    7
                                                )
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label
                                        htmlFor="rbSedex"
                                        className="labelOp"
                                    >
                                        <strong>Sedex:</strong>
                                        <p>Prazo de entrega: em até 7 dias</p>
                                    </label>
                                    <strong>{BRL.format(26.99)}</strong>
                                </div>
                                <div className="optionsDelivery">
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name="optionsDel"
                                            id="rbJadLog"
                                            className="rbDelivery"
                                            onClick={() =>
                                                handleDeliveryOptionChange(
                                                    'Jadlog',
                                                    32.99,
                                                    15
                                                )
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label
                                        htmlFor="rbJadLog"
                                        className="labelOp"
                                    >
                                        <strong>JadLog:</strong>
                                        <p>Prazo de entrega: em até 15 dias</p>
                                    </label>
                                    <strong>{BRL.format(32.99)}</strong>
                                </div>
                                <div className="optionsDelivery">
                                    <label className="radio-container">
                                        <input
                                            type="radio"
                                            name="optionsDel"
                                            id="rbExpress"
                                            className="rbDelivery"
                                            onClick={() =>
                                                handleDeliveryOptionChange(
                                                    'Express',
                                                    45.99,
                                                    12
                                                )
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label
                                        htmlFor="rbExpress"
                                        className="labelOp"
                                    >
                                        <strong>Express:</strong>
                                        <p>Prazo de entrega: em até 12 dias</p>
                                    </label>
                                    <strong>{BRL.format(45.99)}</strong>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="offers">
                <h2>Continue Comprando</h2>
                {AuthService.isLoggedIn && AuthService.isLoggedInWithGoogle && (
                    <OfferList fetchCarrinho={fetchCarrinho} />
                )}
            </section>
        </main>
    );
}
