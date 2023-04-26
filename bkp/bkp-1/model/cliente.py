# from sqlalchemy import Column, String, Integer
# from sqlalchemy.orm import relationship
# from typing import Union
# from model import Base

class Cliente():
    # __tablename__ = 'cliente'

    cpf: int
    nome: str
    endereco: str
    telefone:  int
    pass
    # Definição do relacionamento entre o cliente e o pedido.
    # Essa relação é implicita, não está salva na tabela 'cliente',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.
    #pedidos = relationship("Pedido", back_populates="cliente")

    #ndereco

    # class Cliente(Base):
    # __tablename__ = 'cliente'

    # cpf = Column("cpf_pk", Integer, primary_key=True)
    # nome = Column(String(140), unique=True)
    # endereco = Column(String(200))
    # telefone = Column(Integer)
    

    # Definição do relacionamento entre o cliente e o pedido.
    # Essa relação é implicita, não está salva na tabela 'cliente',
    # mas aqui estou deixando para SQLAlchemy a responsabilidade
    # de reconstruir esse relacionamento.
    # pedidos = relationship("Pedido", back_populates="cliente")

    # def __init__(self, nome: str, cpf: int, endereco: str, telefone: int):
        # """
        # Cria um Cliente

        # Arguments:
            # nome: nome do cliente.
            # cpf: documento do cliente e também Primary Key
            # telefone: numero para contato do cliente
            # endereço: endereço da residencia do cliente
        # """
        # self.nome = nome
        # self.cpf = cpf
        # self.telefone = telefone
        # self.endereco = endereco