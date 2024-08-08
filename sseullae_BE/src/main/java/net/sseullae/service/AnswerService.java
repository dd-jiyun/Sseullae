package net.sseullae.service;

import static net.sseullae.exception.CustomErrorCode.ANSWER_NOT_FOUND;
import static net.sseullae.exception.CustomErrorCode.MEMBER_NOT_FOUND;

import java.time.LocalDateTime;
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

    private Member findMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    @Transactional
    public Answer save(RequestAnswer requestAnswer) {
        Member member = findMember(requestAnswer.memberId());

        return answerRepository.save(Answer.builder()
                .content1(requestAnswer.content1())
                .content2(requestAnswer.content2())
                .content3(requestAnswer.content3())
                .member(member)
                .build());
    }

    @Transactional(readOnly = true)
    public ResponseAnswer getAnswers(Long id) {
        LocalDateTime startDate = LocalDateTime.now().toLocalDate().atStartOfDay();
        LocalDateTime endDate = LocalDateTime.now().plusDays(1).toLocalDate().atStartOfDay();

        Answer answer = answerRepository.findByMemberIdAndCreatedDateBetween(id, startDate, endDate)
                .orElseThrow(() -> new CustomException(ANSWER_NOT_FOUND));

        return ResponseAnswer.builder()
                .memberId(answer.getMember().getId())
                .content1(answer.getContent1())
                .content2(answer.getContent2())
                .content3(answer.getContent3())
                .date(String.valueOf(answer.getCreatedDate().toLocalDate()))
                .build();
    }

    @Transactional
    public void delete(Long id) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new CustomException(ANSWER_NOT_FOUND));

        answerRepository.delete(answer);
    }

}
