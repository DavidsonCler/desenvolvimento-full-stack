from pydantic import BaseModel
from typing import Optional, List
from model.pedido import Pedido
from datetime import datetime

from schemas import ComentarioSchema, ProdutoSchema


class PedidoSchema(BaseModel):
    """ Define como um novo pedido a ser inserido deve ser representado
    """
   # nf: int = 1
   # data_insercao: datetime(year=2023, month=4, day=13)
    cpf_cliente: int = 14465488797
    nome_cliente: str = "Josiclésio Fonte Seca"
    endereco_cliente: str = "Av. Monsenhor - 80, Tijuca-RJ"    
    telefone_cliente: int = 2122526688

class PedidoBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do pedido.
    """
    nf: int = 1


class ListagemPedidosSchema(BaseModel):
    """ Define como uma listagem de pedidos será retornada.
    """
    pedidos:List[PedidoSchema]


def apresenta_pedidos(pedidos: List[Pedido]):
    """ Retorna uma representação do pedido seguindo o schema definido em
        PedidoViewSchema.
    """
    result = []
    for pedido in pedidos:
        result.append({
            "nf": pedido.nf,
           # "data_insercao": pedido.data_insercao,
            "cpf_cliente": pedido.cpf_cliente,
            "nome_cliente": pedido.nome_cliente,
            "telefone_cliente": pedido.telefone_cliente,
            "endereco_cliente": pedido.endereco_cliente,
            "valor": pedido.valor
            
        })

    return {"pedidos": result}


class PedidoViewSchema(BaseModel):
    """ Define como um pedido será retornado: pedido + comentários.
    """
    nf: int = 1
    valor: float = 56.30
    #data_insercao: datetime()
    cpf_cliente: int = 14465488797
    nome_cliente: str = "Josiclésio Fonte Seca"
    endereco_cliente: str = "Av. Monsenhor, Tijuca-RJ"    
    telefone_cliente: int = 2122526688
    total_produtos: int = 1
    produtos:List[ProdutoSchema]
    total_cometarios: int = 1
    comentarios:List[ComentarioSchema]


class PedidoDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
        de remoção.
    """
    mesage: str
    nome: str

def apresenta_pedido(pedido: Pedido):
    """ Retorna uma representação do pedido seguindo o schema definido em
        PedidoViewSchema.
    """
    return {
            "nf": pedido.nf,
            #"data_insercao": pedido.data_insercao,
            "cpf_cliente": pedido.cpf_cliente,
            "nome_cliente": pedido.nome_cliente,
            "telefone_cliente": pedido.telefone_cliente,
            "endereco_cliente": pedido.endereco_cliente,
            "valor": pedido.valor,
            "total_cometarios": len(pedido.comentarios),
            "comentarios": [{"texto": c.texto} for c in pedido.comentarios]
    }
