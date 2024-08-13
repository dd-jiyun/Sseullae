package net.sseullae.controller;

import io.restassured.RestAssured;
import net.sseullae.dto.RequestAnswer;
import net.sseullae.entity.Answer;
import net.sseullae.entity.Member;
import net.sseullae.repository.AnswerRepository;
import net.sseullae.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AnswerControllerTest {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Member savedMember;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .nickname("testMember")
                .build();
        savedMember = memberRepository.save(member);
    }

    @Test
    @DisplayName("답변 저장이 완료됩니다.")
    void saveTest() {
        //given
        RequestAnswer requestAnswer = new RequestAnswer(savedMember.getId(), "content1", "content2", "content3");

        RestAssured.given().log().all()
                .contentType("application/json")
                .body(requestAnswer)
                .when().post("/api/answers")
                .then().log().all()
                .header("Location", "/api/answers/1")
                .statusCode(201);
    }

    @Test
    @DisplayName("해당 날짜에 입력한 답변을 조회합니다.")
    void getAnswersTest() {
        //given
        Answer answer = Answer.builder()
                .content1("content1")
                .content2("content2")
                .content3("content3")
                .member(savedMember)
                .build();

        answerRepository.save(answer);

        //when & then
        RestAssured.given().log().all()
                .when().get("/api/answers?id=" + answer.getId())
                .then().log().all()
                .statusCode(200);
    }

    @Test
    @DisplayName("입력한 답변을 삭제합니다.")
    void deleteAnswerTest() {
        //given
        Answer answer = Answer.builder()
                .content1("content1")
                .content2("content2")
                .content3("content3")
                .member(savedMember)
                .build();

        answerRepository.save(answer);

        //when & then
        RestAssured.given().log().all()
                .when().delete("/api/answers/" + answer.getId())
                .then().log().all()
                .statusCode(204);
    }

}
