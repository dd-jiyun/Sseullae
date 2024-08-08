package net.sseullae.service;

import static net.sseullae.exception.CustomErrorCode.DUPLICATE_NICKNAME;

import lombok.RequiredArgsConstructor;
import net.sseullae.dto.RequestMember;
import net.sseullae.entity.Member;
import net.sseullae.exception.CustomException;
import net.sseullae.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private boolean isDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public Member join(RequestMember requestMember) {
        if (isDuplicateNickname(requestMember.nickname())) {
            throw new CustomException(DUPLICATE_NICKNAME);
        }
        return memberRepository.save(Member.builder()
                .nickname(requestMember.nickname())
                .build()
        );
    }
}
