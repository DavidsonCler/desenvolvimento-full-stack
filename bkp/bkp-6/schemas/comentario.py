from pydantic import BaseModel


class ComentarioSchema(BaseModel):
    """ Define como um novo comentário a ser inserido deve ser representado
    """
    pedido_nf: int = 1
    texto: str = "Só comprar se o preço realmente estiver bom!"
