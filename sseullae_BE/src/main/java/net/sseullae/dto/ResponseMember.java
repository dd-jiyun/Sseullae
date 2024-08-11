package net.sseullae.dto;

import lombok.Builder;

@Builder
public record ResponseMember(Long id, String nickname) {
}
