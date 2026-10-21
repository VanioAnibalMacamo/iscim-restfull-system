package mz.co.iscim.aula_spring.service;

import mz.co.iscim.aula_spring.exception.RecursoNaoEncontradoException;
import mz.co.iscim.aula_spring.model.Pedido;
import mz.co.iscim.aula_spring.model.PedidoRequest;
import mz.co.iscim.aula_spring.repository.PedidoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final ClienteService clienteService;

    public PedidoService(PedidoRepository repository, ClienteService clienteService) {
        this.repository = repository;
        this.clienteService = clienteService;
    }

    public List<Pedido> listar() {
        return repository.findAll();
    }

    public List<Pedido> listarPorCliente(Long clienteId) {
        clienteService.buscar(clienteId); // lança 404 se o cliente não existir
        return repository.findByClienteId(clienteId);
    }

    public Pedido buscar(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Pedido não encontrado: " + id));
    }

    @Transactional
    public Pedido criar(PedidoRequest req) {
        Pedido pedido = new Pedido();
        preencher(pedido, req);
        return repository.save(pedido);
    }

    @Transactional
    public Pedido actualizar(Long id, PedidoRequest req) {
        Pedido pedido = buscar(id);
        preencher(pedido, req);
        return repository.save(pedido);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Pedido não encontrado: " + id);
        }
        repository.deleteById(id);
    }

    private void preencher(Pedido pedido, PedidoRequest req) {
        pedido.setDescricao(req.descricao());
        pedido.setValor(req.valor());
        pedido.setCliente(clienteService.buscar(req.clienteId()));
    }
}