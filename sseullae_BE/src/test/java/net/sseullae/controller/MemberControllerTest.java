package net.sseullae.controller;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import net.sseullae.dto.RequestMember;
import net.sseullae.dto.ResponseMember;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class MemberControllerTest {

    @Test
    @DisplayName("사용자가 가입을 요청하면 가입이 완료됩니다.")
    void joinTest() {
        // given
        RequestMember requestMember = new RequestMember("test");

        // when & then
        ResponseMember responseMember = RestAssured.given().log().all()
                .contentType("application/json")
                .body(requestMember)
                .when().post("/api/members/join")
                .then().log().all()
                .header("Location", "/api/members/1")
                .statusCode(201)
                .extract().as(ResponseMember.class);

        assertThat(responseMember.id()).isEqualTo(1L);
        assertThat(responseMember.nickname()).isEqualTo("test");
    }

}
