package mz.co.iscim.aula_spring.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record PedidoRequest(
        @NotBlank(message = "A descrição é obrigatória") String descricao,
        @NotNull(message = "O valor é obrigatório") @Positive(message = "O valor deve ser positivo") BigDecimal valor,
        @NotNull(message = "O clienteId é obrigatório") Long clienteId) {
}