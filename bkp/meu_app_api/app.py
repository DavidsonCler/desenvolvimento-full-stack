from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
#from urllib.parse import

from sqlalchemy.exc import IntegrityError

from model import Session, Produto, Pedido, Comentario
from logger import logger
from schemas import *
from flask_cors import CORS

info = Info(title="API - Mercado Delivery - Davidson", version="2.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# definindo tags
home_tag = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
produto_tag = Tag(name="Produto", description="Adição, visualização e remoção de produtos de um pedido")
pedido_tag = Tag(name="Pedido", description="Adição, visualização e remoção de pedidos à base")
comentario_tag = Tag(name="Comentario", description="Adição de um comentário à um pedido cadastrado na base")
produtos_tag = Tag(name="Produtos de um pedido", description="Adição de um produto à um pedido cadastrado na base")


@app.get('/', tags=[home_tag])
def home():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')

# @app.get('/test')
# def my_page():
    # return redirect ('/index')


@app.post('/pedido', tags=[pedido_tag],
          responses={"200": PedidoViewSchema, "409": ErrorSchema, "400": ErrorSchema})
def add_pedido(form: PedidoSchema):
    """Adiciona um novo Pedido à base de dados

    Retorna uma representação dos pedidos com produtos e comentários associados.
    """
    pedido = Pedido(
        nome_cliente=form.nome_cliente,
        endereco_cliente=form.endereco_cliente,
        cpf_cliente=form.cpf_cliente,
        telefone_cliente=form.telefone_cliente)
    logger.debug(f"Adicionando pedido do Cliente: '{pedido.nome_cliente}'")
    try:
        # criando conexão com a base
        session = Session()
        # adicionando produto
        session.add(pedido)
        # efetivando o camando de adição de novo item na tabela
        session.commit()
        logger.debug(f"Adicionado pedido do Cliente: '{pedido.nome_cliente}'")
        return apresenta_pedido(pedido), 200

    except IntegrityError as e:
        # como a duplicidade do nome é a provável razão do IntegrityError
        error_msg = "Pedido com a mesma NF já salvo na base :/"
        logger.warning(f"Erro ao adicionar o pedido do Cliente: '{pedido.nome_cliente}', {error_msg}")
        return {"mesage": error_msg}, 409

    except Exception as e:
        # caso um erro fora do previsto
        error_msg = "Não foi possível salvar novo item :/"
        logger.warning(f"Erro ao adicionar o pedido do Cliente: '{pedido.nome_cliente}', {error_msg}")
        return {"mesage": error_msg}, 400
    
    
    
@app.post('/produto', tags=[produto_tag],
          responses={"200": PedidoViewSchema, "404": ErrorSchema})
def add_produto(form: ProdutoSchema):
    """Adiciona de um novo produto à um pedido cadastrado na base identificado pela nf

    Retorna uma representação do pedido e e produtos associados.
    """
    # definindo variáveis
    pedido_nf=form.pedido_nf
    logger.debug(f"Adicionando produtos ao pedido #{pedido_nf}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca pelo pedido
    pedido = session.query(Pedido).filter(Pedido.nf == pedido_nf).first()

    if not pedido:
        # se pedido não encontrado
        error_msg = "Pedido não encontrado na base :/"
        logger.warning(f"Erro ao adicionar produto ao pedido '{pedido_nf}', {error_msg}")
        return {"mesage": error_msg}, 404

    # criando o produto
    nome=form.nome
    quantidade=form.quantidade
    valor=form.valor
    valor_total=(quantidade * valor)
    # definindo o objeto de Produto
    produto = Produto(nome, quantidade, valor, valor_total)
    
    #Criando logs
    logger.debug(f"Adicionando produto ao pedido:  #{pedido_nf}")
    logger.debug(f"Adicionando produto: '{produto.nome}' no pedido")
    
    
    # adicionando o produto ao pedido
    pedido.adiciona_produto(produto)
    pedido.valor_pedido(produto)
    session.commit()

    # retorna a representação de pedido
    return apresenta_pedido(pedido), 200




@app.get('/produtos', tags=[produto_tag],
         responses={"200": ListagemProdutosSchema, "404": ErrorSchema})
def get_produtos():
    """Faz a busca por todos os Produto cadastrados

    Retorna uma representação da listagem de produtos.
    """
    logger.debug(f"Coletando produtos ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    produtos = session.query(Produto).all()

    if not produtos:
        # se não há produtos cadastrados
        return {"produtos": []}, 200
    else:
        logger.debug(f"%d rodutos econtrados" % len(produtos))
        # retorna a representação de produto
        print(produtos)
        return apresenta_produtos(produtos), 200
    
    
@app.get('/pedidos', tags=[pedido_tag],
         responses={"200": ListagemPedidosSchema, "404": ErrorSchema})
def get_pedidos():
    """Faz a busca por todos os pedidos cadastrados

    Retorna uma representação da listagem de pedidos.
    """
    logger.debug(f"Coletando produtos ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    pedidos = session.query(Pedido).all()

    if not pedidos:
        # se não há pedidos cadastrados
        return {"pedidos": []}, 200
    else:
        logger.debug(f"%d pedidos encontrados" % len(pedidos))
        # retorna a representação de pedidos
        print(pedidos)
        return apresenta_pedidos(pedidos), 200
    
    
@app.get('/pedido', tags=[pedido_tag],
         responses={"200": PedidoViewSchema, "404": ErrorSchema})
def get_pedido(query: PedidoBuscaSchema):
    """Faz a busca por um Pedido a partir da NF do pedido

    Retorna uma representação do pedido e comentários associados.
    """
    nf = query.nf
    logger.debug(f"Coletando dados sobre pedido #{nf}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    pedido = session.query(Pedido).filter(Pedido.nf == nf).first()

    if not pedido:
        # se o pedido não foi encontrado
        error_msg = "Pedido não encontrado na base :/"
        logger.warning(f"Erro ao buscar pedido... '{nf}', {error_msg}")
        return {"mesage": error_msg}, 404
    else:
        logger.debug(f"Pedido do cliente: '{pedido.nome_cliente}' encontrado! \nNF: '{nf}'")
        # retorna a representação de pedido
        return apresenta_pedido(pedido), 200


@app.get('/produtos_pedido', tags=[produto_tag],
         responses={"200": ListagemProdutosSchema, "404": ErrorSchema})
def get_produtos_pedido(query: ProdutoBuscaSchema):
    """Faz a busca por todos os Produtos de um pedido cadastrados

    Retorna uma representação da listagem de produtos por pedido.
    """
    pedido_nf = query.nf_pedido
    logger.debug(f"Coletando produtos do pedido: ")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    produtos = session.query(Produto).where(Produto.pedido_nf == pedido_nf)

    if not produtos:
        # se não há produtos cadastrados
        return {"produtos": []}, 200
    else:
        logger.debug(f"%d produtos encontrados", (produtos))
        # retorna a representação de produto
        print(produtos)
        return apresenta_produtos(produtos), 200


@app.get('/produto', tags=[produto_tag],
         responses={"200": ProdutoViewSchema, "404": ErrorSchema})
def get_produto(query: ProdutoBuscaSchema):
    """Faz a busca por um Produto a partir do id do produto

    Retorna uma representação dos produtos e comentários associados.
    """
    produto_id = query.id
    logger.debug(f"Coletando dados sobre produto #{produto_id}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca
    produto = session.query(Produto).filter(Produto.id == produto_id).first()

    if not produto:
        # se o produto não foi encontrado
        error_msg = "Produto não encontrado na base :/"
        logger.warning(f"Erro ao buscar produto '{produto_id}', {error_msg}")
        return {"mesage": error_msg}, 404
    else:
        logger.debug(f"Produto econtrado: '{produto.nome}'")
        # retorna a representação de produto
        return apresenta_produto(produto), 200


@app.delete('/produto', tags=[produto_tag],
            responses={"200": ProdutoDelSchema, "404": ErrorSchema})
def del_produto(query: ProdutoBuscaSchema):
    """Deleta um Produto a partir do nome informado

    Retorna uma mensagem de confirmação da remoção.
    """
    id = query.id
     # criando conexão com a base
    session = Session()
    #produto_nome = unquote(unquote(query.nome))
    #print(produto_nome)
    logger.debug(f"Deletando dados sobre produto #{id}")
   
    # fazendo a remoção
    count = session.query(Produto).filter(Produto.id == id).delete()
    session.commit()

    if count:
        # retorna a representação da mensagem de confirmação
        logger.debug(f"Deletado produto #{id}")
        return {"mesage": "Produto removido", "id": id}
    else:
        # se o produto não foi encontrado
        error_msg = "Produto não encontrado na base :/"
        logger.warning(f"Erro ao deletar produto #'{id}', {error_msg}")
        return {"mesage": error_msg}, 404
    
    
   
@app.delete('/pedido', tags=[pedido_tag],
            responses={"200": PedidoDelSchema, "404": ErrorSchema})
def del_pedido(query: PedidoBuscaSchema):
    """Deleta um Pedido a partir da NF informada

    Retorna uma mensagem de confirmação da remoção.
    """
    # criando variavel para a query
    nf = query.nf
    # criando conexão com a base
    session = Session()
    print (nf)
    logger.debug(f"Deletando dados sobre pedido e suas depenências... #{nf}")
   
    # fazendo a remoção do pedido e dependências -- Não consegui implementar o Cascade, deram muitos erros
    count = session.query(Pedido).filter(Pedido.nf == nf).delete()
    session.query(Produto).filter(Produto.pedido_nf == nf).delete()
    session.query(Comentario).filter(Comentario.pedido_nf == nf).delete()
    session.commit()

    if count:
        # retorna a representação da mensagem de confirmação
        logger.debug(f" Pedido deletado  #{nf}")
        return {"mesage": "Pedido removido", "NF":nf}
    else:
        # se o pedido não foi encontrado
        error_msg = "Pedido não foi encontrado na base :/"
        logger.warning(f"Erro ao deletar pedido #NF:'{nf}', {error_msg}")
        return {"mesage": error_msg}, 404  



@app.post('/comentario', tags=[comentario_tag],
          responses={"200": PedidoViewSchema, "404": ErrorSchema})
def add_comentario(form: ComentarioSchema):
    """Adiciona de um novo comentário à um produtos cadastrado na base identificado pelo id

    Retorna uma representação dos pedidos e comentários associados.
    """
    pedido_nf = form.pedido_nf
    logger.debug(f"Adicionando comentários ao pedido #{pedido_nf}")
    # criando conexão com a base
    session = Session()
    # fazendo a busca pelo produto
    pedido = session.query(Pedido).filter(Pedido.nf == pedido_nf).first()

    if not pedido:
        # se pedido não encontrado
        error_msg = "Pedido não encontrado na base :/"
        logger.warning(f"Erro ao adicionar comentário ao pedido '{pedido_nf}', {error_msg}")
        return {"mesage": error_msg}, 404

    # criando o comentário
    texto = form.texto
    comentario = Comentario(texto)

    # adicionando o comentário ao pedido
    pedido.adiciona_comentario(comentario)
    session.commit()

    logger.debug(f"Adicionado comentário ao pedido #{pedido_nf}")

    # retorna a representação de pedido
    return apresenta_pedido(pedido), 200


#######################################################################################################################################################
#######################################################################################################################################################


# @app.post('/pedido', tags=[pedido_tag],
        #   responses={"200": ProdutoViewSchema, "409": ErrorSchema, "400": ErrorSchema})
# def add_pedido(form: PedidSchema):
    # """Adiciona um novo Produto à base de dados

    # Retorna uma representação dos produtos e comentários associados.
    # """
    # produto = Produto(
        # nome=form.nome,
        # quantidade=form.quantidade,
        # valor=form.valor,
        # valor_total=(form.valor*form.quantidade))
    # logger.debug(f"Adicionando produto de nome: '{produto.nome}'")
    # try:
       # criando conexão com a base
        # session = Session()
       # adicionando produto
        # session.add(produto)
       # efetivando o camando de adição de novo item na tabela
        # session.commit()
        # logger.debug(f"Adicionado produto de nome: '{produto.nome}'")
        # return apresenta_produto(produto), 200

    # except IntegrityError as e:
        #como a duplicidade do nome é a provável razão do IntegrityError
        # error_msg = "Produto de mesmo nome já salvo na base :/"
        # logger.warning(f"Erro ao adicionar produto '{produto.nome}', {error_msg}")
        # return {"mesage": error_msg}, 409

    # except Exception as e:
       # caso um erro fora do previsto
        # error_msg = "Não foi possível salvar novo item :/"
        # logger.warning(f"Erro ao adicionar produto '{produto.nome}', {error_msg}")
        # return {"mesage": error_msg}, 400

