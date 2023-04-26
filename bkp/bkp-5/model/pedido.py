from sqlalchemy import Column, Integer, DateTime, Float, String
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union
from  model import Base, Comentario, Produto


class Pedido(Base):
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
    def __init__(self, nome_cliente: str, cpf_cliente: int, endereco_cliente: str, telefone_cliente: int, data_insercao:Union[DateTime, None] = None):
        """
        Cria um Produto

        Arguments:
            nome: nome do produto.
            cpf: quantidade que se espera comprar daquele produto
            endereco: valor esperado para o produto
            telefone: 
            data_insercao: data de quando o produto foi inserido à base
        """
        self.nome_cliente = nome_cliente
        self.cpf_cliente = cpf_cliente
        self.endereco_cliente = endereco_cliente
        self.telefone_cliente = telefone_cliente 
        self.valor = 0.0
       # super(Cliente,self).__init__(nome, cpf, endereco, telefone)
        """
        Cria um Cliente

        Arguments:
            nome: nome do cliente.
            cpf: documento do cliente e também Primary Key
            telefone: numero para contato do cliente
            endereço: endereço da residencia do cliente
        """
             
  

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao
            
    # def valor_pedidos(self):
        
        # for p in self.produtos:
            # value = []
            # value.append(p.valor_total)
            # self.valor = sum(value) 
            
  
        
        
               
            
    
    
    # def get_nf(self):
        # return self.nf
    
    def valor_pedido(self, produto: Produto):
        self.valor += produto.valor_total 
    
    
    def adiciona_produto(self, produto:Produto):
        """ Adiciona um novo produto ao Pedido
        """
        self.produtos.append(produto)
    
        
    def adiciona_comentario(self, comentario:Comentario):
        """ Adiciona um novo comentário ao Pedido
        """
        self.comentarios.append(comentario)

  
   
   