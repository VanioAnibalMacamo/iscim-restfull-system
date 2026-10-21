package mz.co.iscim.aula_spring.service;

import mz.co.iscim.aula_spring.exception.RecursoNaoEncontradoException;
import mz.co.iscim.aula_spring.model.Cliente;
import mz.co.iscim.aula_spring.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repository;

    public ClienteService(ClienteRepository repository) {
        this.repository = repository;
    }

    public List<Cliente> listar() {
        return repository.findAll();
    }

    public Cliente buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado: " + id));
    }

    @Transactional
    public Cliente criar(Cliente cliente) {
        cliente.setId(null);
        return repository.save(cliente);

    }

    @Transactional
    public Cliente actualizar(Long id, Cliente dados) {
        Cliente existente = buscar(id);
        existente.setNome(dados.getNome());
        existente.setEmail(dados.getEmail());
        existente.setTelefone(dados.getTelefone());
        return repository.save(existente);
    }

    @Transactional
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Cliente não encontrado: " + id);
        }
        repository.deleteById(id);
    }
}