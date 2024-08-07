package net.sseullae.service;

import static org.assertj.core.api.Assertions.assertThat;

import net.sseullae.dto.RequestAnswer;
import net.sseullae.entity.Member;
import net.sseullae.repository.AnswerRepository;
import net.sseullae.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
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
        RequestAnswer requestAnswer = new RequestAnswer(1L, "content1", "content2", "content3");

        // when
        answerService.save(requestAnswer);

        // then
        assertThat(answerRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    @DisplayName("해당 날짜에 입력한 답변을 조회합니다.")
    void getAnswersTest() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(1L,"content1", "content2", "content3");

        // when
        answerService.save(requestAnswer);

        // then
        assertThat(answerService.getAnswers(1L).memberId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("입력한 답변을 삭제합니다.")
    void delete() {
        // given
        RequestAnswer requestAnswer = new RequestAnswer(1L,"content1", "content2", "content3");

        // when
        answerService.save(requestAnswer);
        answerService.delete(1L);

        // then
        assertThat(answerRepository.findAll().size()).isEqualTo(0);
    }

}
