package net.sseullae.service;

import static net.sseullae.exception.CustomErrorCode.DUPLICATE_NICKNAME;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import net.sseullae.dto.RequestMember;
import net.sseullae.exception.CustomException;
import net.sseullae.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Test
    @DisplayName("닉네임이 중복되지 않을 경우 가입이 가능합니다.")
    void joinTest() {
        // given
        RequestMember requestMember = new RequestMember("test");

        // when
        memberService.join(requestMember);

        // then
        assertThat(memberRepository.existsByNickname("test")).isTrue();
    }

    @Test
    @DisplayName("닉네임이 중복될 경우 예외를 발생시킵니다.")
    void joinTestWithDuplicatedNickname() {
        // given
        RequestMember requestMember = new RequestMember("test");
        memberService.join(requestMember);

        // when
        RequestMember duplicatedRequestMember = new RequestMember("test");

        // then
        assertThat(memberRepository.existsByNickname("test")).isTrue();

        assertThatThrownBy(() -> memberService.join(duplicatedRequestMember))
                .isInstanceOf(CustomException.class)
                .hasMessage(DUPLICATE_NICKNAME.getMessage());
    }

}
