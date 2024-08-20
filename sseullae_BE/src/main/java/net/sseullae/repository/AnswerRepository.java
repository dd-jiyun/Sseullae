package net.sseullae.repository;

import java.time.LocalDateTime;
import java.util.List;
import net.sseullae.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByMemberIdAndCreatedDateBetween(Long id, LocalDateTime start, LocalDateTime end);
    boolean existsByMemberIdAndCreatedDateBetween(Long id, LocalDateTime start, LocalDateTime end);
}
