from sqlalchemy import Column, Integer, DateTime, Float, String
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union
from  model import Base, Comentario, Cliente, Produto


class Pedido(Base, Cliente):
    __tablename__ = 'pedido'

    nf = Column("pk_pedido", Integer, primary_key=True)
    valor = Column(Float)
    data_insercao = Column(DateTime, default=datetime.now())
    cpf_cliente = Column(Integer, nullable=False)
    nome_cliente = Column(String(140), unique=True)
    endereco_cliente = Column(String(200))
    telefone_cliente = Column(Integer)
    # Definição do relacionamento entre o produto e o comentário.
    # Essa relação é implicita, não está salva na tabela 'produto',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.
    comentarios = relationship("Comentario")
    produtos = relationship("Produto")
    #produto = Column(Integer, ForeignKey("produto.pk_pedido"), nullable=False)
   #cliente = Column(Integer,ForeignKey("cliente.pk_cliente"), nullable=False)
    def __init__(self, nome: str, cpf: int, endereco: str, telefone: int, data_insercao:Union[DateTime, None] = None):
        """
        Cria um Produto

        Arguments:
            nome: nome do produto.
            quantidade: quantidade que se espera comprar daquele produto
            valor: valor esperado para o produto
            data_insercao: data de quando o produto foi inserido à base
        """
        super(Cliente,self).__init__(nome, cpf, endereco, telefone)
        """
        Cria um Cliente

        Arguments:
            nome: nome do cliente.
            cpf: documento do cliente e também Primary Key
            telefone: numero para contato do cliente
            endereço: endereço da residencia do cliente
        """
        self.nome_cliente = nome
        self.cpf_cliente = cpf
        self.endereco_cliente = endereco
        self.telefone_cliente = telefone       
  

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
            
    def valor_pedido(self):
        for t in self.produtos:
           self.valor += t.valor_total 
        return self.valor
    
    def get_nf(self):
        return self.nf
    
    
    def adiciona_produto(self, produto:Produto):
        """ Adiciona um novo comentário ao Produto
        """
        self.produtos.append(produto)
        
    def adiciona_comentario(self, comentario:Comentario):
        """ Adiciona um novo comentário ao Produto
        """
        self.comentarios.append(comentario)

  
   
   