package net.sseullae.dto;

import lombok.Builder;

@Builder
public record ResponseAnswer(Long memberId, String content1, String content2, String content3, String date) {
}
