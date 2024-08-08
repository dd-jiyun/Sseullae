package net.sseullae.controller;

import io.restassured.RestAssured;
import java.util.HashMap;
import java.util.Map;
import net.sseullae.entity.Answer;
import net.sseullae.entity.Member;
import net.sseullae.repository.AnswerRepository;
import net.sseullae.repository.MemberRepository;
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

    @Test
    @DisplayName("답변 저장이 완료됩니다.")
    void saveTest() {
        Map<String, Object> member = new HashMap<>();
        member.put("nickname", "testMember");

        RestAssured.given().log().all()
                .contentType("application/json")
                .body(member)
                .when().post("/api/members/join")
                .then().log().all()
                .header("Location", "/api/members/1")
                .statusCode(201);
    }

    @Test
    @DisplayName("해당 날짜에 입력한 답변을 조회합니다.")
    void getAnswersTest() {
        //given
        Member member = Member.builder()
                .nickname("testMember")
                .build();

        memberRepository.save(member);

        Answer answer = Answer.builder()
                .content1("content1")
                .content2("content2")
                .content3("content3")
                .member(member)
                .build();

        answerRepository.save(answer);

        //when & then
        RestAssured.given().log().all()
                .when().get("/api/answers?id=" + member.getId())
                .then().log().all()
                .statusCode(200);
    }

    @Test
    @DisplayName("입력한 답변을 삭제합니다.")
    void deleteAnswerTest() {
        //given
        Member member = Member.builder()
                .nickname("testMember")
                .build();

        memberRepository.save(member);

        Answer answer = Answer.builder()
                .content1("content1")
                .content2("content2")
                .content3("content3")
                .member(member)
                .build();

        answerRepository.save(answer);

        //when & then
        RestAssured.given().log().all()
                .when().delete("/api/answers/" + answer.getId())
                .then().log().all()
                .statusCode(204);
    }

}
