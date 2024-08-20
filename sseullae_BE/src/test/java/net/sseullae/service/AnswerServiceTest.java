package net.sseullae.service;

import static net.sseullae.exception.CustomErrorCode.ALREADY_ANSWERED;
import static net.sseullae.exception.CustomErrorCode.ANSWER_NOT_FOUND;
import static net.sseullae.exception.CustomErrorCode.INPUT_VALUE_INVALID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import net.sseullae.dto.RequestAnswer;
import net.sseullae.dto.ResponseAnswer;
import net.sseullae.entity.Answer;
import net.sseullae.entity.Member;
import net.sseullae.exception.CustomException;
import net.sseullae.repository.AnswerRepository;
import net.sseullae.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class AnswerServiceTest {

    @Autowired
    private AnswerService answerService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AnswerRepository answerRepository;

    private Member savedMember;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .nickname("testMember")
                .build();
        savedMember = memberRepository.save(member);
    }

    @Test
    @DisplayName("입력한 답변 저장이 저장됩니다.")
    void saveTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "content1", "content2", "content3");

        // when
        answerService.save(requestAnswer);

        // then
        assertThat(answerRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("해당 월에 해당하는 모든 답변을 조회합니다.")
    void getAnswersTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "content1", "content2", "content3");
        RequestAnswer requestAnswer2 = new RequestAnswer(savedMember.getId(), "content4", "content5", "content6");

        answerService.save(requestAnswer);
        answerService.save(requestAnswer2);

        // when
        List<ResponseAnswer> answers = answerService.getAnswers(savedMember.getId(), 8);

        // then
        assertThat(answers).hasSize(2);
    }

    @Test
    @DisplayName("해당 날짜에 입력한 답변이 없을 경우 빈 값을 반환한다.")
    void getAnswersNullTest() {
        // when
        List<ResponseAnswer> answers = answerService.getAnswers(savedMember.getId(), 8);

        // then
        assertThat(answers).extracting(ResponseAnswer::content1)
                .containsExactly("");
        assertThat(answers).extracting(ResponseAnswer::content2)
                .containsExactly("");
        assertThat(answers).extracting(ResponseAnswer::content3)
                .containsExactly("");

    }

    @Test
    @DisplayName("입력한 답변을 삭제합니다.")
    void deleteTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "content1", "content2", "content3");

        // when
        Answer savedAnswer= answerService.save(requestAnswer);
        answerService.delete(savedAnswer.getId());

        // then
        assertThat(answerRepository.findAll().size()).isEqualTo(0);
    }

    @Test
    @DisplayName("존재하지 않는 답변을 삭제하려고 하면 예외를 발생시킵니다.")
    void deleteExceptionTest() {
        assertThatThrownBy(() -> answerService.delete(2L))
                .isInstanceOf(CustomException.class)
                .hasMessage(ANSWER_NOT_FOUND.getMessage());
    }

    @Test
    @DisplayName("입력하지 않은 답변이 있을 경우 예외를 발생시킵니다.")
    void inputAnswerExceptionTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "", "content2", "content3");

        // when & then
        assertThatThrownBy(() -> answerService.save(requestAnswer))
                .isInstanceOf(CustomException.class)
                .hasMessage(INPUT_VALUE_INVALID.getMessage());
    }

    @Test
    @DisplayName("해당 날짜에 이미 작성한 답변이 있으면 예외를 발생시킵니다.")
    void duplicatedAnswerExceptionTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "content1", "content2", "content3");
        RequestAnswer requestAnswer2 = new RequestAnswer(savedMember.getId(), "content3", "content4", "content5");

        // when
       answerService.save(requestAnswer);

        //then
        assertThatThrownBy(() -> answerService.save(requestAnswer2))
                .isInstanceOf(CustomException.class)
                .hasMessage(ALREADY_ANSWERED.getMessage());
    }

}
