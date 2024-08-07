package net.sseullae.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import net.sseullae.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findByMemberIdAndCreatedDateBetween(Long id, LocalDateTime start, LocalDateTime end);
}
