package net.sseullae.service;

import static net.sseullae.exception.CustomErrorCode.ALREADY_ANSWERED;
import static net.sseullae.exception.CustomErrorCode.ANSWER_NOT_FOUND;
import static net.sseullae.exception.CustomErrorCode.INPUT_VALUE_INVALID;
import static net.sseullae.exception.CustomErrorCode.MEMBER_NOT_FOUND;

import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import net.sseullae.dto.RequestAnswer;
import net.sseullae.dto.ResponseAnswer;
import net.sseullae.entity.Answer;
import net.sseullae.entity.Member;
import net.sseullae.exception.CustomException;
import net.sseullae.repository.AnswerRepository;
import net.sseullae.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final MemberRepository memberRepository;

    private final AnswerRepository answerRepository;

    private Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    private boolean isAlreadyAnswered(Long memberId, LocalDateTime start, LocalDateTime end) {
        return answerRepository.existsByMemberIdAndCreatedDateBetween(memberId, start, end);
    }

    private void validateAnswer(RequestAnswer requestAnswer) {
        if (requestAnswer.content1().isBlank() || requestAnswer.content2().isBlank() || requestAnswer.content3().isBlank()) {
            throw new CustomException(INPUT_VALUE_INVALID);
        }
    }

    @Transactional
    public Answer save(RequestAnswer requestAnswer) {
        if (isAlreadyAnswered(requestAnswer.memberId(), LocalDateTime.now().toLocalDate().atStartOfDay(),
                LocalDateTime.now().toLocalDate().atStartOfDay().plusDays(1).minusSeconds(1))) {
            throw new CustomException(ALREADY_ANSWERED);
        }

        validateAnswer(requestAnswer);
        Member member = findMember(requestAnswer.memberId());

        return answerRepository.save(Answer.builder()
                .content1(requestAnswer.content1())
                .content2(requestAnswer.content2())
                .content3(requestAnswer.content3())
                .member(member)
                .build());
    }

    private Answer emptyAnswer(Long memberId) {
        Member member = findMember(memberId);

        return Answer.builder()
                .content1("")
                .content2("")
                .content3("")
                .member(member)
                .build();
    }

    @Transactional(readOnly = true)
    public List<ResponseAnswer> getAnswers(Long memberId, int month) {
        LocalDateTime startMonth = LocalDateTime.now().withMonth(month).withDayOfMonth(1).toLocalDate().atStartOfDay();
        LocalDateTime endMonth = startMonth.plusMonths(1).withDayOfMonth(1).minusSeconds(1);

        List<Answer> answers = answerRepository.findByMemberIdAndCreatedDateBetween(memberId, startMonth, endMonth);

        if (answers.isEmpty()) {
            answers.add(emptyAnswer(memberId));
        }

        return answers.stream()
                .map(answer -> ResponseAnswer.builder()
                        .id(answer.getId())
                        .content1(answer.getContent1())
                        .content2(answer.getContent2())
                        .content3(answer.getContent3())
                        .date(answer.getCreatedDate() != null ? String.valueOf(answer.getCreatedDate().toLocalDate())
                                : "")
                        .build())
                .toList();
    }

    @Transactional
    public void delete(Long id) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new CustomException(ANSWER_NOT_FOUND));

        answerRepository.delete(answer);
    }

}
