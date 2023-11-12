from langchain.text_splitter import RecursiveCharacterTextSplitter

def split_docs(text: str, chunk_size: int=1000, chunk_overlap: int=20):
    """
    Split the documents into chunks.
    """
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    docs = text_splitter.create_documents([text])

    return docs
